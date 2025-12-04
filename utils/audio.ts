// Audio Context Singleton
let audioCtx: AudioContext | null = null;

const getCtx = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
};

// Initialize/Resume Audio Context (must be called on user interaction)
export const initAudio = () => {
  const ctx = getCtx();
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
};

// Helper for creating oscillators
const createOscillator = (
  type: OscillatorType,
  freq: number,
  duration: number,
  startTime: number,
  ctx: AudioContext,
  gainValue: number = 0.1
) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);
  
  gain.gain.setValueAtTime(gainValue, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start(startTime);
  osc.stop(startTime + duration);
  
  return { osc, gain };
};

export const playClickSound = () => {
  try {
    const ctx = getCtx();
    const t = ctx.currentTime;
    
    // Low thud + High blip for a "techy" button press
    createOscillator('square', 100, 0.1, t, ctx, 0.05);
    createOscillator('sine', 800, 0.05, t, ctx, 0.05);
  } catch (e) {
    console.warn("Audio play failed", e);
  }
};

export const playTickSound = () => {
  try {
    const ctx = getCtx();
    const t = ctx.currentTime;
    
    // Short, crisp woodblock/click sound for scrolling
    // Slightly randomize pitch to make it less monotonous
    const randomDetune = (Math.random() - 0.5) * 50;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600 + randomDetune, t);
    osc.frequency.exponentialRampToValueAtTime(1200, t + 0.05); // Pitch chirp up
    
    gain.gain.setValueAtTime(0.05, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(t);
    osc.stop(t + 0.05);
  } catch (e) {
    // Ignore errors
  }
};

export const playWinSound = () => {
  try {
    const ctx = getCtx();
    const t = ctx.currentTime;
    
    // Major Chord Arpeggio (C Major: C, E, G, C)
    const notes = [523.25, 659.25, 783.99, 1046.50];
    
    notes.forEach((freq, i) => {
      createOscillator('triangle', freq, 0.4, t + i * 0.08, ctx, 0.1);
      createOscillator('sine', freq, 0.5, t + i * 0.08, ctx, 0.1);
    });

    // "Explosion" Noise Effect
    const bufferSize = ctx.sampleRate * 1.5; // 1.5 seconds
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.1, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 1.0);
    
    // Lowpass filter to make the noise sound more like an explosion/whoosh
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, t);
    filter.frequency.linearRampToValueAtTime(100, t + 1.0);
    
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    
    noise.start(t);
  } catch (e) {
    console.warn("Audio play failed", e);
  }
};