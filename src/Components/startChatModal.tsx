// components/StartChatModal.js
"use client";

import {useUsername} from '../hooks/use-username';
import { X } from 'lucide-react'; 
import { useMutation } from '@tanstack/react-query';
import { client } from '@/lib/clients';
import { useRouter } from 'next/navigation';



export default function StartChatModal({ isOpen, onClose }) {
  // --- 1. ALWAYS CALL HOOKS AT THE TOP ---

  const {username} = useUsername({isOpen});
 
  const router = useRouter();

  // Added isOpen dependency so it checks when it opens

 const {mutate : createRoom} = useMutation({
  mutationFn: async ()=>{
    const res = await client.room.create.post()
    if(res.status == 200){
    router.push(`/room/${res.data?.roomId}`)
    }
  },
 })

  // --- 2. CONDITIONAL RETURN AFTER HOOKS ---
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose} 
      ></div>

      <div className="relative w-full max-w-md bg-black border border-zinc-800 shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-zinc-600 hover:text-zinc-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-8">
          <div className='text-center space-y-2'>
            <h1 className='tracking-tight text-green-500 text-2xl font-bold font-mono'>
              {">"} private_chat
            </h1>
            <p className='text-zinc-500 text-sm'>A private, self-destructing chat room</p>
          </div>

          <div className='border border-zinc-800 bg-zinc-900/30 p-6'>
            <div className='space-y-5'>
              <div className='space-y-2'>
                <label className='flex items-center text-xs uppercase tracking-wider text-zinc-500 font-semibold'>
                  Your Identity
                </label>
                <div className='flex items-center gap-3'>
                  <div className='flex-1 bg-zinc-950 border border-zinc-800 p-3 text-sm text-zinc-300 font-mono'>
                    {username}
                  </div>
                </div>
              </div>

              <button 
                onClick={()=>createRoom()}
                className='w-full bg-zinc-100 text-black p-3 text-sm font-bold uppercase tracking-wide hover:bg-zinc-300 transition-colors mt-2 cursor-pointer disabled:opacity-50'
              >
                Create Secure Chat Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}