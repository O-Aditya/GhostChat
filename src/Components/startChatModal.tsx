// components/StartChatModal.tsx
"use client";

import { useUsername } from '../hooks/use-username';
import { X, Ghost, Loader2, ShieldCheck, Terminal } from 'lucide-react'; 
import { useMutation } from '@tanstack/react-query';
import { client } from '@/lib/clients';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface StartChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StartChatModal({ isOpen, onClose }: StartChatModalProps) {
  const router = useRouter();
  
  // 1. Hooks
  // We pass isOpen to ensure the username is fetched/refreshed when modal opens
  const { username } = useUsername({ isOpen });
  const isUserLoading = false; // Set a default value or handle loading state appropriately

  const { mutate: createRoom, isPending } = useMutation({
    mutationFn: async () => {
      const res = await client.room.create.post();
      if (res.status === 200) {
        router.push(`/room/${res.data?.roomId}`);
      }
    },
  });

  // 2. Prevent hydration mismatch & Handle Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with Blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose} 
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-[#09090b] border border-white/10 shadow-2xl rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 ring-1 ring-white/5">
        
        {/* --- Header Section --- */}
        <div className="px-6 pt-6 pb-4 flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-blue-500 mb-2">
              <div className="p-1.5 bg-blue-500/10 rounded-md border border-blue-500/20">
                <Ghost className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">Protocol: Ghost</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Initiate Secure Session
            </h2>
            <p className="text-zinc-500 text-sm">
              Generate a temporary, encrypted channel.
            </p>
          </div>

          <button 
            onClick={onClose} 
            className="text-zinc-500 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* --- Divider --- */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

        {/* --- Body Section --- */}
        <div className="p-6 space-y-6">
          
          {/* Identity Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-500 font-semibold">
              <Terminal className="w-3 h-3" />
              Your Alias
            </label>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="relative flex items-center gap-3 bg-black/50 border border-zinc-800 group-hover:border-zinc-700 p-4 rounded-xl transition-colors">
                {isUserLoading ? (
                  <div className="h-5 w-32 bg-zinc-800 animate-pulse rounded"></div>
                ) : (
                  <span className="font-mono text-zinc-200 text-lg tracking-tight">
                    {username}
                  </span>
                )}
                {/* Status Indicator */}
                <div className="ml-auto flex items-center gap-1.5 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-[10px] text-green-500 font-medium uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  Active
                </div>
              </div>
            </div>
            <p className="text-[11px] text-zinc-600 pl-1">
              This identity is ephemeral and will be wiped after the session.
            </p>
          </div>

          

          {/* Action Button */}
          <button 
            onClick={() => createRoom()}
            disabled={isPending || isUserLoading}
            className="w-full relative group overflow-hidden bg-white text-black p-4 rounded-xl font-bold text-sm hover:bg-zinc-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            
            <div className="flex items-center justify-center gap-2">
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Establishing Connection...</span>
                </>
              ) : (
                <>
                  <span>Create Channel</span>
                  <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                </>
              )}
            </div>
          </button>
        </div>
        
      </div>
    </div>
  );
}