import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Scan, History, User } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  if (['/login', '/register'].includes(currentPath)) {
    return null;
  }

  const navItems = [
    { label: 'Home', path: '/dashboard', icon: Home },
    { label: 'Scan', path: '/scan', icon: Scan },
    { label: 'History', path: '/history', icon: History },
    { label: 'Profile', path: '/profile', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200/90 h-16 flex items-center justify-around z-40 select-none px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.path;

        if (isActive) {
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="bg-blue-600 text-white rounded-2xl px-4 py-2 flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 border border-blue-500"
            >
              <Icon className="w-4 h-4 stroke-[2.5]" />
              <span className="text-xs font-extrabold tracking-wide font-sans">
                {item.label}
              </span>
            </button>
          );
        }

        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center justify-center text-slate-400 hover:text-slate-900 transition-all active:scale-95 py-1 px-3"
          >
            <Icon className="w-5 h-5 stroke-[2] mb-0.5" />
            <span className="text-[10px] font-bold tracking-tight font-sans">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
