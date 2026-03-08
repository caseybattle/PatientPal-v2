'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Stethoscope, Eye } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[440px] bg-white dark:bg-slate-900 shadow-xl rounded-xl overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800">
        {/* Top App Bar Area */}
        <div className="flex items-center p-4 pb-2 justify-between">
          <div 
            onClick={() => router.back()}
            className="text-slate-900 dark:text-slate-100 flex size-12 shrink-0 items-center justify-start cursor-pointer hover:opacity-70 transition-opacity"
          >
            <ArrowLeft className="w-6 h-6" />
          </div>
          <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">Sign In</h2>
        </div>

        <div className="px-8 pt-8 pb-4">
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 p-3 rounded-full">
              <Stethoscope className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h1 className="text-slate-900 dark:text-slate-100 tracking-tight text-[32px] font-bold leading-tight text-center">Welcome back</h1>
          <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal text-center mt-2">Please enter your credentials to continue to PatientPal</p>
        </div>

        <form onSubmit={handleLogin} className="px-8 space-y-4">
          {/* Email Field */}
          <div className="flex flex-col w-full">
            <label className="text-slate-900 dark:text-slate-100 text-sm font-medium leading-normal pb-2 px-1">Email</label>
            <div className="relative">
              <input 
                type="email" 
                required
                defaultValue="casey@example.com"
                className="flex w-full rounded-xl text-slate-900 dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 h-14 placeholder:text-slate-400 p-4 text-base font-normal" 
                placeholder="name@example.com" 
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col w-full">
            <label className="text-slate-900 dark:text-slate-100 text-sm font-medium leading-normal pb-2 px-1">Password</label>
            <div className="flex w-full items-stretch rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus-within:ring-2 focus-within:ring-primary/50">
              <input 
                type="password" 
                required
                defaultValue="password123"
                className="flex w-full min-w-0 flex-1 border-none bg-transparent h-14 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 p-4 text-base font-normal focus:ring-0 outline-none" 
                placeholder="Enter your password" 
              />
              <button type="button" className="text-slate-400 dark:text-slate-500 flex items-center justify-center px-4 hover:text-slate-600 dark:hover:text-slate-300">
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end px-1">
            <a href="#" className="text-primary text-sm font-semibold hover:underline decoration-2 underline-offset-4">Forgot Password?</a>
          </div>

          {/* Sign In Button */}
          <div className="pt-4">
            <button type="submit" className="w-full h-14 bg-primary text-white font-bold rounded-xl text-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              Sign In
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="px-8 py-6 flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-800"></div>
          <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">or</span>
          <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-800"></div>
        </div>

        {/* Social/Secondary options */}
        <div className="px-8 space-y-3">
          <button type="button" onClick={() => router.push('/dashboard')} className="w-full h-12 flex items-center justify-center gap-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"></path>
            </svg>
            <span className="text-slate-700 dark:text-slate-200 font-medium">Continue with Google</span>
          </button>
        </div>

        {/* Footer / Create Account */}
        <div className="px-8 pt-8 pb-10 text-center">
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
            New to PatientPal? 
            <Link href="/signup" className="text-primary font-bold hover:underline decoration-2 underline-offset-4 ml-1">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
