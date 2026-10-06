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

