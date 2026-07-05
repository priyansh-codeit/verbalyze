# Verbalyze - Voice-First AI Interview Prep Platform

**The future of interview preparation is voice-first. Practice with an AI interviewer that listens, adapts, and challenges you in real-time.**


An interactive, high-fidelity mock interview platform built with a pure client-side stack. This application leverages the browser's built-in **Web Speech API** and **Web Audio API** to deliver a fully functional voice-first interview simulation without requiring external API keys or server configuration.

## 🚀 Features

1. **🗣️ Interactive Voice Interviewer**: Speaks questions utilizing the browser's Text-to-Speech synthesis and transcribes your vocal answers in real-time via Speech Recognition.
2. **🎙️ Web Audio Waveform Visualizer**: Draws a real-time glowing canvas frequency wave reflecting your voice input (using the Web Audio `AnalyserNode`) and transitions to a simulated rhythmic breathing wave when the AI speaks.
3. **🎯 Multi-Mode Configuration**: Pick between behavioral (STAR method questions), technical (CS concepts & scripting), and system design focus areas, set seniority parameters (Junior, Mid, Senior), and choose target roles.
4. **📊 Intelligent Report Card**: Evaluates your performance:
   - **Concepts Matched**: Searches your transcripts for critical conceptual keywords.
   - **Completeness**: Checks answer length against targets.
   - **Clarity**: Detects speech filler words ("um", "like", "basically").
   - **Structure**: Validates logical sequencing connectors.
5. **🗃️ Persistent Dashboard**: Stores historical sessions in `localStorage` to display metrics graphs, average scores, and recent attempts.

## 📂 Project Structure

- `index.html` - Container layout for the landing panel, selector hub, active voice room, and feedback grids.
- `style.css` - Custom styling tokens, deep-theme variables, responsive containers, 3D hover effects, and keyframe animations.
- `questions.js` - Database of curated interview questions, evaluating keywords, and structural hints.
- `interview.js` - Voice-first state engine managing speech synthesis, voice capture, and Canvas visualizer rendering.
- `feedback.js` - Evaluation parser calculating metrics, scoring answers, and suggesting improvements.
- `app.js` - Routing controller, dashboard data aggregates, and DOM bindings.


    Technology Stack & APIs Used
  
To build a premium, voice-first application that runs entirely in the browser without requiring paid third-party Voice AI servers (like VAPI or Hume), we leveraged advanced native HTML5 and browser web APIs:

1. Web Speech API (Speech Synthesis & Recognition)
SpeechSynthesis (Text-to-Speech): Converts the interview question texts into natural spoken audio. It searches your system for the highest quality English voice profile (preferring natural Google voices) and sets a fluid reading rate.
webkitSpeechRecognition (Speech-to-Text): A continuous speech recognition interface that listens to your microphone, transcribes your voice in real-time, and dynamically prints it to the screen.
2. Web Audio API & Canvas Rendering (Waveform Visualizer)
MediaStreamAudioSourceNode: Captures raw audio streams from your microphone.
AnalyserNode: Processes the audio stream in real-time, performing a Fast Fourier Transform (FFT) to extract sound frequency values.
HTML5 Canvas API: An animation loop (requestAnimationFrame) reads these frequency values and draws a glowing cyan waveform. When the AI speaks, it dynamically switches to draw a smooth, rhythmic indigo sine wave.
3. LocalStorage Database (Persistent Storage)
verbalyze_history: Stores mock interview session history (categories, questions, transcripts, scores).
verbalyze_platform_feedback: Stores ratings and comments submitted to the platform feedback page.
verbalyze_user: Holds the signed-in candidate's profile session.
⚙️ How the Platform Works (Under the Hood)
A. The Conversation State Machine (interview.js)
When you click Begin Voice Session, the active room sets up a state loop:



[Start Session] 
      │
      ▼
┌──────────────┐      onend (Question finishes)      ┌───────────────┐
│ AI Speaking  │────────────────────────────────────>│ User Speaking │
└──────────────┘                                     └───────────────┘
      ▲                                                      │
      │                                                      │ onSubmit / onSilence
      │ 1.2s delay ("Thinking")                              ▼
┌──────────────┐                                     ┌───────────────┐
│  Processing  │<────────────────────────────────────│   Listen /    │
└──────────────┘                                     │  Transcribe   │
                                                     └───────────────┘
AI Speaking: The platform reads the current question. The pulse dot glows purple and the canvas displays a rhythmic breathing wave.
User Speaking: Once the AI finishes speaking, the engine requests microphone access, sets the status dot to green, and starts transcribing.
Processing: Once you click submit, skip, or stay silent, the engine stops listening, saves your transcript, pauses briefly to simulate thinking, and moves to the next question.
B. The Evaluation & Grading Engine (feedback.js)
Once an interview is completed, the responses are sent to the FeedbackEngine. It computes a score (0 to 100) for each question based on a weighted average of four factors:

Final Question Score
=
(
Keywords
×
0.40
)
+
(
Completeness
×
0.30
)
+
(
Structure
×
0.20
)
+
(
Clarity
×
0.10
)
Final Question Score=(Keywords×0.40)+(Completeness×0.30)+(Structure×0.20)+(Clarity×0.10)
Keyword Analysis (40%): Compares your transcript against expected technical terms. If you are answering a closure question, it looks for words like lexical scope, inner function, and encapsulation.
Completeness (30%): Compares your word count against targets adjusted for difficulty:
Junior: 40 words
Mid-Level: 70 words
Senior: 100 words
Structure (20%): For Behavioral, it searches for STAR method indicators (situation, task, action, result, outcome). For Technical, it searches for logical connectors (because, specifically, trade-off, example).
Clarity (10%): Counts speech filler words (um, uh, like, basically, actually, you know) and applies a small penalty per filler word to encourage concise pacing.
Based on the average score, you are graded A+, A, B, C, or F and given specific improvement suggestions.

C. Client-Side Page Router (app.js)
Employs a Single Page Application (SPA) architecture. Rather than making page refreshes, it uses a central navigateTo(viewName) function.
It acts as a router by hiding inactive page panels (display: none) and activating the target panel with a smooth fade-in animation (.view-panel.active).
It intercepts page changes: if a user is not logged in and attempts to access their dashboard or a practice session, the router redirects them to the auth gate, saving their intended destination to load post-login.

## 🛠️ Getting Started

1. **Install dependencies**:
   ```bash
   npm install
for further details you can see Explanation.txt file
