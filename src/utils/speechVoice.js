// Web Speech API Voice Synthesizer with female French voice priority,
// chunked sentence playback to eliminate browser 15s cutoff bugs,
// and complete acronym/symbol expansion so EVERYTHING is articulated.

let currentQueue = [];
let isSpeakingActive = false;
let keepAliveTimer = null;
let activeCallbacks = { onStart: null, onEnd: null, onError: null };
let availableVoices = [];

export const isSpeechSynthesisSupported = () => {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
};

// Initialize and cache available voices
const initVoices = () => {
    if (!isSpeechSynthesisSupported()) return;
    availableVoices = window.speechSynthesis.getVoices();
};

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    initVoices();
    window.speechSynthesis.onvoiceschanged = () => {
        initVoices();
    };
}

// Find the best French female voice
export const getFemaleFrenchVoice = () => {
    if (!isSpeechSynthesisSupported()) return null;
    if (availableVoices.length === 0) {
        availableVoices = window.speechSynthesis.getVoices();
    }

    const frenchVoices = availableVoices.filter(v => 
        v.lang === 'fr-FR' || 
        v.lang.startsWith('fr') || 
        v.lang.includes('FR')
    );

    if (frenchVoices.length === 0) return null;

    // Prioritize female voice names in French
    const femaleKeywords = [
        'amelie', 'amélie', 'audrey', 'julie', 'celine', 'céline', 
        'hortense', 'virginie', 'denise', 'marie', 'chloe', 'chloé', 
        'female', 'femme', 'google français'
    ];

    const femaleVoice = frenchVoices.find(v => {
        const lowerName = v.name.toLowerCase();
        return femaleKeywords.some(kw => lowerName.includes(kw));
    });

    if (femaleVoice) return femaleVoice;

    return frenchVoices[0];
};

// Cancel any active speech and clear chunk queue
export const stopSpeaking = () => {
    if (!isSpeechSynthesisSupported()) return;
    try {
        if (keepAliveTimer) {
            clearInterval(keepAliveTimer);
            keepAliveTimer = null;
        }
        currentQueue = [];
        isSpeakingActive = false;
        window.speechSynthesis.cancel();
    } catch {
        // Safe catch
    }
};

