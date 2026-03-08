'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldPlus, Mail, Lock, ArrowRight } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary mb-4 shadow-lg shadow-primary/20">
            <ShieldPlus className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">PatientPal</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Create your health companion account</p>
        </div>

        {/* Card Container */}
        <div className="bg-white dark:bg-slate-800/50 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-none p-8 border border-slate-100 dark:border-slate-700/50">
          <form onSubmit={handleSignup} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <div className="space-y-2">
                <label htmlFor="first-name" className="text-sm font-medium text-slate-700 dark:text-slate-300">First name</label>
                <input 
                  type="text" 
                  id="first-name" 
                  required 
                  placeholder="John"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" 
                />
              </div>
              {/* Last Name */}
              <div className="space-y-2">
                <label htmlFor="last-name" className="text-sm font-medium text-slate-700 dark:text-slate-300">Last name</label>
                <input 
                  type="text" 
                  id="last-name" 
                  required 
                  placeholder="Doe"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" 
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="email" 
                  id="email" 
                  required 
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" 
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="password" 
                  id="password" 
                  required 
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" 
                />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Must be at least 8 characters long.</p>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 py-1">
              <input 
                type="checkbox" 
                id="terms" 
                required
                className="mt-1 w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" 
              />
              <label htmlFor="terms" className="text-xs text-slate-600 dark:text-slate-400 leading-tight">
                By creating an account, I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full py-3.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-lg shadow-primary/20 transform active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              Create Account
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social Divider */}
          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <span className="relative px-4 bg-white dark:bg-slate-800 text-xs text-slate-500 uppercase tracking-widest">Or sign up with</span>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"></path>
              </svg>
              <span className="text-sm font-medium">Google</span>
            </button>
            <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.15 2.95.97 3.83 2.14-3.25 1.89-2.73 6.36.46 7.68-.73 1.25-1.64 2.44-2.94 3.19zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span className="text-sm font-medium">Apple</span>
            </button>
          </div>
        </div>

        {/* Bottom Link */}
        <p className="text-center mt-8 text-slate-600 dark:text-slate-400">
          Already have an account? 
          <Link href="/login" className="text-primary font-semibold hover:underline decoration-2 underline-offset-4 ml-1">Sign in here</Link>
        </p>

        {/* Footer Info */}
        <div className="mt-12 flex justify-center gap-6">
          <a href="#" className="text-xs text-slate-400 hover:text-primary transition-colors">Help Center</a>
          <a href="#" className="text-xs text-slate-400 hover:text-primary transition-colors">Security</a>
          <a href="#" className="text-xs text-slate-400 hover:text-primary transition-colors">HIPAA Compliance</a>
        </div>
      </div>

      {/* Background Decoration Elements */}
      <div className="fixed top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="fixed bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl -z-10"></div>
    </div>
  );
}
