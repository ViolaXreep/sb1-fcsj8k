import React from 'react';
import { Instagram, Twitter, Youtube, Mail } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1513040260736-63dd0617fb66?w=1600&h=900&fit=crop")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'overlay'
          }}
        />
      </div>
      
      <div className="relative px-8 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-zinc-100 mb-6">About</h2>
          <p className="text-zinc-400 mb-8 leading-relaxed">
            Started making beats in 2020. Just a producer who loves creating 
            unique sounds. Every beat is crafted with care, ready for your next project.
          </p>
          
          <div className="flex justify-center gap-6 mb-8">
            <a href="#" className="group flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-zinc-800 rounded-full group-hover:bg-zinc-700 transition-all">
                <Instagram className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100" />
              </div>
              <span className="mt-2 text-sm text-zinc-500">@dijoncuts</span>
            </a>
            <a href="#" className="group flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-zinc-800 rounded-full group-hover:bg-zinc-700 transition-all">
                <Twitter className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100" />
              </div>
              <span className="mt-2 text-sm text-zinc-500">@dijoncuts</span>
            </a>
            <a href="#" className="group flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-zinc-800 rounded-full group-hover:bg-zinc-700 transition-all">
                <Youtube className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100" />
              </div>
              <span className="mt-2 text-sm text-zinc-500">DijonCutsOfficial</span>
            </a>
            <a href="#" className="group flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-zinc-800 rounded-full group-hover:bg-zinc-700 transition-all">
                <Mail className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100" />
              </div>
              <span className="mt-2 text-sm text-zinc-500">contact@dijoncuts.com</span>
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-4">
              <p className="text-2xl font-bold text-zinc-100">100+</p>
              <p className="text-sm text-zinc-500">Beats Made</p>
            </div>
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-4">
              <p className="text-2xl font-bold text-zinc-100">10k+</p>
              <p className="text-sm text-zinc-500">Monthly Plays</p>
            </div>
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-4">
              <p className="text-2xl font-bold text-zinc-100">3+</p>
              <p className="text-sm text-zinc-500">Years Making Beats</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}