"""Genera la música de fondo y los efectos de sonido del video.

Todo el audio se sintetiza aquí (sin muestras externas), así que no hay
problemas de licencias. Uso:

    python3 scripts/generar-audio.py

Escribe los archivos .wav en public/audio/.
"""

import os
import subprocess
import wave

import numpy as np

SR = 44100
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "audio")
rng = np.random.default_rng(7)


def write_wav(name, data):
    """data: mono (n,) o estéreo (n, 2) en float [-1, 1]."""
    if data.ndim == 1:
        data = np.stack([data, data], axis=1)
    peak = np.max(np.abs(data))
    if peak > 0:
        data = data / peak * 0.89
    pcm = (data * 32767).astype("<i2")
    path = os.path.join(OUT, name)
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())
    print(f"{name}: {len(data) / SR:.2f}s")


def midi_hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def lowpass(x, cutoff):
    """Filtro de un polo, vectorizado por bloques no es trivial: se usa un
    filtro FIR de media móvil aproximado para pads (suficiente aquí)."""
    n = max(1, int(SR / cutoff / 2))
    k = np.ones(n) / n
    if x.ndim == 1:
        return np.convolve(x, k, mode="same")
    return np.stack([np.convolve(x[:, c], k, mode="same") for c in range(2)], 1)


def one_pole(x, coef):
    """Filtro paso bajo de un polo con coeficiente variable (array o escalar)."""
    coef = np.broadcast_to(coef, x.shape)
    y = np.empty_like(x)
    acc = 0.0
    for i in range(len(x)):
        acc += coef[i] * (x[i] - acc)
        y[i] = acc
    return y


# ---------------------------------------------------------------- Música

_pluck_cache = {}


def pluck(midi, dur=1.6, bright=0.5):
    """Cuerda pulsada Karplus-Strong (tipo ukelele/marimba suave)."""
    key = (midi, dur, bright)
    if key in _pluck_cache:
        return _pluck_cache[key]
    f = midi_hz(midi)
    N = int(SR / f)
    total = int(SR * dur)
    burst = rng.uniform(-1, 1, N)
    burst = lowpass(burst, 2000 + 6000 * bright)
    y = np.zeros(total + N + 1)
    y[:N] = burst
    decay = 0.996
    pos = N
    while pos < len(y):
        end = min(pos + N, len(y))
        prev = y[pos - N : end - N]
        prev2 = y[pos - N - 1 : end - N - 1] if pos - N - 1 >= 0 else np.concatenate(([0.0], y[pos - N : end - N - 1]))
        y[pos:end] = decay * 0.5 * (prev + prev2)
        pos = end
    y = y[:total]
    y *= np.exp(-np.linspace(0, 4.0, total))
    _pluck_cache[key] = y
    return y


def pad_note(midi, dur):
    t = np.arange(int(SR * dur)) / SR
    f = midi_hz(midi)
    sig = np.zeros_like(t)
    for det in (-0.12, 0.0, 0.11):
        ff = f * 2 ** (det / 12)
        sig += np.sin(2 * np.pi * ff * t) + 0.35 * np.sin(2 * np.pi * 2 * ff * t) + 0.12 * np.sin(2 * np.pi * 3 * ff * t)
    att = np.clip(t / 0.5, 0, 1)
    rel = np.clip((dur - t) / 0.6, 0, 1)
    return sig * att * rel / 3


def kick():
    t = np.arange(int(SR * 0.35)) / SR
    f = 50 + 90 * np.exp(-t * 30)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t * 11)


def shaker():
    t = np.arange(int(SR * 0.07)) / SR
    n = rng.uniform(-1, 1, len(t))
    n = n - lowpass(n, 5000)
    return n * np.exp(-t * 60)


def clap():
    t = np.arange(int(SR * 0.2)) / SR
    n = rng.uniform(-1, 1, len(t))
    n = n - lowpass(n, 1200)
    env = np.exp(-t * 25) * (1 + 0.6 * (np.sin(2 * np.pi * 90 * t) > 0))
    return n * env


def add(buf, sig, start, gain=1.0, pan=0.0):
    s = int(start * SR)
    if s >= len(buf):
        return
    e = min(len(buf), s + len(sig))
    seg = sig[: e - s] * gain
    left = np.cos((pan + 1) * np.pi / 4)
    right = np.sin((pan + 1) * np.pi / 4)
    buf[s:e, 0] += seg * left * 1.414
    buf[s:e, 1] += seg * right * 1.414


