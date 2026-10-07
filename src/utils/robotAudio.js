// Synthesizer Web Audio API sound generator for cute Star Wars / Wall-E robot beeps

let audioCtx = null;

const getAudioContext = () => {
    if (typeof window === 'undefined') return null;
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            audioCtx = new AudioContext();
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
};

// Play a cheerful Wall-E / R2-D2 style chirping sound
export const playRobotSound = (type = "chirp", muted = false) => {
    if (muted) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === "chirp") {
            // Dual frequency chirp
            osc.type = "sine";
            osc.frequency.setValueAtTime(587.33, now); // D5
            osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.08); // D6
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.16); // A5

            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

            osc.start(now);
            osc.stop(now + 0.22);
        } else if (type === "happy") {
            // Three ascending beeps
            osc.type = "triangle";
            osc.frequency.setValueAtTime(659.25, now); // E5
            osc.frequency.linearRampToValueAtTime(783.99, now + 0.06); // G5
            osc.frequency.linearRampToValueAtTime(1046.50, now + 0.12); // C6

            gain.gain.setValueAtTime(0.06, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

            osc.start(now);
            osc.stop(now + 0.25);
        } else if (type === "question") {
            // Curious upward pitch
            osc.type = "sine";
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.exponentialRampToValueAtTime(987.77, now + 0.15);

            gain.gain.setValueAtTime(0.07, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

            osc.start(now);
            osc.stop(now + 0.2);
        } else if (type === "pop") {
            // Soft click
            osc.type = "sine";
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);

            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

            osc.start(now);
            osc.stop(now + 0.06);
        }
    } catch {
        // Audio might be blocked by browser policy until first click, ignore safely
    }
};

// Realistic glass shatter and crack sound synthesis
export const playGlassShatterSound = (muted = false) => {
    if (muted) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        const now = ctx.currentTime;

        // 1. Sharp initial crack/impact (transient noise burst)
        const bufferSize = ctx.sampleRate * 0.15; // 150ms
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            // Decaying white noise
            output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = buffer;

        // Highpass filter for brittle glass texture
        const filter = ctx.createBiquadFilter();
        filter.type = "highpass";
        filter.frequency.setValueAtTime(2200, now);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.2, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

        whiteNoise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);

        whiteNoise.start(now);

        // 2. Resonant high-frequency glass shards (tinkling frequencies)
        const shardFreqs = [2800, 3600, 4400, 5600, 6800];
        shardFreqs.forEach((freq, idx) => {
            const shardOsc = ctx.createOscillator();
            const shardGain = ctx.createGain();

            shardOsc.type = "sine";
            shardOsc.frequency.setValueAtTime(freq + (Math.random() * 200 - 100), now + idx * 0.015);

            const duration = 0.12 + Math.random() * 0.08;
            shardGain.gain.setValueAtTime(0.06, now + idx * 0.015);
            shardGain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.015 + duration);

            shardOsc.connect(shardGain);
            shardGain.connect(ctx.destination);

            shardOsc.start(now + idx * 0.015);
            shardOsc.stop(now + idx * 0.015 + duration);
        });
    } catch {
        // Ignore audio errors gracefully
    }
};

