import React from 'react';
import { Music2 } from 'lucide-react';
import Navigation from './Navigation';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <div className="flex items-center justify-between mb-12">
      <div className="flex items-center gap-2">
        <Music2 className="w-8 h-8 text-yellow-500" />
        <h1 className="text-2xl font-bold text-zinc-100 dark:text-zinc-100">DIJON'S CUTS</h1>
      </div>
      <div className="flex items-center gap-6">
        <Navigation />
        <ThemeToggle />
      </div>
    </div>
  );
}