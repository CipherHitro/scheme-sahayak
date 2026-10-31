# Phase 13 — Web Speech API Implementation & Manual Browser Testing Guide

> **Architecture:** Pure browser-native Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition` for STT; `speechSynthesis` for TTS).  
> **Backend / Paid API usage:** **ZERO**. No external cloud endpoints, tokens, or paid STT services are used.  
> **Testing Principle:** Never claim Gujarati voice works until tested on the exact demo device and browser. Touch/button controls remain permanently available as primary fallback.

---

## 1. Feature Detection & Locale Mapping

The application uses standard browser feature detection before invoking any speech APIs:

```typescript
export function getSpeechLocale(language: Language = 'en'): 'gu-IN' | 'hi-IN' | 'en-IN' {
  switch (language) {
    case 'gu': return 'gu-IN'
    case 'hi': return 'hi-IN'
    case 'en': default: return 'en-IN'
  }
}
```

| Application Locale | BCP 47 Speech Tag | TTS Engine Voice Target | STT Speech Recognition Target |
| :--- | :--- | :--- | :--- |
| **`gu` (Gujarati)** | `gu-IN` | `SpeechSynthesisUtterance.lang = "gu-IN"` | `webkitSpeechRecognition.lang = "gu-IN"` |
| **`hi` (Hindi)** | `hi-IN` | `SpeechSynthesisUtterance.lang = "hi-IN"` | `webkitSpeechRecognition.lang = "hi-IN"` |
| **`en` (English)** | `en-IN` | `SpeechSynthesisUtterance.lang = "en-IN"` | `webkitSpeechRecognition.lang = "en-IN"` |

---

## 2. Browser Compatibility Matrix

| Browser | Speech Recognition (STT) | Speech Synthesis (TTS) | Manual Test Status |
| :--- | :--- | :--- | :--- |
| **Google Chrome (Desktop / Android)** | Supported (`webkitSpeechRecognition`) | Supported (`speechSynthesis`) | Best performance. Hindi and Gujarati recognition supported if Google voice language packs installed. |
| **Microsoft Edge (Chromium)** | Supported (`webkitSpeechRecognition`) | Supported (Natural voices) | Fully supported. Natural Hindi / Indian English voices available. |
| **Apple Safari (iOS / macOS)** | Partial (`webkitSpeechRecognition`) | Supported | Requires explicit per-origin microphone grant in iOS Settings. |
| **Mozilla Firefox** | Flag required (`media.webspeech.recognition.enable`) | Supported | Falls back cleanly to touch controls with honest error badge. |

---

## 3. Step-by-Step Manual Browser Testing Protocol

### Test Case A: Read-Aloud (`speechSynthesis`) with Visible Stop Control
1. Start the dev server: `npm run dev`.
2. Open `http://localhost:5173/profile` (or `http://localhost:5173/consent`).
3. Click the speaker icon button labelled **"Listen to question"** (or **"પ્રશ્ન સાંભળો"**).
4. Verify the browser begins synthesizing speech.
5. Verify the button changes immediately to a distinct red/coral **"Stop reading"** (**"વાંચન બંધ કરો"**) control.
6. Click **"Stop reading"**.
7. Verify speech stops immediately.

### Test Case B: Voice Input Recognition & Option Matching
1. On any profile question step (e.g. Question 1: *"Are you a permanent resident of Gujarat?"*), click the **Microphone** icon.
2. An accessible dialog opens:
   - Shows active language tag: *"Listening in Gujarati (gu-IN)..."*
   - Animated pulse indicates recording status (safely disabled when `prefers-reduced-motion` is active).
3. Say clearly into your microphone: *"હા"* (or *"Yes"* in English).
4. Verify the live transcript displays *"હા"* (or *"Yes"*).
5. Stop speaking or click **"Stop listening"**.
6. The modal displays:
   - **You said:** *"હા"*
   - **Matched option:** *"હા, હું ગુજરાતનો કાયમી નિવાસી છું"*
   - **Action:** *"Yes, use this answer"*
7. Click **"Yes, use this answer"**.
8. Verify the answer is recorded, the dialog closes, and the question is marked answered.

### Test Case C: Permission Denied or Unsupported Browser
1. In Chrome, click the site settings icon in the address bar and set **Microphone** to **Block**.
2. Refresh and click the microphone icon.
3. Verify the application does NOT crash.
4. Verify a clear alert appears:
   *"Microphone access was denied. Please enable microphone permissions in your browser address bar, or use the button controls."*
5. Verify the user can still answer using regular tap/click buttons.

---

## 4. Judging Demo Fallback Recommendation

If internet connectivity is throttled or the demo device lacks Gujarati speech recognition language packs:
1. Touch controls (buttons, cards, radio choices) remain 100% accessible and responsive.
2. The UI explicitly alerts the user with:
   *"Web Speech Prototype: Recognition accuracy depends on browser language models. Touch controls remain fully available."*
3. Read-aloud (`speechSynthesis`) can be demonstrated reliably offline on macOS/Android/Windows as voices are pre-installed.
