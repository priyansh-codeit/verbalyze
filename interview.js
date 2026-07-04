// MockMate AI Voice Engine
class InterviewEngine {
  constructor(mode, difficulty, role) {
    this.mode = mode;
    this.difficulty = difficulty;
    this.role = role;
    
    // Grab questions from db
    const categoryQuestions = window.QUESTIONS[mode] && window.QUESTIONS[mode][difficulty];
    this.questions = categoryQuestions ? [...categoryQuestions] : [];
    
    // State
    this.currentQuestionIndex = 0;
    this.transcripts = [];
    this.isMuted = false;
    this.state = 'idle'; // 'idle' | 'speaking' | 'listening' | 'processing'
    
    // Browser APIs
    this.recognition = null;
    this.synth = window.speechSynthesis;
    this.utterance = null;
    
    // Audio Visualizer Properties
    this.audioCtx = null;
    this.analyser = null;
    this.micStream = null;
    this.sourceNode = null;
    this.canvasFrameId = null;
    this.isMicActive = false;
    
    // Callbacks
    this.onStateChange = null;
    this.onQuestionChange = null;
    this.onTranscriptUpdate = null;
    this.onComplete = null;
    
    this.initSpeechRecognition();
  }

  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech recognition is not supported in this browser. Falling back to keyboard typing.");
      return;
    }
    
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
    
    this.recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      
      const currentFullText = (this.transcripts[this.currentQuestionIndex] || '') + ' ' + finalTranscript + interimTranscript;
      if (this.onTranscriptUpdate) {
        this.onTranscriptUpdate(currentFullText.trim(), false);
      }
      
      if (finalTranscript) {
        this.transcripts[this.currentQuestionIndex] = ((this.transcripts[this.currentQuestionIndex] || '') + ' ' + finalTranscript).trim();
      }
    };
    
    this.recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      if (event.error === 'not-allowed') {
        alert("Microphone permission denied. Switch to keyboard response or enable mic in browser settings.");
        this.isMicActive = false;
      }
    };
    
    this.recognition.onend = () => {
      // Auto restart if state is still listening
      if (this.state === 'listening' && !this.isMuted) {
        try {
          this.recognition.start();
        } catch (e) {
          // Already running or starting
        }
      }
    };
  }

  async initAudioVisualizer() {
    try {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 256;
      
      // Request mic stream
      this.micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      this.sourceNode = this.audioCtx.createMediaStreamSource(this.micStream);
      this.sourceNode.connect(this.analyser);
      this.isMicActive = true;
    } catch (err) {
      console.warn("Could not access microphone for canvas visualizer:", err);
      this.isMicActive = false;
    }
  }

  changeState(newState) {
    this.state = newState;
    if (this.onStateChange) {
      this.onStateChange(newState);
    }
  }

  start() {
    if (this.questions.length === 0) {
      alert("No questions found for this configuration!");
      return;
    }
    
    this.currentQuestionIndex = 0;
    this.transcripts = new Array(this.questions.length).fill('');
    
    // Start audio node
    this.initAudioVisualizer().then(() => {
      this.speakCurrentQuestion();
    });
  }

  speakCurrentQuestion() {
    if (this.currentQuestionIndex >= this.questions.length) {
      this.completeInterview();
      return;
    }
    
    // Cancel any current speakings
    this.synth.cancel();
    if (this.recognition) {
      try { this.recognition.stop(); } catch (e) {}
    }
    
    this.changeState('speaking');
    const qObj = this.questions[this.currentQuestionIndex];
    
    if (this.onQuestionChange) {
      this.onQuestionChange(this.currentQuestionIndex + 1, qObj.question);
    }
    
    this.utterance = new SpeechSynthesisUtterance(qObj.question);
    
    // Find a decent voice (prefer google/natural voices if available)
    const voices = this.synth.getVoices();
    const premiumVoice = voices.find(v => v.name.includes("Google") && v.lang.startsWith("en")) || 
                          voices.find(v => v.lang.startsWith("en"));
    if (premiumVoice) {
      this.utterance.voice = premiumVoice;
    }
    this.utterance.rate = 1.05; // Slightly faster but natural
    
    this.utterance.onend = () => {
      this.startListening();
    };
    
    this.utterance.onerror = (e) => {
      console.error("Speech Synthesis error:", e);
      // Fallback: wait 3 seconds then listen
      setTimeout(() => this.startListening(), 3000);
    };
    
    this.synth.speak(this.utterance);
  }

  startListening() {
    this.changeState('listening');
    if (this.recognition) {
      try {
        this.recognition.start();
      } catch (e) {
        // already running
      }
    }
  }

  interrupt() {
    if (this.state === 'speaking') {
      this.synth.cancel();
      this.startListening();
    }
  }

  submitAnswer(manualText = null) {
    if (this.recognition) {
      try { this.recognition.stop(); } catch (e) {}
    }
    
    this.changeState('processing');
    
    if (manualText !== null && manualText.trim() !== "") {
      this.transcripts[this.currentQuestionIndex] = manualText.trim();
    }
    
    // Short artificial delay to simulate "thinking" / processing
    setTimeout(() => {
      this.currentQuestionIndex++;
      this.speakCurrentQuestion();
    }, 1200);
  }

  skipQuestion() {
    this.transcripts[this.currentQuestionIndex] = "[Skipped by candidate]";
    this.submitAnswer();
  }

  endInterview() {
    this.synth.cancel();
    if (this.recognition) {
      try { this.recognition.stop(); } catch (e) {}
    }
    this.completeInterview();
  }

  completeInterview() {
    this.changeState('idle');
    this.stopAudioStream();
    
    // Format final data structure
    const results = this.questions.map((q, idx) => ({
      questionId: q.id,
      questionText: q.question,
      userAnswer: this.transcripts[idx] || '',
      keywords: q.keywords,
      tips: q.tips
    }));
    
    if (this.onComplete) {
      this.onComplete(results);
    }
  }

  stopAudioStream() {
    if (this.micStream) {
      this.micStream.getTracks().forEach(track => track.stop());
    }
    if (this.audioCtx) {
      this.audioCtx.close();
    }
    if (this.canvasFrameId) {
      cancelAnimationFrame(this.canvasFrameId);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      if (this.recognition) {
        try { this.recognition.stop(); } catch(e){}
      }
    } else {
      if (this.state === 'listening') {
        this.startListening();
      }
    }
    return this.isMuted;
  }

  // Visualizer Animation
  draw(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    let bufferLength = 0;
    let dataArray = null;
    
    if (this.analyser && this.isMicActive) {
      bufferLength = this.analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);
    }
    
    let time = 0;
    
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.05;
      
      // Draw background design
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      for (let i = 20; i < width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      
      if (this.state === 'listening' && this.analyser && this.isMicActive && !this.isMuted) {
        // Real microphone visualizer - glowing cyan bars
        this.analyser.getByteFrequencyData(dataArray);
        
        const barWidth = (width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;
        
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        
        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i] / 2;
          
          // Draw symmetric bars from the center line
          const yTop = (height / 2) - barHeight;
          const yBottom = (height / 2) + barHeight;
          
          // Gradients
          const gradient = ctx.createLinearGradient(0, yTop, 0, yBottom);
          gradient.addColorStop(0, 'rgba(6, 182, 212, 0.1)');
          gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.85)');
          gradient.addColorStop(1, 'rgba(6, 182, 212, 0.1)');
          
          ctx.fillStyle = gradient;
          ctx.fillRect(x, yTop, barWidth - 2, barHeight * 2);
          
          x += barWidth + 1;
        }
      } else {
        // Simulated beautiful breathing sine waves
        let waveCount = 3;
        let colors = [
          'rgba(99, 102, 241, 0.55)', // Indigo
          'rgba(6, 182, 212, 0.35)',  // Cyan
          'rgba(139, 92, 246, 0.15)'  // Violet
        ];
        
        // Adjust frequency and amplitude based on state
        let speedMultiplier = 1;
        let ampMultiplier = 1;
        
        if (this.state === 'speaking') {
          speedMultiplier = 2.2;
          ampMultiplier = 2.5;
        } else if (this.state === 'processing') {
          speedMultiplier = 0.8;
          ampMultiplier = 0.5;
        } else {
          speedMultiplier = 0.4;
          ampMultiplier = 0.15; // idle breathing
        }
        
        for (let w = 0; w < waveCount; w++) {
          ctx.beginPath();
          ctx.lineWidth = w === 0 ? 3 : 1.5;
          ctx.strokeStyle = colors[w];
          
          const phase = w * Math.PI / 4;
          const frequency = 0.008 + (w * 0.003);
          const baseAmplitude = (35 - (w * 8)) * ampMultiplier;
          
          for (let x = 0; x < width; x++) {
            // Apply a Gaussian envelope so the wave pinches at the left and right edges
            const envelope = Math.sin((x / width) * Math.PI);
            const y = (height / 2) + Math.sin(x * frequency + (time * speedMultiplier) + phase) * baseAmplitude * envelope;
            
            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        }
        
        // Draw a glowing center dot
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 4, 0, Math.PI * 2);
        ctx.fillStyle = this.state === 'speaking' ? 'var(--accent-primary)' : 'var(--accent-secondary)';
        ctx.shadowColor = this.state === 'speaking' ? 'var(--accent-primary)' : 'var(--accent-secondary)';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
      
      this.canvasFrameId = requestAnimationFrame(render);
    };
    
    render();
  }
}

// Export
window.InterviewEngine = InterviewEngine;
