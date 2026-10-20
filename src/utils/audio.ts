// Web Audio synthesis for wax seal snap and ambient romantic wedding melody

let audioCtx: AudioContext | null = null;
const listeners = new Set<(isPlaying: boolean) => void>();

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Plays a rich, tactile wax seal unsealing sound (soft friction crunch + crystalline bell chime)
 */
export function playSealBreakSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Soft parchment friction noise
    const bufferSize = ctx.sampleRate * 0.18;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.05));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(750, now);
    filter.Q.setValueAtTime(3.5, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.25, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);

    // Warm resonant bell chime chord: F#4, A#4, C#5, F5, G#5
    const notes = [369.99, 466.16, 554.37, 698.46, 830.61];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.035);

      const noteStart = now + idx * 0.035;
      gain.gain.setValueAtTime(0.0001, noteStart);
      gain.gain.linearRampToValueAtTime(0.14 / (idx + 1), noteStart + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteStart);
      osc.stop(noteStart + 1.25);
    });
  } catch {
    // Fail silently if audio blocked
  }
}

/**
 * Plays a soft, celebratory golden chime chord (for blessings & hearts)
 */
export function playChimeSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // Golden harp bell triad: D5, F#5, A5, D6
    const freqs = [587.33, 739.99, 880.00, 1174.66];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      const start = now + idx * 0.04;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(0.08 / (idx + 1), start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.95);
    });
  } catch {
    // Fail silently
  }
}

/**
 * Romantic ambient chord generator (Harp / Celesta arpeggios + warm background pad)
 */
class RomanticHarpPlayer {
  private isPlaying = false;
  private intervalId: number | null = null;
  private padGainNode: GainNode | null = null;
  private padOscNodes: OscillatorNode[] = [];

  public subscribe(cb: (playing: boolean) => void) {
    listeners.add(cb);
    cb(this.isPlaying);
    return () => {
      listeners.delete(cb);
    };
  }

  private notify() {
    listeners.forEach((cb) => cb(this.isPlaying));
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public get active(): boolean {
    return this.isPlaying;
  }

  public start() {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (this.isPlaying) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    this.isPlaying = true;
    this.notify();

    // Progression of royal romantic wedding chords (D-flat Major, B-flat minor 7, G-flat Major 7, A-flat dominant)
    const chords = [
      [277.18, 349.23, 415.3, 554.37, 698.46], // Db Major (warm & regal)
      [233.08, 349.23, 466.16, 554.37, 698.46], // Bbm7 (tender)
      [369.99, 466.16, 554.37, 698.46, 880.0],  // GbMaj7 (romantic bloom)
      [311.13, 392.0, 466.16, 622.25, 783.99],  // Ab / Eb (resolving joy)
    ];

    let chordIdx = 0;
    let step = 0;

    // Start a soft warm string pad drone in the background
    try {
      this.padGainNode = ctx.createGain();
      this.padGainNode.gain.setValueAtTime(0.001, ctx.currentTime);
      this.padGainNode.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 2.0);

      const padFilter = ctx.createBiquadFilter();
      padFilter.type = 'lowpass';
      padFilter.frequency.setValueAtTime(450, ctx.currentTime);

      this.padGainNode.connect(padFilter);
      padFilter.connect(ctx.destination);

      // Low Db fundamental pad
      const droneOsc = ctx.createOscillator();
      droneOsc.type = 'sine';
      droneOsc.frequency.setValueAtTime(138.59, ctx.currentTime);
      droneOsc.connect(this.padGainNode);
      droneOsc.start();
      this.padOscNodes.push(droneOsc);
    } catch {
      // Ignore
    }

    const tick = () => {
      if (!this.isPlaying || !ctx) return;
      const currentChord = chords[chordIdx];
      const noteFreq = currentChord[step % currentChord.length];

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Celesta / Harp timbre using triangle with subtle sine body
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(noteFreq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.85);

      step++;
      if (step >= currentChord.length * 2) {
        step = 0;
        chordIdx = (chordIdx + 1) % chords.length;
      }
    };

    tick();
    this.intervalId = window.setInterval(tick, 420);
  }

  public stop() {
    this.isPlaying = false;
    this.notify();

    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    if (this.padGainNode && audioCtx) {
      try {
        this.padGainNode.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
      } catch {
        // Ignore
      }
    }

    setTimeout(() => {
      this.padOscNodes.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // Ignore
        }
      });
      this.padOscNodes = [];
      this.padGainNode = null;
    }, 600);
  }
}

export const harpPlayer = new RomanticHarpPlayer();
