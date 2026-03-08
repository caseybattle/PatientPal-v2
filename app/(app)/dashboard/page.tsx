'use client';

import { useState, useEffect } from 'react';
import { Bell, Heart, Zap, Sparkles, CalendarDays, Pill, FolderOpen, MapPin, Activity, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useNotifications } from '@/components/NotificationProvider';

export default function DashboardPage() {
  const [googleFitToken, setGoogleFitToken] = useState<string | null>(null);
  const [healthData, setHealthData] = useState({
    steps: 0,
    heartRate: 0,
  });
  const [isLoadingData, setIsLoadingData] = useState(false);
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Trigger a demo appointment notification
    const timer = setTimeout(() => {
      addNotification({
        type: 'appointment',
        title: 'Upcoming Appointment',
        message: 'Dr. Aris Thorne - Cardiology Consultation in 24 hours.',
        time: 'Just now',
        actionLabel: 'View Details',
        onAction: () => console.log('Viewing appointment details'),
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [addNotification]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost')) {
        return;
      }
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS' && event.data.token) {
        setGoogleFitToken(event.data.token);
        fetchHealthData(event.data.token);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleConnect = async () => {
    try {
      const response = await fetch('/api/auth/google-fit/url');
      if (!response.ok) throw new Error('Failed to get auth URL');
      const { url } = await response.json();
      
      const authWindow = window.open(url, 'oauth_popup', 'width=600,height=700');
      if (!authWindow) {
        alert('Please allow popups for this site to connect your account.');
      }
    } catch (error) {
      console.error('OAuth error:', error);
    }
  };

  const fetchHealthData = async (token: string) => {
    setIsLoadingData(true);
    try {
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      const endOfDay = now.getTime();

      const response = await fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          aggregateBy: [
            {
              dataTypeName: "com.google.step_count.delta",
              dataSourceId: "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
            },
            {
              dataTypeName: "com.google.heart_rate.bpm",
              dataSourceId: "derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm"
            }
          ],
          bucketByTime: { durationMillis: 86400000 },
          startTimeMillis: startOfDay,
          endTimeMillis: endOfDay
        })
      });

      const data = await response.json();
      
      let steps = 0;
      let heartRate = 0;

      if (data.bucket && data.bucket.length > 0) {
        const bucket = data.bucket[0];
        
        // Parse steps
        const stepDataset = bucket.dataset.find((d: any) => d.dataSourceId.includes('step_count'));
        if (stepDataset && stepDataset.point && stepDataset.point.length > 0) {
          steps = stepDataset.point[0].value[0].intVal;
        }

        // Parse heart rate (average)
        const hrDataset = bucket.dataset.find((d: any) => d.dataSourceId.includes('heart_rate'));
        if (hrDataset && hrDataset.point && hrDataset.point.length > 0) {
          heartRate = Math.round(hrDataset.point[0].value[0].fpVal);
        }
      }

      setHealthData({ steps, heartRate });
    } catch (error) {
      console.error('Error fetching health data:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  return (
    <main className="flex-1 p-6 font-display">
      {/* Header Section */}
      <header className="pb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 relative">
            <Image 
              src="https://picsum.photos/seed/portrait/100/100" 
              alt="User Profile" 
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                if(window.confirm('Are you sure you want to call Emergency Services (911)?')) {
                  window.location.href = 'tel:911';
                }
              }}
              className="px-3 py-1.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-bold text-xs flex items-center gap-1.5 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
            >
              <AlertTriangle className="w-4 h-4" />
              SOS
            </button>
            <button className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Good morning, Casey</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Here&apos;s your health summary for today.</p>
        </div>
      </header>

      {/* Health Overview Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Health Overview</h2>
          {!googleFitToken && (
            <button 
              onClick={handleConnect}
              className="flex items-center gap-1.5 text-xs font-semibold bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
            >
              <Activity className="w-3.5 h-3.5" />
              Connect Google Fit
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Heart Rate Chart Card */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Heart Rate</span>
              <Heart className="text-red-500 w-4 h-4" fill="currentColor" />
            </div>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {isLoadingData ? '...' : (googleFitToken && healthData.heartRate > 0 ? healthData.heartRate : '72')}
              </span>
              <span className="text-[10px] text-slate-400">bpm</span>
            </div>
            {/* Simple SVG Line Chart */}
            <div className="h-12 w-full">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                <path d="M0 35 Q 10 35, 20 20 T 40 25 T 60 10 T 80 20 T 100 15" fill="none" stroke="#1855a1" strokeLinecap="round" strokeWidth="2.5"></path>
              </svg>
            </div>
          </div>

          {/* Daily Activity Card */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Activity</span>
              <Zap className="text-primary w-4 h-4" fill="currentColor" />
            </div>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {isLoadingData ? '...' : (googleFitToken && healthData.steps > 0 ? (healthData.steps / 1000).toFixed(1) + 'k' : '8.4k')}
              </span>
              <span className="text-[10px] text-slate-400">steps</span>
            </div>
            {/* Simple SVG Bar Chart */}
            <div className="h-12 w-full flex items-end justify-between gap-1">
              <div className="w-full bg-primary/20 rounded-t-sm h-[40%]"></div>
              <div className="w-full bg-primary/20 rounded-t-sm h-[60%]"></div>
              <div className="w-full bg-primary/20 rounded-t-sm h-[30%]"></div>
              <div className="w-full bg-primary/20 rounded-t-sm h-[80%]"></div>
              <div className="w-full bg-primary/20 rounded-t-sm h-[50%]"></div>
              <div className="w-full bg-primary rounded-t-sm h-[90%]"></div>
              <div className="w-full bg-primary/20 rounded-t-sm h-[40%]"></div>
            </div>
          </div>
        </div>
      </section>

      <h2 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-200">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* AI Explain Card */}
        <Link href="/explain" className="bg-primary/5 dark:bg-primary/10 p-4 rounded-xl border border-primary/10 flex flex-col gap-2 transition-all hover:shadow-md cursor-pointer">
          <div className="bg-primary text-white w-8 h-8 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">AI Explain</h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">Analyze medical reports</p>
          </div>
        </Link>

        {/* Visit Prep Card */}
        <Link href="/prep" className="bg-primary/5 dark:bg-primary/10 p-4 rounded-xl border border-primary/10 flex flex-col gap-2 transition-all hover:shadow-md cursor-pointer">
          <div className="bg-primary text-white w-8 h-8 rounded-lg flex items-center justify-center">
            <CalendarDays className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Visit Prep</h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">Get ready for doctors</p>
          </div>
        </Link>

        {/* Medications Card */}
        <Link href="/medications" className="bg-primary/5 dark:bg-primary/10 p-4 rounded-xl border border-primary/10 flex flex-col gap-2 transition-all hover:shadow-md cursor-pointer">
          <div className="bg-primary text-white w-8 h-8 rounded-lg flex items-center justify-center">
            <Pill className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Medications</h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">Track daily dosage</p>
          </div>
        </Link>

        {/* Records Card */}
        <Link href="/reports" className="bg-primary/5 dark:bg-primary/10 p-4 rounded-xl border border-primary/10 flex flex-col gap-2 transition-all hover:shadow-md cursor-pointer">
          <div className="bg-primary text-white w-8 h-8 rounded-lg flex items-center justify-center">
            <FolderOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Records</h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">View health history</p>
          </div>
        </Link>
      </div>

      {/* Upcoming Appointment Widget */}
      <section className="mt-8">
        <h2 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-200">Next Appointment</h2>
        <div className="bg-slate-900 dark:bg-primary text-white p-5 rounded-xl shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-200 text-sm font-medium">Tomorrow, 10:30 AM</p>
                <h3 className="text-xl font-bold mt-1">Dr. Aris Thorne</h3>
                <p className="text-blue-100/80 text-sm">General Cardiology Consultation</p>
              </div>
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                <CalendarDays className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="text-xs opacity-90">Central Health Tower, Suite 402</span>
            </div>
          </div>
          {/* Decorative background element */}
          <div className="absolute -right-4 -bottom-4 bg-white/10 w-24 h-24 rounded-full blur-2xl"></div>
        </div>
      </section>
    </main>
  );
}
