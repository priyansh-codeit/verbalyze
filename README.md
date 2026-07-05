# 🗣️ Verbalyze - Voice-First AI Interview Prep Platform

**The future of interview preparation is voice-first. Practice with an AI interviewer that listens, adapts, and challenges you in real-time.**

Verbalyze is an interactive, high-fidelity mock interview platform built with a pure client-side stack. This application leverages the browser's built-in **Web Speech API** and **Web Audio API** to deliver a fully functional, real-time voice-first interview simulation without requiring external API keys, proxy servers, or cloud configuration.

---

## 🚀 Key Features

1. **🗣️ Interactive Voice Interviewer**:
   - Speaks questions dynamically utilizing local browser Text-to-Speech (TTS) synthesis.
   - Automatically transcribes your vocal answers in real-time using continuous Speech-to-Text (STT) recognition.
   
2. **🎙️ Web Audio Waveform Visualizer**:
   - Captures raw audio stream from your microphone via `MediaStreamAudioSourceNode`.
   - Processes frequencies using `AnalyserNode` to execute a Fast Fourier Transform (FFT).
   - Animates a glowing, real-time cyan frequency waveform on an HTML5 Canvas when you speak.
   - Automatically transitions to a smooth, rhythmic indigo breathing sine wave when the AI speaks or is processing.

3. **🎯 Multi-Mode Configuration**:
   - **Behavioral Focus**: Questions designed to test teamwork, leadership, and conflict resolution using the STAR method structure.
   - **Technical Focus**: JavaScript event loop, CSS positionings, closures, virtual DOM diffing, Virtual vs Real DOM, SQL vs NoSQL, and bundle optimization.
   - **System Design Focus**: Bitly URL shortener architectures, real-time Slack/WhatsApp design, CDN geo-routing, and distributed payment idempotency.
   - **Target Seniority**: Adjust answer expectations and grading parameters for **Junior**, **Mid-Level**, and **Senior** candidates.
   - **Target Role Selection**: Choose from Frontend, Backend, Fullstack, Mobile, or DevOps.

4. **📊 Intelligent Report Card**:
   - Evaluates performance across 4 weighted metrics:
     * **Keywords Matched (40%)**: Searches transcripts using boundary regex matching for essential conceptual technical/behavioral terms.
     * **Completeness (30%)**: Compares word count against role difficulty targets (Junior: 40 words, Mid: 70 words, Senior: 100 words).
     * **Clarity (10%)**: Scans responses for verbal filler phrases (`um`, `uh`, `like`, `basically`, `actually`, `you know`) and applies minor grading penalties.
     * **Structure (20%)**: Checks for logical connectors (`because`, `therefore`, `trade-off`) and STAR framework indicators (`situation`, `task`, `action`, `result`).
   - Generates an overall Letter Grade (`A+`, `A`, `B`, `C`, `F`) and individual question-by-question tip cards suggesting how to improve.

5. **🗃️ Persistent Dashboard**:
   - Stores session history locally in `localStorage` to compute running performance averages.
   - Renders category mastery progress bars (Behavioral, Technical, System Design).
   - Lists recent attempts with clickable cards to reload previous feedback reports.

---

## 📂 Project Structure

```
mockmate-ai/
├── index.html       # HTML5 structural layout, pages/sections setup (SPA routing panels)
├── style.css        # Premium styling system, dark mode theme variables, and keyframe animations
├── questions.js     # Structured question bank database containing tags, tips, and target keywords
├── interview.js     # State machine coordinator managing audio context, speech synthesis, and canvas rendering
├── feedback.js      # Evaluation engine performing analysis, grading, and tip generation
├── app.js           # Main app router, page events controller, auth handler, and local statistics binder
├── package.json     # Project meta, dependency configurations, and development script definitions
└── push.ps1         # PowerShell deployment script to quickly push local commits to GitHub
```

---

## ⚙️ Architectural Workflow (Under the Hood)

### A. The Conversation State Machine (`interview.js`)
When you click **Begin Voice Session**, the active panel starts a state loop:

```
[Start Session] 
      │
      ▼
      
┌──────────────┐      onend (Speech finishes)       ┌───────────────┐
│ AI Speaking  │────────────────────────────────────>│ User Speaking │
└──────────────┘                                     └───────────────┘
      ▲                                                      │
      │                                                      │ onSubmit / onSilence / manualInput
      │ 1.2s delay ("Thinking")                              ▼
┌──────────────┐                                     ┌───────────────┐
│  Processing  │<────────────────────────────────────│   Listening / │
└──────────────┘                                     │  Transcribing │
                                                     └───────────────┘
```

1. **AI Speaking**: The engine retrieves the question. The pulse dot glows violet and the canvas draws a breathing wave. The browser synthesizes speech.
2. **User Speaking**: As soon as speech synthesis finishes, the microphone activates. The status dot turns green, and Web Speech Recognition listens continuously, printing interim and final transcripts directly to the screen.
3. **Processing**: Once the user submits, skips, or stays silent, the microphone turns off, the engine enters a 1.2s artificial "thinking" delay, saves the question transcripts, and moves to the next question.

### B. The Evaluation Engine (`feedback.js`)
The `FeedbackEngine` computes a final score ($0$ to $100$) for each question based on a weighted average of four factors:

$$\text{Score} = (\text{Keywords} \times 0.40) + (\text{Completeness} \times 0.30) + (\text{Structure} \times 0.20) + (\text{Clarity} \times 0.10)$$

* **Keyword Analysis (40%)**: Compares transcript strings with regular expressions. E.g., for a "closures" question, it scans for `\bclosure\b`, `\blexical scope\b`, `\bencapsulation\b`, etc.
* **Completeness (30%)**: Standardizes word count against target length based on selected seniority levels.
* **Structure (20%)**: Checks for analytical and behavioral connector words.
* **Clarity (10%)**: Deducts 5 points per filler word (`um`, `uh`, `like`, `basically`, etc.), with a floor of 20 points.

### C. Client-Side Page Router (`app.js`)
- Employs a Single Page Application (SPA) structure. Navigates seamlessly by toggling container visibility (`display: none` / `display: block`) accompanied by custom fade-in classes.
- Intercepts restricted route pages (Dashboard, Practice room, Feedback forms). If a user session does not exist in `localStorage`, the router redirects them to the authentication gate.

---

## 🛠️ Getting Started & Local Development

### Prerequisites
- Node.js (v14 or higher recommended)
- A modern, secure web browser supporting the Web Speech API and Web Audio API (Google Chrome, Microsoft Edge, or Safari).

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/priyansh-codeit/verbalyze.git
   cd verbalyze
   ```

2. **Install dependencies**:
   This project uses `browser-sync` to support real-time hot-reloads and local servers without heavy frameworks:
   ```bash
   npm install
   ```

3. **Run the local development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   - Open your browser and navigate to `http://localhost:3000`.
   - Ensure you grant **microphone permissions** in your browser settings when starting an interview.

---

## 👤 Author

Developed with ❤️ by **Priyansh Yadav**
- **Email**: [y.priyansh2438@gmail.com](mailto:y.priyansh2438@gmail.com)
- **GitHub**: [priyansh-codeit](https://github.com/priyansh-codeit)