// Thoroughly expand all symbols, sigles, abbreviations and tech acronyms into readable French
export const normalizeTextForSpeech = (text) => {
    if (!text) return '';

    return text
        // Markdown & quotes
        .replace(/[*#_`]/g, '')
        .replace(/["«»]/g, ' ')
        // Specific tech acronyms & sigles
        .replace(/\bROS2\b/gi, 'R O S deux')
        .replace(/\bNav2\b/gi, 'Nave deux')
        .replace(/\bPhysical AI\b/gi, 'Physical A I')
        .replace(/\bTinyML\b/gi, 'Taïni M L')
        .replace(/\bSLAM\b/gi, 'Slam')
        .replace(/\bAPI\b/gi, 'A P I')
        .replace(/\bAPIs\b/gi, 'A P I')
        .replace(/\bSaaS\b/gi, 'SaaS')
        .replace(/\bLMS\b/gi, 'L M S')
        .replace(/\bUI\b/gi, 'U I')
        .replace(/\bUX\b/gi, 'U X')
        .replace(/\bDOM\b/gi, 'D O M')
        .replace(/\bAOT\b/gi, 'A O T')
        .replace(/\bRBAC\b/gi, 'R B A C')
        .replace(/\bSQL\b/gi, 'S Q L')
        .replace(/\bNoSQL\b/gi, 'No S Q L')
        .replace(/\bCI\/CD\b/gi, 'C I C D')
        .replace(/\bJWT\b/gi, 'J W T')
        .replace(/\bETL\b/gi, 'E T L')
        .replace(/\bKPI\b/gi, 'K P I')
        .replace(/\bDL\b/gi, 'Deep Learning')
        .replace(/\bML\b/gi, 'Machine Learning')
        .replace(/\bIA\b/gi, 'I A')
        .replace(/\bAI\b/gi, 'A I')
        .replace(/\bTJM\b/gi, 'taux journalier moyen')
        .replace(/\bFPS\b/gi, 'images par seconde')
        .replace(/\bC\+\+\b/gi, 'C plus plus')
        // Symbols & Currency
        .replace(/&/g, ' et ')
        .replace(/\+/g, ' plus ')
        .replace(/%/g, ' pour cent ')
        .replace(/€/g, ' euros ')
        .replace(/\bEUR\b/g, ' euros ')
        .replace(/\bFCFA\b/g, ' francs CFA ')
        .replace(/\bXOF\b/g, ' francs CFA ')
        .replace(/->/g, ' puis ')
        .replace(/\(60s\)/g, ' en soixante secondes ')
        .replace(/@Tedel12/g, ' sur GitHub Tedel 12 ')
        .replace(/@\w+/g, '')
        .replace(/\//g, ' sur ')
        // Formatted phone numbers
        .replace(/\+229 01 55 69 98 25/g, 'plus 229, 01, 55, 69, 98, 25')
        // Clean multiple spaces
        .replace(/\s+/g, ' ')
        .trim();
};

// Split text into sentence chunks to defeat the Chrome/Safari 15s cutoff bug
const splitIntoChunks = (fullText) => {
    const rawChunks = fullText.split(/([.!?;\n]+)/);
    const result = [];
    let current = '';

    for (let i = 0; i < rawChunks.length; i++) {
        current += rawChunks[i];
        // When sentence delimiter or chunk length reached, push chunk
        if (/[.!?;\n]/.test(rawChunks[i]) || current.length > 90) {
            const trimmed = current.trim();
            if (trimmed.length > 0) {
                result.push(trimmed);
            }
            current = '';
        }
    }
    if (current.trim().length > 0) {
        result.push(current.trim());
    }

    return result.length > 0 ? result : [fullText];
};

// Play queue of chunks sequentially
const playNextChunk = () => {
    if (!isSpeakingActive || currentQueue.length === 0) {
        isSpeakingActive = false;
        if (keepAliveTimer) {
            clearInterval(keepAliveTimer);
            keepAliveTimer = null;
        }
        if (activeCallbacks.onEnd) {
            activeCallbacks.onEnd();
        }
        return;
    }

    const chunkText = currentQueue.shift();
    if (!chunkText || !chunkText.trim()) {
        playNextChunk();
        return;
    }

    try {
        const utterance = new SpeechSynthesisUtterance(chunkText);
        utterance.lang = 'fr-FR';
        utterance.rate = 1.0;  // Articulate, natural speed
        utterance.pitch = 1.15; // Pleasant feminine tone

        const voice = getFemaleFrenchVoice();
        if (voice) {
            utterance.voice = voice;
        }

        utterance.onend = () => {
            // Short 120ms pause between sentences for realism
            setTimeout(() => {
                if (isSpeakingActive) {
                    playNextChunk();
                }
            }, 120);
        };

        utterance.onerror = (err) => {
            // If interrupted or canceled by user, don't cascade errors
            if (err.error === 'interrupted' || err.error === 'canceled') {
                isSpeakingActive = false;
                return;
            }
            // Otherwise, continue to next chunk so speech doesn't drop
            if (isSpeakingActive) {
                playNextChunk();
            }
        };

        window.speechSynthesis.speak(utterance);
    } catch {
        if (isSpeakingActive) {
            playNextChunk();
        }
    }
};

// Public method: speak complete text without ANY cutoff
export const speakFrench = (text, { onStart, onEnd, onError } = {}) => {
    if (!isSpeechSynthesisSupported()) {
        if (onEnd) onEnd();
        return;
    }

    stopSpeaking();

    const normalized = normalizeTextForSpeech(text);
    if (!normalized) {
        if (onEnd) onEnd();
        return;
    }

    currentQueue = splitIntoChunks(normalized);
    isSpeakingActive = true;
    activeCallbacks = { onStart, onEnd, onError };

    if (onStart) onStart();

    // Browser keep-alive: prevents Chromium/WebKit internal audio engine from stalling on long speeches
    keepAliveTimer = setInterval(() => {
        if (window.speechSynthesis && window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
            window.speechSynthesis.pause();
            window.speechSynthesis.resume();
        }
    }, 6000);

    playNextChunk();
};
