'use client';

import { useState } from 'react';
import { ArrowLeft, Calendar, Moon, Footprints, Flame, Timer, FileText, Download, Trash2, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ReportsPage() {
  const router = useRouter();
  const [dateRange, setDateRange] = useState('weekly');
  const [reports, setReports] = useState([
    { id: 1, title: 'Annual Blood Work', date: 'Oct 12, 2023', size: '2.4 MB' },
    { id: 2, title: 'MRI Summary - Knee', date: 'Sep 28, 2023', size: '1.8 MB' },
    { id: 3, title: 'Cholesterol Panel', date: 'Aug 15, 2023', size: '1.1 MB' },
  ]);

  const deleteReport = (id: number) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      setReports(reports.filter(r => r.id !== id));
    }
  };

  const addReport = () => {
    const title = window.prompt('Enter report title:');
    if (!title) return;
    
    const newReport = {
      id: Date.now(),
      title,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      size: (Math.random() * 3 + 0.5).toFixed(1) + ' MB'
    };
    setReports([newReport, ...reports]);
  };

  // Mock data based on date range
  const mockData: Record<string, any> = {
    weekly: { bp: '120/80', sleep: '7h 20m', sleepBars: [16, 20, 14, 24, 18, 16, 12], steps: '8,432', cals: '450', active: '45 mins', goal: '85%' },
    monthly: { bp: '118/78', sleep: '7h 05m', sleepBars: [18, 19, 17, 20, 16, 15, 18], steps: '7,850', cals: '410', active: '40 mins', goal: '78%' },
    yearly: { bp: '122/82', sleep: '6h 50m', sleepBars: [15, 16, 15, 17, 14, 15, 16], steps: '8,100', cals: '430', active: '42 mins', goal: '82%' }
  };
  const data = mockData[dateRange] || mockData.weekly;

  return (
    <div className="flex-1 flex flex-col font-display">
      <header className="sticky top-0 z-10 flex items-center bg-white/80 dark:bg-background-dark/80 backdrop-blur-md p-4 justify-between border-b border-slate-200 dark:border-slate-800">
        <button onClick={() => router.back()} className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-6 h-6 text-slate-700 dark:text-slate-300" />
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">Health Reports</h1>
        <button 
          onClick={() => alert('Calendar view coming soon!')}
          className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Calendar className="w-6 h-6 text-slate-700 dark:text-slate-300" />
        </button>
      </header>

      {/* Date Range Selector */}
      <div className="px-4 py-4">
        <div className="flex h-11 items-center justify-center rounded-xl bg-slate-200/50 dark:bg-slate-800 p-1">
          {['weekly', 'monthly', 'yearly'].map((range) => (
            <label key={range} className="flex cursor-pointer h-full grow items-center justify-center rounded-lg px-2 has-[:checked]:bg-white has-[:checked]:text-primary has-[:checked]:shadow-sm text-slate-500 dark:text-slate-400 text-sm font-semibold transition-all capitalize">
              <span>{range}</span>
              <input 
                type="radio" 
                name="range" 
                value={range} 
                checked={dateRange === range}
                onChange={(e) => setDateRange(e.target.value)}
                className="hidden" 
              />
            </label>
          ))}
        </div>
      </div>

      {/* Section 1: Blood Pressure Trend */}
      <div className="px-4 py-2">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Blood Pressure Trend</p>
              <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{data.bp} <span className="text-sm font-normal text-slate-400">mmHg</span></h3>
            </div>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full uppercase">Normal</span>
          </div>
          
          <div className="relative h-32 w-full mt-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100">
              <path d={dateRange === 'weekly' ? "M0,40 Q50,20 100,45 T200,30 T300,50 T400,25" : "M0,35 Q50,25 100,40 T200,35 T300,45 T400,30"} fill="none" stroke="#1855a1" strokeLinecap="round" strokeWidth="3" className="transition-all duration-500"></path>
              <path d={dateRange === 'weekly' ? "M0,70 Q50,60 100,75 T200,65 T300,80 T400,60" : "M0,65 Q50,55 100,70 T200,60 T300,75 T400,65"} fill="none" stroke="#60a5fa" strokeLinecap="round" strokeWidth="3" className="transition-all duration-500"></path>
            </svg>
          </div>
          <div className="flex justify-between mt-2 px-1">
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
              <span key={day} className="text-[10px] font-bold text-slate-400">{day}</span>
            ))}
          </div>
          
          <div className="flex gap-4 mt-4 pt-4 border-t border-slate-50 dark:border-slate-800">
            <div className="flex items-center gap-1.5">
              <div className="size-2 rounded-full bg-primary"></div>
              <span className="text-xs text-slate-500">Systolic</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="size-2 rounded-full bg-blue-400"></div>
              <span className="text-xs text-slate-500">Diastolic</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Sleep Analysis */}
      <div className="px-4 py-2">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 transition-all">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Moon className="w-5 h-5 text-primary" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Sleep Analysis</h3>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Avg Sleep</p>
              <p className="text-lg font-bold text-primary">{data.sleep}</p>
            </div>
          </div>
          
          <div className="flex items-end justify-between h-24 gap-2 mb-2">
            {data.sleepBars.map((h: number, i: number) => (
              <div key={i} className="flex flex-col items-center flex-1 gap-2">
                <div className={`w-full bg-slate-100 dark:bg-slate-800 rounded-t-md relative overflow-hidden transition-all duration-500`} style={{ height: `${h * 4}px` }}>
                  <div className={`absolute bottom-0 w-full h-full ${i === 3 ? 'bg-primary' : 'bg-primary/40'}`}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between px-1">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <span key={i} className={`text-[10px] font-bold ${i === 3 ? 'text-primary' : 'text-slate-400'}`}>{d}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Section 3: Activity Breakdown */}
      <div className="px-4 py-2">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 transition-all">
          <h3 className="text-base font-bold mb-4 text-slate-900 dark:text-white">Activity Breakdown</h3>
          <div className="flex items-center gap-6">
            <div className="relative size-32 shrink-0">
              <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                <circle className="stroke-slate-100 dark:stroke-slate-800" cx="18" cy="18" fill="none" r="16" strokeWidth="3.5"></circle>
                <circle className="stroke-primary transition-all duration-1000" cx="18" cy="18" fill="none" r="16" strokeDasharray="100" strokeDashoffset={100 - parseInt(data.goal)} strokeLinecap="round" strokeWidth="3.5"></circle>
                <circle className="stroke-orange-400 transition-all duration-1000" cx="18" cy="18" fill="none" r="12" strokeDasharray="100" strokeDashoffset={100 - (parseInt(data.goal) - 10)} strokeLinecap="round" strokeWidth="3.5"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Goal</span>
                <span className="text-lg font-black text-slate-800 dark:text-white leading-none">{data.goal}</span>
              </div>
            </div>
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Footprints className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Steps</p>
                  <p className="text-sm font-bold">{data.steps} / 10k</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <Flame className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Calories</p>
                  <p className="text-sm font-bold">{data.cals} kcal</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <Timer className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Active</p>
                  <p className="text-sm font-bold">{data.active}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Recent Reports */}
      <div className="px-4 py-2 pb-24">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Reports</h3>
          <button 
            onClick={addReport}
            className="text-primary text-sm font-bold flex items-center gap-1 hover:underline"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
        <div className="space-y-3">
          {reports.length === 0 ? (
            <div className="text-center py-6 text-slate-500">No reports found.</div>
          ) : (
            reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{report.title}</p>
                    <p className="text-xs text-slate-500 font-medium">{report.date} • {report.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      const content = `MEDICAL REPORT\n\nTitle: ${report.title}\nDate: ${report.date}\nPatient: Casey\n\nThis is a generated summary of the medical report. In a real application, this would contain the full detailed lab results, imaging summaries, or physician notes.\n\nStatus: Normal/Reviewed\nGenerated by: PatientPal System`;
                      const blob = new Blob([content], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${report.title.replace(/\s+/g, '_')}_${report.date.replace(/,\s*/g, '_').replace(/\s+/g, '_')}.txt`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    }}
                    className="size-9 flex items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    title="Download Report"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => deleteReport(report.id)}
                    className="size-9 flex items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                    title="Delete Report"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
