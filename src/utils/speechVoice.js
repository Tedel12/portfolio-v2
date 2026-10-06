// Web Speech API Voice Synthesizer with female French voice priority

let currentUtterance = null;
let voicesLoaded = false;
let availableVoices = [];

export const isSpeechSynthesisSupported = () => {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
};

// Initialize and cache available voices
const initVoices = () => {
    if (!isSpeechSynthesisSupported()) return;
    availableVoices = window.speechSynthesis.getVoices();
    if (availableVoices.length > 0) {
        voicesLoaded = true;
    }
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

    // Prioritize known female voice names in French
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

    // Fallback: return the first French voice
    return frenchVoices[0];
};

// Cancel any active speech
export const stopSpeaking = () => {
    if (!isSpeechSynthesisSupported()) return;
    try {
        window.speechSynthesis.cancel();
        currentUtterance = null;
    } catch {
        // Safe catch
    }
};

// Speak text in French with female voice
export const speakFrench = (text, { onStart, onEnd, onError } = {}) => {
    if (!isSpeechSynthesisSupported()) {
        if (onEnd) onEnd();
        return;
    }

    try {
        stopSpeaking();

        // Strip markdown/quotes for cleaner vocalization
        const cleanText = text
            .replace(/["*#_`]/g, '')
            .replace(/->/g, 'puis')
            .replace(/\+/g, 'plus')
            .replace(/@\w+/g, '')
            .replace(/\(60s\)/g, 'en soixante secondes')
            .replace(/\bTJM\b/g, 'taux journalier moyen')
            .replace(/\bROS2\b/gi, 'R O S 2')
            .replace(/\bSLAM\b/gi, 'slam')
            .replace(/\bTinyML\b/gi, 'tiny M L')
            .trim();

        if (!cleanText) {
            if (onEnd) onEnd();
            return;
        }

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'fr-FR';
        utterance.rate = 1.0; // Natural, articulate pace
        utterance.pitch = 1.15; // Pleasant feminine pitch

        const voice = getFemaleFrenchVoice();
        if (voice) {
            utterance.voice = voice;
        }

        utterance.onstart = () => {
            if (onStart) onStart();
        };

        utterance.onend = () => {
            currentUtterance = null;
            if (onEnd) onEnd();
        };

        utterance.onerror = (err) => {
            currentUtterance = null;
            if (onError) onError(err);
            else if (onEnd) onEnd();
        };

        currentUtterance = utterance;
        window.speechSynthesis.speak(utterance);
    } catch (err) {
        if (onError) onError(err);
        else if (onEnd) onEnd();
    }
};
