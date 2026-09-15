import React from 'react';
import { Compass } from 'lucide-react';

interface HeaderProps {
  currentStage?: 'profile' | 'quiz' | 'result';
  onReset?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-md sticky top-0 z-40 shadow-xs">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
        {/* Brand Logo & Title */}
        <div 
          onClick={onReset}
          className="flex items-center gap-2.5 cursor-pointer group"
          id="header-brand"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 flex items-center justify-center shadow-xs group-hover:border-amber-400 transition-colors">
            <Compass className="w-4 h-4 text-amber-700 group-hover:rotate-45 transition-transform duration-500" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-wide text-slate-900 font-serif whitespace-nowrap">
              紫薇性格特质测试
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};
