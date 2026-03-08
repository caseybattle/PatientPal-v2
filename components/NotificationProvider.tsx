'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pill, CalendarDays, AlertTriangle, X, Clock } from 'lucide-react';

export type NotificationType = 'medication' | 'appointment' | 'alert';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  actionLabel?: string;
  onAction?: () => void;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  dismissNotification: (id: string) => void;
  snoozeNotification: (id: string, minutes?: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = typeof crypto !== 'undefined' && crypto.randomUUID 
      ? crypto.randomUUID() 
      : Date.now().toString(36);
    setNotifications((prev) => [{ ...notification, id }, ...prev]);
  }, []);

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const snoozeNotification = (id: string, minutes: number = 15) => {
    const notification = notifications.find((n) => n.id === id);
    if (!notification) return;
    
    // Remove it from the current list
    dismissNotification(id);
    
    // Re-add it after the snooze duration (simulated with setTimeout)
    setTimeout(() => {
      addNotification({
        ...notification,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        message: `Snoozed: ${notification.message}`,
      });
    }, minutes * 60 * 1000); // In a real app, this would be handled by a background service
    
    // For demo purposes, if they snooze, we'll just show a quick toast or log it
    console.log(`Snoozed notification ${id} for ${minutes} minutes`);
  };

  // Demo: Add a notification after 3 seconds of mounting
  useEffect(() => {
    const timer = setTimeout(() => {
      addNotification({
        type: 'medication',
        title: 'Time for Lisinopril',
        message: 'Take 10mg (1 tablet) with water.',
        time: 'Just now',
        actionLabel: 'Mark as Taken',
        onAction: () => console.log('Medication taken'),
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [addNotification]);

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'medication':
        return <Pill className="w-5 h-5 text-blue-500" />;
      case 'appointment':
        return <CalendarDays className="w-5 h-5 text-purple-500" />;
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, dismissNotification, snoozeNotification }}>
      {children}
      
      {/* Notification Overlay */}
      <div className="fixed top-0 left-0 right-0 z-[100] p-4 pointer-events-none flex flex-col items-center gap-3 max-w-md mx-auto w-full pt-safe">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className="w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 pointer-events-auto overflow-hidden relative"
            >
              {/* Colored accent line */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                notification.type === 'medication' ? 'bg-blue-500' :
                notification.type === 'appointment' ? 'bg-purple-500' : 'bg-red-500'
              }`} />
              
              <div className="flex items-start gap-3 pl-2">
                <div className={`p-2 rounded-full shrink-0 ${
                  notification.type === 'medication' ? 'bg-blue-50 dark:bg-blue-900/20' :
                  notification.type === 'appointment' ? 'bg-purple-50 dark:bg-purple-900/20' : 'bg-red-50 dark:bg-red-900/20'
                }`}>
                  {getIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">
                      {notification.title}
                    </h4>
                    <span className="text-[10px] font-medium text-slate-500 shrink-0 mt-0.5">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 leading-snug">
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-3">
                    {notification.actionLabel && (
                      <button 
                        onClick={() => {
                          notification.onAction?.();
                          dismissNotification(notification.id);
                        }}
                        className="flex-1 bg-primary text-white text-xs font-bold py-2 px-3 rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        {notification.actionLabel}
                      </button>
                    )}
                    <button 
                      onClick={() => snoozeNotification(notification.id, 15)}
                      className="flex items-center justify-center gap-1 flex-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold py-2 px-3 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      Snooze
                    </button>
                  </div>
                </div>
                
                <button 
                  onClick={() => dismissNotification(notification.id)}
                  className="p-1 -mr-1 -mt-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
}