def musica(duracion=140.0):
    bpm = 96
    beat = 60 / bpm
    bar = beat * 4
    buf = np.zeros((int(SR * duracion) + SR * 3, 2))
    # I – V – vi – IV en Do mayor (alegre, apropiado para niños)
    prog = [
        [60, 64, 67],  # C
        [55, 59, 62],  # G
        [57, 60, 64],  # Am
        [53, 57, 60],  # F
    ]
    roots = [36, 43, 45, 41]
    # patrón de arpegio en corcheas (índices de la triada + octavas)
    arp = [0, 1, 2, 1, 3, 2, 1, 2]
    melody = [
        [79, None, 76, None, 74, 76, 72, None],
        [74, None, 71, None, 74, None, 79, None],
        [76, None, 72, None, 76, 77, 79, None],
        [77, None, 76, 74, 72, None, None, None],
    ]
    n_bars = int(duracion / bar) + 1
    for b in range(n_bars):
        t0 = b * bar
        ci = b % 4
        chord = prog[ci]
        # Pad
        for m in chord:
            add(buf, pad_note(m, bar + 0.4), t0, 0.05)
        # Bajo
        if b >= 2:
            for k in (0, 2.5):
                add(buf, pluck(roots[ci], 1.2, 0.2), t0 + k * beat, 0.35)
        # Arpegio
        notes = chord + [chord[0] + 12]
        for i, idx in enumerate(arp):
            pan = -0.35 if i % 2 == 0 else 0.35
            add(buf, pluck(notes[idx] + 12, 1.4, 0.6), t0 + i * beat / 2, 0.16, pan)
        # Melodía en las secciones centrales
        if 8 <= b < n_bars - 6 and (b // 8) % 2 == 1:
            for i, m in enumerate(melody[ci]):
                if m is not None:
                    add(buf, pluck(m, 1.8, 0.8), t0 + i * beat / 2, 0.14, 0.1)
        # Percusión
        if b >= 4 and b < n_bars - 2:
            add(buf, kick(), t0, 0.5)
            add(buf, kick(), t0 + 2 * beat, 0.42)
            add(buf, clap(), t0 + beat, 0.12, 0.1)
            add(buf, clap(), t0 + 3 * beat, 0.12, 0.1)
            for i in range(8):
                add(buf, shaker(), t0 + i * beat / 2, 0.05 if i % 2 else 0.03, 0.4)
    buf = buf[: int(SR * duracion)]
    # Fade in / out
    n = len(buf)
    env = np.ones(n)
    fi = int(SR * 1.5)
    fo = int(SR * 5)
    env[:fi] = np.linspace(0, 1, fi)
    env[-fo:] = np.linspace(1, 0, fo)
    buf *= env[:, None]
    # Pequeña reverberación (ecos difusos)
    wet = np.zeros_like(buf)
    for d, g in ((0.031, 0.25), (0.047, 0.2), (0.073, 0.16), (0.11, 0.12), (0.17, 0.08)):
        s = int(SR * d)
        wet[s:, 0] += buf[:-s, 1] * g
        wet[s:, 1] += buf[:-s, 0] * g
    return buf + wet


# ------------------------------------------------------------------ SFX


def whoosh(dur=0.7):
    n = int(SR * dur)
    t = np.arange(n) / SR
    noise = rng.uniform(-1, 1, n)
    prog = t / dur
    cutoff = 300 + 5000 * np.sin(np.pi * prog) ** 2
    coef = 1 - np.exp(-2 * np.pi * cutoff / SR)
    y = one_pole(noise, coef)
    y = y - one_pole(y, 1 - np.exp(-2 * np.pi * 200 / SR))
    env = np.sin(np.pi * prog) ** 1.5
    return y * env


def pop():
    t = np.arange(int(SR * 0.12)) / SR
    f = 900 * np.exp(-t * 18) + 380
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t * 35)


def tick():
    t = np.arange(int(SR * 0.05)) / SR
    return (np.sin(2 * np.pi * 1800 * t) + 0.5 * np.sin(2 * np.pi * 2700 * t)) * np.exp(-t * 120)


def ding():
    t = np.arange(int(SR * 1.6)) / SR
    f = 1046.5
    y = np.zeros_like(t)
    for ratio, g, d in ((1, 1, 2.5), (2.0, 0.5, 4), (2.76, 0.3, 5), (5.4, 0.15, 8)):
        y += g * np.sin(2 * np.pi * f * ratio * t) * np.exp(-t * d)
    return y * np.clip(t / 0.003, 0, 1)


def riser(dur=2.0):
    n = int(SR * dur)
    t = np.arange(n) / SR
    noise = rng.uniform(-1, 1, n)
    cutoff = 200 + 7000 * (t / dur) ** 2
    y = one_pole(noise, 1 - np.exp(-2 * np.pi * cutoff / SR))
    f = 200 + 600 * (t / dur) ** 2
    tone = np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.25
    env = (t / dur) ** 2 * np.clip((dur - t) / 0.05, 0, 1)
    return (y + tone) * env


def impacto():
    t = np.arange(int(SR * 1.4)) / SR
    f = 40 + 80 * np.exp(-t * 12)
    boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 3.5)
    noise = rng.uniform(-1, 1, len(t))
    hit = one_pole(noise, 1 - np.exp(-2 * np.pi * 2500 / SR)) * np.exp(-t * 18)
    sparkle = ding() [: len(t)] * 0.25
    return boom + 0.5 * hit + sparkle


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    write_wav("musica-fondo.wav", musica())
    # La música se guarda en MP3 para que pese poco (requiere ffmpeg).
    wav = os.path.join(OUT, "musica-fondo.wav")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav, "-b:a", "192k", wav[:-4] + ".mp3"], check=True)
    os.remove(wav)
    write_wav("whoosh.wav", whoosh())
    write_wav("pop.wav", pop())
    write_wav("tick.wav", tick())
    write_wav("ding.wav", ding())
    write_wav("riser.wav", riser())
    write_wav("impacto.wav", impacto())
