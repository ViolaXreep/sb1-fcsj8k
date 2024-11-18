import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  return (
    <div className="relative w-full max-w-2xl">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-zinc-500" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-zinc-800 rounded-lg bg-zinc-900/50 backdrop-blur-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-all"
        placeholder="Search by name, BPM, or mood..."
        onChange={(e) => onSearch(e.target.value)}
      />
      <button className="absolute inset-y-0 right-0 pr-3 flex items-center">
        <SlidersHorizontal className="h-5 w-5 text-zinc-500 hover:text-zinc-400" />
      </button>
    </div>
  );
}