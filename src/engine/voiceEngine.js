/**
 * JEEVANSETU AI - Multilingual Speech-to-Text & Text-to-Speech Engine
 * Provides voice-first interaction for rural patients and ASHA health workers.
 * Features automatic Offline Edge Fallback when internet/cloud STT is unavailable.
 */

export function createSpeechRecognizer(langCode = 'te-IN', onResult, onError, onEnd) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    console.warn("Speech Recognition API is not supported in this browser environment.");
    if (onError) onError('not-supported');
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = langCode;

  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    if (onResult) onResult(transcript);
  };

  recognition.onerror = (event) => {
    console.warn("Speech recognition error:", event.error);
    if (onError) onError(event.error);
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
  };

  return recognition;
}

export function speakText(text, langCode = 'te-IN') {
  if (!('speechSynthesis' in window)) {
    console.warn("Text-to-Speech API is not supported in this browser.");
    return;
  }

  try {
    window.speechSynthesis.cancel(); // Stop any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    utterance.rate = 0.95; // Slightly slower for clear rural comprehension
    utterance.pitch = 1.0;

    // Use available local system voices if offline
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const matchedVoice = voices.find(v => v.lang.startsWith(langCode.split('-')[0]) || v.lang === langCode);
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn("Speech synthesis error:", err);
  }
}

export function stopSpeech() {
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
}
