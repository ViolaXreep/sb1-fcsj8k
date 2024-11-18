import React from 'react';

export default function Navigation() {
  return (
    <nav className="flex gap-6">
      <a href="#beats" className="text-zinc-400 hover:text-zinc-100 transition-colors">Beats</a>
      <a href="#about" className="text-zinc-400 hover:text-zinc-100 transition-colors">About</a>
      <a href="#licensing" className="text-zinc-400 hover:text-zinc-100 transition-colors">Licensing</a>
    </nav>
  );
}