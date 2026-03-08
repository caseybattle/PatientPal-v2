'use client';

import { useState, useRef } from 'react';
import { ArrowLeft, Search, Clock, ToggleRight, ToggleLeft, History, Plus, Camera, Volume2, Trash2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function MedicationsPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeMedId, setActiveMedId] = useState<number | null>(null);
  const [filter, setFilter] = useState<'All' | 'Active' | 'Inactive'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const [medications, setMedications] = useState([
    {
      id: 1,
      name: 'Lisinopril',
      dosage: '10mg • Once daily',
      time: '08:00 AM',
      nextTime: 'Next: 2h 15m',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80',
      colorClass: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
    },
    {
      id: 2,
      name: 'Metformin',
      dosage: '500mg • Twice daily',
      time: '09:00 AM, 09:00 PM',
      nextTime: 'Next: 6h 40m',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400&q=80',
      colorClass: 'bg-primary/10 text-primary'
    },
    {
      id: 3,
      name: 'Amoxicillin',
      dosage: '250mg • Completed course',
      time: 'Finished Oct 12',
      nextTime: '',
      status: 'Inactive',
      image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&q=80',
      colorClass: 'bg-slate-100 text-slate-500 dark:bg-slate-800'
    }
  ]);

  const handleImageClick = (id: number) => {
    setActiveMedId(id);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeMedId !== null) {
      const imageUrl = URL.createObjectURL(file);
      setMedications(prev => prev.map(med => 
        med.id === activeMedId ? { ...med, image: imageUrl } : med
      ));
    }
  };

  const handleReadAloud = (med: any) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = `${med.name}. Dosage: ${med.dosage.replace('•', '')}. Time to take: ${med.time}.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in your browser.");
    }
  };

  const toggleStatus = (id: number) => {
    setMedications(prev => prev.map(med => {
      if (med.id === id) {
        const newStatus = med.status === 'Active' ? 'Inactive' : 'Active';
        return {
          ...med,
          status: newStatus,
          nextTime: newStatus === 'Active' ? 'Next: 4h 00m' : '',
          time: newStatus === 'Active' ? '08:00 AM' : 'Stopped today',
          colorClass: newStatus === 'Active' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
        };
      }
      return med;
    }));
  };

  const deleteMedication = (id: number) => {
    if (window.confirm('Are you sure you want to delete this medication?')) {
      setMedications(prev => prev.filter(med => med.id !== id));
    }
  };

  const addMedication = () => {
    const name = window.prompt('Enter medication name:');
    if (!name) return;
    const dosage = window.prompt('Enter dosage (e.g., 10mg • Once daily):') || 'As needed';
    
    const newMed = {
      id: Date.now(),
      name,
      dosage,
      time: '08:00 AM',
      nextTime: 'Next: 4h 00m',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80',
      colorClass: 'bg-primary/10 text-primary'
    };
    setMedications([newMed, ...medications]);
  };

  const filteredMedications = medications.filter(med => {
    const matchesFilter = filter === 'All' || med.status === filter;
    const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          med.dosage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col font-display">
      <input 
        type="file" 
        accept="image/*" 
        capture="environment" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleFileChange} 
      />
      
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between p-4 max-w-lg mx-auto w-full">
          <div className="flex items-center gap-3">
            <div 
              onClick={() => router.back()}
              className="p-2 rounded-lg bg-primary/10 text-primary cursor-pointer hover:bg-primary/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </div>
            {!isSearching ? (
              <h1 className="text-xl font-bold tracking-tight">Medications</h1>
            ) : (
              <input 
                type="text" 
                autoFocus
                placeholder="Search medications..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-lg w-full p-0"
              />
            )}
          </div>
          <button 
            onClick={() => {
              setIsSearching(!isSearching);
              if (isSearching) setSearchQuery('');
            }}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isSearching ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>
        </div>
        <div className="max-w-lg mx-auto w-full px-4">
          <div className="flex gap-8 overflow-x-auto no-scrollbar">
            {['All', 'Active', 'Inactive'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setFilter(tab as any)}
                className={`flex flex-col items-center pt-4 pb-3 border-b-2 font-semibold text-sm transition-colors ${
                  filter === tab 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full p-4 space-y-4">
        {filteredMedications.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            No medications found.
          </div>
        ) : (
          filteredMedications.map((med) => (
            <div 
              key={med.id} 
              className={`bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 flex gap-4 transition-all ${med.status === 'Inactive' ? 'opacity-70 grayscale-[0.5]' : ''}`}
            >
              <div className="flex-1 space-y-3">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold">{med.name}</h3>
                    {med.nextTime && (
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${med.colorClass}`}>
                        {med.nextTime}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">{med.dosage}</p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    {med.status === 'Active' ? (
                      <Clock className="w-5 h-5 text-primary" />
                    ) : (
                      <History className="w-5 h-5 text-slate-400" />
                    )}
                    <span className={`text-xs font-medium ${med.status === 'Active' ? 'text-slate-600 dark:text-slate-300' : 'text-slate-500'}`}>
                      {med.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleReadAloud(med)}
                      className="p-1.5 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-100 transition-colors"
                      title="Read Aloud"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => toggleStatus(med.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${med.status === 'Active' ? 'bg-primary/10 text-primary active:scale-95 hover:bg-primary/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                    >
                      {med.status === 'Active' ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                      {med.status}
                    </button>
                    <button 
                      onClick={() => deleteMedication(med.id)}
                      className="p-1.5 rounded-full bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-100 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-2 shrink-0">
                <div 
                  className="w-24 h-24 rounded-lg relative overflow-hidden cursor-pointer group border-2 border-transparent hover:border-primary/50 transition-colors"
                  onClick={() => handleImageClick(med.id)}
                >
                  <Image 
                    src={med.image} 
                    alt={`Image of ${med.name}`} 
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Tap to update</span>
              </div>
            </div>
          ))
        )}
      </main>

      <button 
        onClick={addMedication}
        className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-40"
      >
        <Plus className="w-8 h-8" />
      </button>
    </div>
  );
}
