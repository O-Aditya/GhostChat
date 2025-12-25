"use client"
import { client } from '@/lib/clients';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Trash2, Copy, Check, Clock, Send, Shield, AlertCircle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useUsername } from '@/hooks/use-username';
import { format } from 'date-fns';
import { useRealtime } from '@/lib/realtime-client';

function formatTimeRemaining(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

const Page = () => {
    const params = useParams();
    const roomId = params.roomId as string;
    const [copyStatus, setCopyStatus] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
    const router = useRouter();
    const { username } = useUsername({ isOpen: true });

    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // --- Queries ---
    const { data: ttlData } = useQuery({
        queryKey: ['ttl', roomId],
        queryFn: async () => {
            const res = await client.room.ttl.get({ query: { roomId } });
            return res.data;
        }
    });

    const { data: messages, refetch } = useQuery({
        queryKey: ["messages", roomId],
        queryFn: async () => {
            const res = await client.message.get({ query: { roomId } });
            return res.data;
        },
    });

    // --- Effects ---
    useEffect(() => {
        if (ttlData?.ttl !== undefined) {
            setTimeRemaining(ttlData.ttl);
        }
    }, [ttlData]);

    useEffect(() => {
        if (timeRemaining === null || timeRemaining <= 0) {
            if (timeRemaining === 0) router.push('/?destroyed=true');
            return;
        }
        const interval = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev === null || prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [timeRemaining, router]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages?.messages]);

    useRealtime({
        channels: [roomId],
        events: ['chat.message', 'chat.destroy'],
        onData: ({ event }) => {
            if (event === 'chat.message') refetch();
            if (event === 'chat.destroy') router.push('/?destroyed=true');
        }
    });

    // --- Mutations ---
    const { mutate: sendMessage, isPending } = useMutation({
        mutationFn: async ({ text }: { text: string }) => {
            if (!text.trim()) return;
            await client.message.post({ sender: username, text }, { query: { roomId } });
            setInput('');
        }
    });

    const { mutate: destroyRoom } = useMutation({
        mutationFn: async () => {
            await client.room.delete(null, { query: { roomId } });
        }
    });

    const handleSend = () => {
        sendMessage({ text: input });
        inputRef.current?.focus();
    };

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopyStatus(true);
        setTimeout(() => setCopyStatus(false), 2000);
    };

    return (
        <main className='flex flex-col h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-blue-500/20'>
            
            {/* --- HEADER --- */}
            <header className='h-16 border-b border-white/5 bg-[#09090b]/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-50'>
                <div className='flex items-center gap-4'>
                    <div className='p-2 bg-zinc-900 rounded-lg border border-white/5'>
                        <Shield className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-[10px] font-bold text-zinc-500 uppercase tracking-widest'>Secure Uplink</span>
                        <button onClick={copyLink} className='flex items-center gap-2 group'>
                            <span className='font-mono text-sm font-bold text-zinc-200 group-hover:text-white transition-colors'>
                                {roomId.slice(0, 8)}•••
                            </span>
                            {copyStatus ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400" />}
                        </button>
                    </div>
                </div>

                <div className='flex items-center gap-3'>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 ${timeRemaining && timeRemaining < 60 ? 'text-red-500 border-red-900/30' : 'text-zinc-400'}`}>
                        <Clock className="w-3.5 h-3.5" />
                        <span className="font-mono text-sm font-medium tabular-nums">
                            {timeRemaining !== null ? formatTimeRemaining(timeRemaining) : "--:--"}
                        </span>
                    </div>
                    <button 
                        onClick={() => destroyRoom()}
                        className='p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors'
                        title="Self Destruct"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {/* --- CHAT AREA --- */}
            <div className='flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent'>
                
                {messages?.messages.length === 0 && (
                    <div className='h-full flex flex-col items-center justify-center opacity-40 select-none'>
                        <div className="w-16 h-16 bg-zinc-900/50 rounded-full flex items-center justify-center mb-4 border border-zinc-800">
                            <AlertCircle className="w-8 h-8 text-zinc-600" />
                        </div>
                        <p className='text-zinc-500 text-sm font-medium'>Encrypted channel established.</p>
                        <p className='text-zinc-600 text-xs mt-1'>Waiting for incoming transmission...</p>
                    </div>
                )}

                <div className="max-w-3xl mx-auto flex flex-col gap-6">
                    {messages?.messages.map((msg) => {
                        const isMe = msg.sender === username;
                        return (
                            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} group`}>
                                
                                {/* --- USERNAME & TIMESTAMP (Visible Now) --- */}
                                <div className={`flex items-baseline gap-2 mb-1.5 px-1 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <span className={`text-[11px] font-mono font-bold tracking-wide ${isMe ? 'text-zinc-500' : 'text-blue-400'}`}>
                                        {isMe ? 'YOU' : msg.sender}
                                    </span>
                                    <span className="text-[10px] text-zinc-700 font-mono">
                                        {format(new Date(msg.timestamp), "HH:mm")}
                                    </span>
                                </div>

                                {/* --- BUBBLE --- */}
                                <div className={`
                                    max-w-[85%] px-5 py-3 text-[15px] leading-relaxed shadow-sm relative transition-all
                                    ${isMe 
                                        ? 'bg-zinc-100 text-black rounded-2xl rounded-tr-sm' 
                                        : 'bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-2xl rounded-tl-sm hover:border-zinc-700'
                                    }
                                `}>
                                    {msg.text}
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* --- INPUT AREA --- */}
            <div className='p-6 bg-[#09090b] border-t border-white/5'>
                <div className="max-w-3xl mx-auto relative group">
                    <input 
                        ref={inputRef}
                        autoFocus
                        value={input} 
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder='Type a secure message...'
                        className='w-full bg-zinc-900/30 hover:bg-zinc-900/50 focus:bg-zinc-900 border border-zinc-800 focus:border-zinc-700 text-zinc-100 placeholder:text-zinc-600 pl-5 pr-14 py-4 rounded-xl outline-none transition-all'
                        autoComplete="off"
                    />
                    
                    <button 
                        onClick={handleSend}
                        disabled={!input.trim() || isPending}
                        className='absolute right-2 top-2 p-2.5 bg-zinc-100 text-black rounded-lg hover:bg-zinc-300 disabled:bg-transparent disabled:text-zinc-700 transition-all'
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                
                <div className="text-center mt-4 flex items-center justify-center gap-2 opacity-40">
                    <Shield className="w-3 h-3 text-zinc-500" />
                    <span className="text-[10px] text-zinc-500 font-medium tracking-wide">
                        E2E ENCRYPTED • EPHEMERAL STORAGE
                    </span>
                </div>
            </div>

        </main>
    );
}

export default Page;