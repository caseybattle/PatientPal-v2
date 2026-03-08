'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, FileText, Search, Calendar, Edit, Pill, Bell } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Understand Your Records',
    description: 'Access all your medical history, lab results, and health data in one secure, easy-to-read dashboard.',
    icon: <FileText className="w-20 h-20 text-primary" strokeWidth={1.5} />,
    subIcon: <Search className="w-8 h-8 text-white" />,
  },
  {
    id: 2,
    title: 'Prep for Doctor Visits',
    description: 'Organize your questions and symptoms before your appointment to make every minute count.',
    icon: <Calendar className="w-20 h-20 text-primary" strokeWidth={1.5} />,
    subIcon: <Edit className="w-8 h-8 text-white" />,
  },
  {
    id: 3,
    title: 'Track Your Medications',
    description: 'Never miss a dose again. Set up smart reminders and track your refills automatically.',
    icon: <Pill className="w-20 h-20 text-primary" strokeWidth={1.5} />,
    subIcon: <Bell className="w-8 h-8 text-white" />,
  }
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      router.push('/login');
    }
  };

  const handleSkip = () => {
    router.push('/login');
  };

  return (
    <div className="relative flex h-screen w-full max-w-md mx-auto flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      {/* Header with Skip */}
      <div className="flex items-center p-6 justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" fill="currentColor" />
          </div>
          <span className="font-bold text-lg tracking-tight font-display">PatientPal</span>
        </div>
        <button onClick={handleSkip} className="text-primary font-semibold text-sm hover:opacity-80 transition-opacity">
          Skip
        </button>
      </div>

      {/* Carousel Container */}
      <div className="flex-1 flex flex-col justify-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center px-8 w-full absolute inset-0"
          >
            <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
              <div className="relative z-10 w-48 h-48 bg-white dark:bg-slate-800 rounded-full shadow-xl flex items-center justify-center border-4 border-primary/20">
                {steps[currentStep].icon}
              </div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-primary rounded-2xl shadow-lg flex items-center justify-center">
                {steps[currentStep].subIcon}
              </div>
            </div>
            
            <div className="text-center space-y-4 max-w-sm">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                {steps[currentStep].title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {steps[currentStep].description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="p-8 space-y-8 z-10">
        {/* Progress Dots */}
        <div className="flex w-full flex-row items-center justify-center gap-2">
          {steps.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentStep ? 'w-6 bg-primary' : 'w-2.5 bg-primary/20'
              }`} 
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          {currentStep < steps.length - 1 ? (
            <div className="flex gap-4">
              <button 
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                className={`flex-1 cursor-pointer items-center justify-center rounded-xl h-14 px-5 bg-primary/10 text-primary text-base font-bold transition-all hover:bg-primary/20 ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Back
              </button>
              <button 
                onClick={handleNext}
                className="flex-[2] cursor-pointer items-center justify-center rounded-xl h-14 px-5 bg-primary text-white text-base font-bold shadow-lg shadow-primary/25 hover:brightness-110 transition-all"
              >
                Next
              </button>
            </div>
          ) : (
            <button 
              onClick={handleNext}
              className="w-full cursor-pointer items-center justify-center rounded-xl h-14 px-5 bg-primary text-white text-base font-bold shadow-lg shadow-primary/25 hover:brightness-110 transition-all"
            >
              Get Started
            </button>
          )}
        </div>
      </div>

      {/* Background Accents */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
