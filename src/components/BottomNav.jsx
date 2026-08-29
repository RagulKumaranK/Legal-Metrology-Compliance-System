import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Scan, History, User } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  // Do not render bottom navigation on auth screens
  if (['/login', '/register'].includes(currentPath)) {
    return null;
  }

  const navItems = [
    { label: 'Home', path: '/dashboard', icon: Home },
    { label: 'Scan', path: '/scan', icon: Scan, isPrimary: true },
    { label: 'History', path: '/history', icon: History },
    { label: 'Profile', path: '/profile', icon: User }
  ];

  return (
    <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 flex justify-around items-center z-40 shadow-lg shrink-0">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.path;

        if (item.isPrimary) {
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center -mt-4 group"
            >
              <div className={`p-3 rounded-full shadow-lg transition-transform active:scale-95 ${isActive ? 'bg-blue-900 text-white ring-4 ring-blue-100' : 'bg-blue-800 text-white hover:bg-blue-900'}`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className={`text-[11px] font-semibold mt-1 ${isActive ? 'text-blue-900' : 'text-slate-500'}`}>
                {item.label}
              </span>
            </button>
          );
        }

        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors ${isActive ? 'text-blue-900 font-bold' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            <span className={`text-[11px] mt-1 ${isActive ? 'font-bold' : 'font-normal'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
