"use client";

import React, { Suspense } from 'react';
import { Shield, Timer, Ghost, Lock, Zap, ChevronRight, Menu, X } from 'lucide-react';
import {  ShieldCheck, FileWarning, Users, AlertTriangle } from 'lucide-react';
import { FaGithub } from "react-icons/fa"
import StartChatModal from '../Components/startChatModal';
import { useSearchParams } from 'next/navigation';
import { useRouter, usePathname } from 'next/navigation';
import { BackgroundBeams } from '../Components/ui/background-beams';
import Image from 'next/image';


const Page = () => {
  return <Suspense>
    <Home />
  </Suspense>
}

export default Page;

function Home() {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
 
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDismissed, setIsDismissed] = React.useState(false);

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



  
  const wasDestroyed = searchParams.get('destroyed') === 'true';
  const error = searchParams.get('error');

  React.useEffect(() => {
    setIsDismissed(false);
  }, [searchParams]);

  React.useEffect(() => {
    if (wasDestroyed || error) {
        setIsDismissed(false);
    }
  }, [searchParams, wasDestroyed, error]);

  const handleDismiss = () => {
    setIsDismissed(true); // Hide immediately
    router.replace(pathname); // Remove ?destroyed=true from URL
  };

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

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition">
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
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 w-full py-3 rounded-lg font-semibold mt-2">Get Started</button>
          </div>
        )}
      </nav>

      <div className="fixed top-24 left-0 w-full px-4 z-40 flex justify-center pointer-events-none">
        
        {!isDismissed && (
          <>
            {/* 1. SUCCESS: Room Destroyed */}
            {wasDestroyed && (
              <div className="pointer-events-auto max-w-lg w-full bg-[#09090b]/80 backdrop-blur-md border border-green-500/30 rounded-lg shadow-[0_0_30px_-10px_rgba(34,197,94,0.3)] animate-in slide-in-from-top-4 fade-in duration-300">
                <div className="flex items-start p-4 gap-4">
                  <div className="p-2 bg-green-500/10 rounded-md border border-green-500/20">
                    <ShieldCheck className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-sm font-bold text-green-400 font-mono tracking-wide uppercase flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      System Purged
                    </h3>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      Protocol complete. Room data has been incinerated and logs wiped.
                    </p>
                  </div>
                  <button onClick={handleDismiss} className="text-zinc-500 hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {/* Visual Progress Bar to imply action completed */}
                <div className="h-0.5 w-full bg-green-900/50">
                   <div className="h-full w-full bg-green-500/50 origin-left animate-[grow_1s_ease-out]"></div>
                </div>
              </div>
            )}

            {/* 2. ERROR: Room Not Found */}
            {error === 'room-not-found' && (
              <div className="pointer-events-auto max-w-lg w-full bg-[#09090b]/80 backdrop-blur-md border border-red-500/30 rounded-lg shadow-[0_0_30px_-10px_rgba(239,68,68,0.3)] animate-in slide-in-from-top-4 fade-in duration-300">
                <div className="flex items-start p-4 gap-4">
                  <div className="p-2 bg-red-500/10 rounded-md border border-red-500/20">
                    <FileWarning className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-sm font-bold text-red-400 font-mono tracking-wide uppercase flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                      Connection Failed
                    </h3>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      Target coordinates invalid. The room ID does not exist or has already expired.
                    </p>
                  </div>
                  <button onClick={handleDismiss} className="text-zinc-500 hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* 3. ERROR: Room Full */}
            {error === "room-full" && (
              <div className="pointer-events-auto max-w-lg w-full bg-[#09090b]/80 backdrop-blur-md border border-amber-500/30 rounded-lg shadow-[0_0_30px_-10px_rgba(245,158,11,0.3)] animate-in slide-in-from-top-4 fade-in duration-300">
                <div className="flex items-start p-4 gap-4">
                  <div className="p-2 bg-amber-500/10 rounded-md border border-amber-500/20">
                    <Users className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-sm font-bold text-amber-400 font-mono tracking-wide uppercase flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                      Capacity Reached
                    </h3>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      Bandwidth limit exceeded. This secure channel is currently full.
                    </p>
                  </div>
                  <button onClick={handleDismiss} className="text-zinc-500 hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
            
            {/* 4. GENERIC ERROR */}
             {error && error !== 'room-not-found' && error !== 'room-full' && (
              <div className="pointer-events-auto max-w-lg w-full bg-[#09090b]/80 backdrop-blur-md border border-zinc-500/30 rounded-lg shadow-lg animate-in slide-in-from-top-4 fade-in duration-300">
                <div className="flex items-start p-4 gap-4">
                  <div className="p-2 bg-zinc-500/10 rounded-md border border-zinc-500/20">
                    <AlertTriangle className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-sm font-bold text-zinc-400 font-mono tracking-wide uppercase">
                      System Error
                    </h3>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {error}
                    </p>
                  </div>
                  <button onClick={handleDismiss} className="text-zinc-500 hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>


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

      {/* --- Features Grid (Modernized) --- */}
      <section id="features" className="py-24 px-6 relative overflow-hidden">
        {/* Subtle background glow for the section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Why go <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Ghost?</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              We built the foundation of security so you can build the conversation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="group p-8 rounded-3xl bg-zinc-900/40 border border-white/5 hover:border-blue-500/50 hover:bg-zinc-900/80 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-blue-500/20">
                <Timer className="w-7 h-7 text-blue-400 group-hover:text-blue-300" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-zinc-100">Ephemeral by Design</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                Set a kill-switch for your words. Messages vanish automatically from 5 seconds to 1 hour after reading.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-3xl bg-zinc-900/40 border border-white/5 hover:border-purple-500/50 hover:bg-zinc-900/80 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-purple-500/20">
                <Lock className="w-7 h-7 text-purple-400 group-hover:text-purple-300" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-zinc-100">Zero Knowledge</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                We don't know who you are. No emails, no phone numbers, no logs. Just a generated anonymous ID.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-3xl bg-zinc-900/40 border border-white/5 hover:border-green-500/50 hover:bg-zinc-900/80 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-green-500/20">
                <Shield className="w-7 h-7 text-green-400 group-hover:text-green-300" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-zinc-100">Military-Grade</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                AES-256 encryption protects every byte. Even if our servers are compromised, your data remains secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer (Modernized) --- */}
      {/* --- Footer (Orshot Style) --- */}
      <footer className="pt-10 bg-[#050505] border-t border-white/5 relative overflow-hidden flex flex-col justify-between">

        {/* 1. Main Content (Z-index 20 keeps it clickable) */}
        <div className="max-w-7xl mx-auto w-full px-6 flex flex-col md:flex-row justify-between items-center gap-6 relative z-20">

          {/* Brand */}
          <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
            <div className="p-2 bg-white/5 rounded-lg border border-white/5">
              <Ghost className="w-5 h-5 text-zinc-400" />
            </div>
            <span className="font-bold text-zinc-300 tracking-tight">GhostChat</span>
          </div>

          {/* Central Badge */}
          <div className="order-3 md:order-2">
            <a
              href="https://github.com/O-Aditya"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-4 py-2 bg-zinc-900/50 hover:bg-zinc-900 border border-white/5 hover:border-white/10 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              <span className="text-zinc-500 text-xs font-medium group-hover:text-zinc-400 transition-colors">
                Built by
              </span>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Image
                    src="https://github.com/O-Aditya.png"
                    alt="Aditya"
                    width={24}
                    height={24}
                    className="rounded-full border border-zinc-700 group-hover:border-blue-500/50 transition-colors"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-[#050505] rounded-full"></div>
                </div>
                <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors">
                  Aditya
                </span>
              </div>
            </a>
          </div>

          {/* Links */}
          <div className="order-2 md:order-3 flex gap-6 text-sm">
            <a
              href="https://github.com/O-Aditya/GhostChat.git"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group"
            >
              <span>Source</span>
              <FaGithub className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </a>
          </div>
        </div>

        {/* 2. Copyright */}
        <div className="mt-8 text-center relative z-20 pb-8">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} GhostChat Inc.  •  All rights reserved.
          </p>
        </div>

        {/* 3. THE WATERMARK */}
        <section className="relative px-4 max-w-[1080px] text-center flex items-center justify-center gap-2 mx-auto pb-2 text-[9rem] sm:text-[14rem] md:text-[19rem] lg:text-[20rem] leading-[1] pointer-events-none font-bold -mb-[11%] sm:-mb-[7%] duration-200 ease-in-out">

          {/* 1. TEXT: 
      - We set color to matches background (#050505) 
      - We use textShadow to add a faint white "light" above the text, creating the depth.
  */}
          <div
            className="animate-[pulse_8s_infinite]"
            style={{
              color: '#050505', // Blend with bg
              textShadow: '0px -1px 0px rgba(255,255,255,0.15), 0px 8px 5px rgba(0,0,0,0.5)'
            }}
          >
            0trace
          </div>

          {/* 2. GRADIENT MASK: Fades the bottom of the text into the floor */}
          <div className="bg-gradient-to-b from-transparent via-[#050505] to-[#050505] h-[40%] w-full absolute bottom-0 left-0 z-20"></div>

        </section>

      </footer>

      {/* --- RENDER THE MODAL COMPONENT --- */}
      <StartChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}