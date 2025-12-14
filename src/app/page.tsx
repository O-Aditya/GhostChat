"use client";

import React, { Suspense } from 'react';
import { Shield, Timer, Ghost, Lock, Zap, ChevronRight, Menu, X } from 'lucide-react';
import { FaGithub } from "react-icons/fa"
import StartChatModal from '../Components/startChatModal';
import { useSearchParams } from 'next/navigation';
import {BackgroundBeams} from '../Components/ui/background-beams';
import Image from 'next/image';


const Page = () =>{
return <Suspense>
    <Home />
</Suspense>
}

export default Page;

 function Home() {


const [isVisible, setIsVisible] = React.useState(true);
const [lastScrollY, setLastScrollY] = React.useState(0);

React.useEffect(() => {
  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      
      if (window.scrollY > lastScrollY && window.scrollY > 100) { 
        setIsVisible(false); 
      } else {
        setIsVisible(true);  
      }

      
      setLastScrollY(window.scrollY); 
    }
  };

  window.addEventListener('scroll', controlNavbar);

 
  return () => {
    window.removeEventListener('scroll', controlNavbar);
  };
}, [lastScrollY]);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const searchParams = useSearchParams();
  const wasDestroyed = searchParams.get('destroyed') === 'true';
  const error = searchParams.get('error');

  return (
     
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500 selection:text-white font-sans">
      <BackgroundBeams /> 
      {/* --- Navigation --- */}
      <nav 
        className={`fixed w-full z-50 top-0 transition-transform duration-300 ease-in-out
          ${isVisible ? 'translate-y-0' : '-translate-y-full'} `}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <Ghost className="w-8 h-8 text-blue-500" />
            <span className="font-bold text-xl tracking-tight">GhostChat</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center  gap-8">
            <a href="#features" className="text-sm text-gray-400 hover:text-white transition ">Features</a>
            <a href="#security" className="text-sm text-gray-400 hover:text-white transition">Security</a>
            
            <button className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute w-full bg-[#050505] border-b border-white/10 p-6 flex flex-col gap-4">
            <a href="#" className="text-gray-400 hover:text-white">Features</a>
            <a href="#" className="text-gray-400 hover:text-white">Security</a>
            <button className="bg-blue-600 w-full py-3 rounded-lg font-semibold mt-2">Get Started</button>
          </div>
        )}
      </nav>

      {wasDestroyed && (
        <div className="mt-24 max-w-3xl mx-auto bg-red-600/20 border border-red-500 text-red-300 px-6 py-4 rounded-lg text-center">
          <strong className="font-semibold">Room Destroyed:</strong> The chat room has been successfully destroyed and all messages have been deleted.
        </div>
      )}

      {error === 'room-not-found' && (
        <div className="mt-24 max-w-3xl mx-auto bg-red-600/20 border border-red-500 text-red-300 px-6 py-4 rounded-lg text-center">
          <strong className="font-semibold">Error:</strong> The requested chat room does not exist.
        </div>
      )}

      {error === "room-full" && (
        <div className="mt-24 max-w-3xl mx-auto bg-red-600/20 border border-red-500 text-red-300 px-6 py-4 rounded-lg text-center">
          <strong className="font-semibold">Error:</strong> The chat room is full. Please try joining another room.
        </div>
      )}


      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] -z-10 opacity-30"></div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-green-400 text-xs font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            v1.0 is now live
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Speak Freely.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-600">
              Leave No Trace.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400  mb-10 max-w-3xl mx-auto leading-relaxed">
            The private messaging app where your words disappear the moment they’re read. End-to-end encrypted, anonymous, and untraceable.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button 
            onClick={() => setIsModalOpen(true)}
            className=" cursor-pointer w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-lg transition shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group">
              Start Chatting
              < ChevronRight className="w-5 h-5 text-yellow-500 group-hover:translate-x-1 transition-transform" />
            </button>
           
          </div>
          
        </div>

        

        
        {/* Hero Visual / Abstract Mockup */}
        <div className="mt-20 max-w-5xl mx-auto relative group">
          {/* Glowing Aura Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-green-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          
          <div className="relative bg-[#09090b] border border-white/10 rounded-xl aspect-[16/9] md:aspect-[2/1] overflow-hidden flex flex-col shadow-2xl">
            
            {/* 1. Window Header */}
            <div className="h-10 border-b border-white/10 bg-[#111] flex items-center px-4 justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-black/50 rounded border border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] text-gray-400 font-mono tracking-wide">AES-256 :: CONNECTED</span>
              </div>
              <div className="w-12"></div> {/* Spacer for alignment */}
            </div>

            {/* 2. App Layout */}
            <div className="flex flex-1 overflow-hidden">
              
              {/* Sidebar (Hidden on mobile to save space) */}
              <div className="hidden md:flex w-48 border-r border-white/5 bg-[#0c0c0c] flex-col p-3 gap-2">
                <div className="h-8 w-full bg-white/5 rounded mb-4 animate-pulse"></div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded hover:bg-white/5 transition opacity-60">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-900 to-gray-800"></div>
                    <div className="flex-1 space-y-1">
                      <div className="h-2 w-16 bg-gray-700 rounded"></div>
                      <div className="h-1.5 w-10 bg-gray-800 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col relative bg-[#050505]">
                
                {/* Messages */}
                <div className="flex-1 p-6 space-y-6 flex flex-col justify-end">
                  
                  {/* Incoming Message */}
                  <div className="flex gap-4 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-purple-900/30 border border-purple-500/30 flex-shrink-0 flex items-center justify-center text-[10px] text-purple-400 font-mono">ID</div>
                    <div className="space-y-1">
                      <div className="p-3 bg-[#151515] border border-white/10 rounded-2xl rounded-tl-none text-sm text-gray-300 shadow-sm">
                        <p>Package received. The key is in the usual place.</p>
                      </div>
                      <span className="text-[10px] text-gray-600 font-mono ml-1">10:42 PM • Encrypted</span>
                    </div>
                  </div>

                  {/* Outgoing Message */}
                  <div className="flex gap-4 max-w-[80%] self-end flex-row-reverse">
                     <div className="w-8 h-8 rounded-full bg-blue-900/30 border border-blue-500/30 flex-shrink-0 flex items-center justify-center text-[10px] text-blue-400 font-mono">ME</div>
                    <div className="space-y-1 text-right">
                      <div className="p-3 bg-blue-600/10 border border-blue-500/20 rounded-2xl rounded-tr-none text-sm text-blue-100 shadow-sm relative overflow-hidden">
                        <p>Understood. Initiating protocol 9.</p>
                        {/* Scanline effect */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-blue-400/30 animate-[scan_2s_linear_infinite]"></div>
                      </div>
                      <span className="text-[10px] text-gray-600 font-mono mr-1">10:43 PM • Self-destruct: 5s</span>
                    </div>
                  </div>

                  {/* Fake Typing Indicator */}
                  <div className="flex gap-2 items-center text-gray-500 text-xs font-mono animate-pulse">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full animation-delay-200"></span>
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full animation-delay-400"></span>
                    <span className="ml-2 text-gray-600">User is typing...</span>
                  </div>
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-white/5 bg-[#09090b]">
                   <div className="flex gap-3">
                      <div className="flex-1 h-10 bg-[#111] border border-white/10 rounded-lg flex items-center px-4 text-sm text-gray-500 font-mono">
                         Type a secure message...
                      </div>
                      <div className="w-10 h-10 bg-blue-600/20 border border-blue-500/30 rounded-lg flex items-center justify-center">
                         <Zap className="w-4 h-4 text-blue-400" />
                      </div>
                   </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Features Grid --- */}
      <section id="features" className="py-24 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why go Ghost?</h2>
            <p className="text-gray-400">Security isn't a feature. It's the foundation.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-8 rounded-2xl bg-[#111] border border-white/5 hover:border-blue-500/30 transition hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-blue-900/20 rounded-lg flex items-center justify-center mb-6">
                <Timer className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Self-Destruct Timer</h3>
              <p className="text-gray-400 leading-relaxed">
                Set messages to vanish anywhere from 5 seconds to 1 hour after being read. Once they are gone, they are gone forever.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-2xl bg-[#111] border border-white/5 hover:border-purple-500/30 transition hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-purple-900/20 rounded-lg flex items-center justify-center mb-6">
                <Lock className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Zero Knowledge</h3>
              <p className="text-gray-400 leading-relaxed">
                We don't know who you are, who you talk to, or what you say. No phone numbers or emails required to sign up.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-2xl bg-[#111] border border-white/5 hover:border-green-500/30 transition hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-green-900/20 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Military-Grade Encryption</h3>
              <p className="text-gray-400 leading-relaxed">
                AES-256 encryption on every message. Even if our servers are compromised, your data remains unreadable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-12 border-t border-white/10 bg-[#050505] text-center md:text-left px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2">
            <Ghost className="w-6 h-6 text-gray-500" />
            <span className="font-bold text-gray-300">GhostChat</span>
          </div>
          
          {/* Credits Section */}
                 <p className="text-gray-600 text-sm flex items-center gap-1">
                               Made with <span className="text-red-900">♥</span> by 
  
                         <a href="https://github.com/O-Aditya" className="flex items-center gap-2 hover:text-white transition group">
                        
                          <Image 
                            src="https://github.com/O-Aditya.png" 
                            alt="Profile" 
                            width={20} 
                            height={20} 
                            className="w-5 h-5 rounded-full border border-gray-700 group-hover:border-white/50 transition"
                          />
                                      <span className="font-medium">Aditya</span>
                            </a>
                  </p>
                  
          {/* Source Code Link */}
          <div className="flex gap-6 text-sm text-gray-500">
            <a 
              href="https://github.com/O-Aditya/GhostChat.git" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition"
            >
              <FaGithub className="w-4 h-4" />
              <span>Source Code</span>
            </a>
          </div>
        </div>
      </footer>

      {/* --- RENDER THE MODAL COMPONENT --- */}
      <StartChatModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}