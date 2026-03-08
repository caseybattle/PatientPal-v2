'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Stethoscope, Info, Mic, MicOff, Sparkles, Brain, CheckCircle, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { useRouter } from 'next/navigation';
import Markdown from 'react-markdown';

export default function ExplainPage() {
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Initialize Speech Recognition
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            setInputText((prev) => prev + transcript + ' ');
          } else {
            currentTranscript += transcript;
          }
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        if (event.error === 'not-allowed') {
          alert('Microphone access was denied. Please allow microphone access in your browser settings to use this feature.');
        }
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
      } else {
        alert('Speech recognition is not supported in this browser.');
      }
    }
  };

  const handleExplain = async () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    try {
      // Initialize Gemini API
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Explain the following medical text in plain English, suitable for a patient to understand. Be empathetic and clear. Text: "${inputText}"`,
        config: {
          systemInstruction: "You are an empathetic, highly knowledgeable medical assistant helping patients understand their medical records and jargon.",
        }
      });
      
      setExplanation(response.text || "I couldn't generate an explanation.");
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setExplanation("Sorry, there was an error processing your request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col font-display">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-2xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.back()}
              className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">AI Explain</h1>
          </div>
          <button 
            onClick={() => alert('This tool uses AI to translate complex medical jargon into plain English. Simply type, paste, or speak your medical text.')}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Info className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto w-full p-4 space-y-6">
        {/* Input Section */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">Translate Medical Jargon</h2>
          <div className="relative group">
            <div className={`flex w-full items-stretch rounded-xl shadow-sm border transition-all ${isListening ? 'border-red-500 ring-2 ring-red-500/20' : 'border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary'} bg-white dark:bg-slate-900`}>
              <textarea 
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-xl border-none bg-transparent py-4 px-4 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-0 text-base leading-relaxed outline-none" 
                placeholder={isListening ? "Listening..." : "Paste medical text, lab results, or speak..."}
                rows={4}
              ></textarea>
              <div className="flex flex-col justify-end p-2 gap-2 border-l border-slate-100 dark:border-slate-800">
                <button 
                  onClick={toggleListening}
                  className={`p-3 rounded-lg transition-colors ${isListening ? 'bg-red-100 text-red-500 dark:bg-red-900/30' : 'text-primary hover:bg-primary/10'}`} 
                  title={isListening ? "Stop Listening" : "Voice Input"}
                >
                  {isListening ? <MicOff className="w-5 h-5 animate-pulse" /> : <Mic className="w-5 h-5" />}
                </button>
                <button 
                  onClick={handleExplain}
                  disabled={isLoading || !inputText.trim()}
                  className="p-3 rounded-lg bg-primary text-white shadow-md hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Sparkles className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* AI Response Section */}
        {(explanation || isLoading) && (
          <section className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                AI Explanation
              </h2>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-5 space-y-4">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Plain-English Summary</h3>
                  {isLoading ? (
                    <div className="space-y-2 animate-pulse">
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/6"></div>
                    </div>
                  ) : (
                    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed">
                      <Markdown>{explanation || ''}</Markdown>
                    </div>
                  )}
                </div>
                
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-3">
                  <button 
                    onClick={() => {
                      setInputText('');
                      inputRef.current?.focus();
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Ask follow-up
                  </button>
                  <button 
                    onClick={() => alert('Explanation copied to clipboard!')}
                    className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => alert('Saved to your bookmarks!')}
                    className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Suggestions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button 
                onClick={() => setInputText("What are the next steps?")}
                className="text-left p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors"
              >
                <p className="text-xs text-slate-500 mb-1">Suggested Question</p>
                <p className="text-sm font-medium text-primary">&quot;What are the next steps?&quot;</p>
              </button>
              <button 
                onClick={() => setInputText("Are there any side effects?")}
                className="text-left p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors"
              >
                <p className="text-xs text-slate-500 mb-1">Suggested Question</p>
                <p className="text-sm font-medium text-primary">&quot;Are there any side effects?&quot;</p>
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
