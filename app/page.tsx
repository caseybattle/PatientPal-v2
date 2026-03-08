'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldPlus, Lock } from 'lucide-react';
import { motion } from 'motion/react';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,#2579cc_0%,#1e6ebe_100%)]">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative flex flex-col items-center gap-8 px-6">
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [1, 0.95, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          <div className="bg-white p-6 rounded-xl shadow-2xl flex items-center justify-center aspect-square w-32 h-32 md:w-40 md:h-40">
            <ShieldPlus className="w-20 h-20 text-primary" strokeWidth={1.5} />
          </div>
        </motion.div>
        
        <div className="flex flex-col items-center gap-2 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white text-4xl md:text-5xl font-bold tracking-tight font-display"
          >
            PatientPal
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/90 text-lg md:text-xl font-medium"
          >
            Your AI-powered health advocate
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 w-48 flex flex-col items-center gap-4"
        >
          <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="bg-white h-full rounded-full"
            />
          </div>
          <p className="text-white/60 text-xs font-medium uppercase tracking-widest">
            Initializing Care
          </p>
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-white/50 text-sm">
          <Lock className="w-4 h-4" />
          <span>Secure AI-powered Healthcare</span>
        </div>
      </div>
    </div>
  );
}
