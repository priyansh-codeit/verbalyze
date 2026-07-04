# Verbalyze - Voice-First AI Interview Prep Platform

**The future of interview preparation is voice-first. Practice with an AI interviewer that listens, adapts, and challenges you in real-time.**

[Live Demo](https://verbalyze.vercel.app)

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

## 🛠️ Getting Started

1. **Install dependencies**:
   ```bash
   npm install
