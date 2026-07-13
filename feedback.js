// MockMate AI Feedback & Scoring Engine
class FeedbackEngine {
  static analyzeSession(results, mode, difficulty) {
    let totalScore = 0;
    let totalKeywordsCount = 0;
    let foundKeywordsCount = 0;
    let totalClarity = 0;
    let totalCompleteness = 0;
    let totalStructure = 0;
    
    const questionsFeedback = results.map((item, index) => {
      const answer = item.userAnswer || '';
      const cleanAnswer = answer.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"");
      
      // 1. Keyword analysis
      const matched = [];
      const missing = [];
      item.keywords.forEach(kw => {
        totalKeywordsCount++;
        // Use regex for boundary matching to prevent partial matching (e.g. "rest" in "interest")
        const regex = new RegExp(`\\b${kw.toLowerCase()}\\b`, 'i');
        if (regex.test(cleanAnswer)) {
          matched.push(kw);
          foundKeywordsCount++;
        } else {
          missing.push(kw);
        }
      });
      
      let keywordScore = 0;
      if (answer !== '[Skipped by candidate]') {
        keywordScore = item.keywords.length > 0 
          ? Math.round((matched.length / item.keywords.length) * 100) 
          : 100;
      }
        
      // 2. Length/Completeness analysis
      const wordCount = answer.split(/\s+/).filter(w => w.length > 0).length;
      let targetWordCount = 60; // default
      if (difficulty === 'junior') targetWordCount = 40;
      else if (difficulty === 'mid') targetWordCount = 70;
      else if (difficulty === 'senior') targetWordCount = 100;
      
      let completenessScore = 0;
      if (answer === '[Skipped by candidate]') {
        completenessScore = 0;
      } else {
        completenessScore = Math.min(Math.round((wordCount / targetWordCount) * 100), 100);
      }
      
      // 3. Clarity & Filler words (Um, Uh, Like, Basically, Actually, You know)
      const fillers = ["um", "uh", "like", "basically", "actually", "you know"];
      let fillerCount = 0;
      const words = cleanAnswer.split(/\s+/);
      
      words.forEach(w => {
        if (fillers.includes(w)) fillerCount++;
      });
      // also check "you know" phrase
      const youKnowMatches = (cleanAnswer.match(/you know/g) || []).length;
      fillerCount += youKnowMatches;
      
      let clarityScore = 100 - (fillerCount * 5);
      if (answer === '[Skipped by candidate]') clarityScore = 0;
      clarityScore = Math.max(clarityScore, 20); // minimum score of 20 unless skipped
      
      // 4. Structure (STAR method search for behavioral, Logical connectors for technical/system-design)
      let structureScore = 50; // base structure
      if (answer !== '[Skipped by candidate]' && wordCount > 10) {
        if (mode === 'behavioral') {
          // Check for STAR indicators: situation, task, action, result, outcome, conflict, learned
          const starIndicators = ["situation", "task", "action", "result", "outcome", "learned", "managed", "goal", "solve"];
          let starMatches = 0;
          starIndicators.forEach(indicator => {
            if (cleanAnswer.includes(indicator)) starMatches++;
          });
          structureScore += (starMatches * 8);
        } else {
          // Technical / System design indicators: because, since, therefore, example, scale, trade-off, database, architecture
          const techIndicators = ["because", "since", "therefore", "example", "specifically", "trade-off", "performance", "design", "architecture", "choice"];
          let techMatches = 0;
          techIndicators.forEach(indicator => {
            if (cleanAnswer.includes(indicator)) techMatches++;
          });
          structureScore += (techMatches * 8);
        }
      } else {
        structureScore = 0;
      }
      structureScore = Math.min(Math.max(structureScore, 0), 100);
      
      // Calculate Question Final Weighted Score
      // Keywords: 40%, Completeness: 30%, Structure: 20%, Clarity: 10%
      let qScore = Math.round(
        (keywordScore * 0.40) + 
        (completenessScore * 0.30) + 
        (structureScore * 0.20) + 
        (clarityScore * 0.10)
      );
      
      if (answer === '[Skipped by candidate]') qScore = 0;
      totalScore += qScore;
      totalClarity += clarityScore;
      totalCompleteness += completenessScore;
      totalStructure += structureScore;
      
      // Generate individual tips
      let tip = '';
      if (answer === '[Skipped by candidate]') {
        tip = `You skipped this question. Key concepts to study: ${item.keywords.join(', ')}. ${item.tips}`;
      } else if (keywordScore < 50) {
        tip = `Your response missed critical terms like [${missing.slice(0, 3).join(', ')}]. Try integrating these technical concepts. ${item.tips}`;
      } else if (fillerCount > 3) {
        tip = `Strong conceptual knowledge, but you used ${fillerCount} speech filler words (e.g. "um", "like"). Practice pauses instead.`;
      } else if (completenessScore < 60) {
        tip = `Well stated but too brief (${wordCount} words). Add more details or examples to thoroughly answer the question.`;
      } else {
        tip = `Excellent job! You covered key concepts: ${matched.join(', ')}. Clear delivery and structural pacing.`;
      }
      
      return {
        ...item,
        score: qScore,
        wordCount,
        fillerCount,
        matchedKeywords: matched,
        missingKeywords: missing,
        individualTip: tip,
        breakdown: {
          keywords: keywordScore,
          completeness: completenessScore,
          structure: structureScore,
          clarity: clarityScore
        }
      };
    });
    
    const count = results.length;
    const finalScore = count > 0 ? Math.round(totalScore / count) : 0;
    const avgKeywordMatch = count > 0 ? Math.round((foundKeywordsCount / Math.max(totalKeywordsCount, 1)) * 100) : 0;
    const avgCompleteness = count > 0 ? Math.round(totalCompleteness / count) : 0;
    const avgClarity = count > 0 ? Math.round(totalClarity / count) : 0;
    const avgStructure = count > 0 ? Math.round(totalStructure / count) : 0;
    
    // Determine letter grade
    let grade = 'F';
    if (finalScore >= 95) grade = 'A+';
    else if (finalScore >= 90) grade = 'A';
    else if (finalScore >= 80) grade = 'B';
    else if (finalScore >= 70) grade = 'C';
    else grade = 'F';
    
    // Determine overall review text
    let summaryText = '';
    if (finalScore >= 90) {
      summaryText = `Outstanding performance! You displayed exceptional technical depth and structural clarity. You addressed questions thoroughly using accurate industry terminology, showing senior-level maturity.`;
    } else if (finalScore >= 80) {
      summaryText = `Solid attempt. You understand the core topics well, though there is room for improvement in formatting technical explanations and reducing speech filler phrases. Review the individual tips below.`;
    } else if (finalScore >= 70) {
      summaryText = `A passing attempt. You have fundamental knowledge, but you missed several critical terms and your answers were slightly brief. Focus on structural frameworks (like STAR) and study the missing concepts.`;
    } else {
      summaryText = `Needs improvement. Many questions were skipped or answered with very brief definitions. Review the materials, write down structured notes, and try again. Practice makes perfect!`;
    }
    
    return {
      grade,
      score: finalScore,
      summary: summaryText,
      metrics: {
        keywords: avgKeywordMatch,
        completeness: avgCompleteness,
        clarity: avgClarity,
        structure: avgStructure
      },
      questions: questionsFeedback,
      date: new Date().toISOString()
    };
  }
}

// Export
window.FeedbackEngine = FeedbackEngine;
