'use client';

import { useState } from 'react';
import { Menu, History, Clock, Brain, Thermometer, Frown, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SymptomsPage() {
  const router = useRouter();
  const [symptoms, setSymptoms] = useState([
    {
      id: 1,
      title: 'Headache',
      severity: 'Moderate',
      time: '10:30 AM',
      description: 'Persistent throbbing in the temples. Feels better after lying down in a dark room.',
      icon: Brain,
      color: 'orange'
    },
    {
      id: 2,
      title: 'Fever',
      severity: 'Severe',
      time: '08:15 AM',
      description: 'Body temperature reached 101.5°F. Chills and body aches present.',
      icon: Thermometer,
      color: 'red'
    },
    {
      id: 3,
      title: 'Nausea',
      severity: 'Mild',
      time: '07:00 AM',
      description: 'Slight discomfort after waking up. Subsides after drinking water.',
      icon: Frown,
      color: 'green'
    }
  ]);

  const addSymptom = () => {
    const title = window.prompt('What symptom are you experiencing?');
    if (!title) return;
    
    const severity = window.prompt('Severity (Mild, Moderate, Severe):') || 'Mild';
    const description = window.prompt('Any additional details?') || 'No details provided.';

    const newSymptom = {
      id: Date.now(),
      title,
      severity,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      description,
      icon: Frown,
      color: severity.toLowerCase() === 'severe' ? 'red' : severity.toLowerCase() === 'moderate' ? 'orange' : 'blue'
    };
    setSymptoms([newSymptom, ...symptoms]);
  };

  const deleteSymptom = (id: number) => {
    if (window.confirm('Are you sure you want to delete this symptom log?')) {
      setSymptoms(symptoms.filter(s => s.id !== id));
    }
  };

  return (
    <div className="flex-1 flex flex-col font-display">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center bg-white/80 dark:bg-background-dark/80 backdrop-blur-md p-4 justify-between border-b border-slate-200 dark:border-slate-800">
        <div 
          onClick={() => router.back()}
          className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-slate-700 dark:text-slate-300" />
        </div>
        <h1 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center">Symptom Log</h1>
        <div 
          onClick={() => alert('History view coming soon!')}
          className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
        >
          <History className="w-6 h-6 text-slate-700 dark:text-slate-300" />
        </div>
      </header>

      {/* Horizontal Date Picker */}
      <div className="bg-white dark:bg-slate-900 pb-3 pt-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex overflow-x-auto no-scrollbar px-4 gap-4">
          {['Mon', 'Tue', 'Wed'].map((day, i) => (
            <div key={day} className="flex flex-col items-center justify-center min-w-[56px] py-3 rounded-xl text-slate-500 dark:text-slate-400 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
              <p className="text-[10px] font-bold uppercase tracking-wider">{day}</p>
              <p className="text-lg font-bold">{12 + i}</p>
            </div>
          ))}
          
          {/* Active Day */}
          <div className="flex flex-col items-center justify-center min-w-[56px] py-3 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 cursor-pointer">
            <p className="text-[10px] font-bold uppercase tracking-wider">Thu</p>
            <p className="text-lg font-bold">15</p>
            <div className="size-1.5 bg-white rounded-full mt-1"></div>
          </div>

          {['Fri', 'Sat', 'Sun'].map((day, i) => (
            <div key={day} className="flex flex-col items-center justify-center min-w-[56px] py-3 rounded-xl text-slate-500 dark:text-slate-400 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
              <p className="text-[10px] font-bold uppercase tracking-wider">{day}</p>
              <p className="text-lg font-bold">{16 + i}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-4 space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-slate-900 dark:text-slate-100 text-xl font-bold tracking-tight">Today&apos;s Timeline</h3>
          <button 
            onClick={() => alert('Viewing all symptoms...')}
            className="text-primary font-semibold text-sm hover:underline"
          >
            View All
          </button>
        </div>

        {/* Symptom Cards */}
        <div className="space-y-4 pb-20">
          {symptoms.length === 0 ? (
            <div className="text-center py-10 text-slate-500">
              No symptoms logged today.
            </div>
          ) : (
            symptoms.map((symptom) => {
              const Icon = symptom.icon;
              return (
                <div key={symptom.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-start gap-4 group">
                  <div className={`size-12 rounded-lg flex items-center justify-center shrink-0 ${
                    symptom.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' :
                    symptom.color === 'red' ? 'bg-red-100 dark:bg-red-900/30 text-red-600' :
                    symptom.color === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' :
                    'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 text-lg">{symptom.title}</h4>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${
                          symptom.color === 'orange' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400' :
                          symptom.color === 'red' ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' :
                          symptom.color === 'green' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' :
                          'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
                        }`}>
                          {symptom.severity}
                        </span>
                        <button 
                          onClick={() => deleteSymptom(symptom.id)}
                          className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-2 flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {symptom.time}
                    </p>
                    <p className={`text-slate-600 dark:text-slate-300 text-sm leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border-l-4 ${
                      symptom.color === 'orange' ? 'border-orange-500' :
                      symptom.color === 'red' ? 'border-red-500' :
                      symptom.color === 'green' ? 'border-green-500' :
                      'border-blue-500'
                    }`}>
                      {symptom.description}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* Floating Action Button */}
      <button 
        onClick={addSymptom}
        className="fixed bottom-24 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl hover:scale-105 active:scale-95 transition-all z-40"
      >
        <Plus className="w-8 h-8" />
      </button>
    </div>
  );
}
