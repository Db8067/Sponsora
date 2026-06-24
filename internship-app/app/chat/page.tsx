"use client";

import { useState, useEffect, useRef } from "react";
import { Send, ChevronLeft, ShieldCheck } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function UserChatSystem() {
  const { user } = useUser();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/chat?userId=${user.id}`);
        if (res.ok) {
          const data = await res.json();
          setMessages(data.messages || []);
          scrollToBottom();
        }
      } catch (err) {
        console.error("Failed to fetch messages", err);
      }
    };

    fetchMessages();

    const channel = supabase
      .channel(`user-chat-${user.id}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chats', filter: `user_id=eq.${user.id}` },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
          scrollToBottom();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const msgText = newMessage.trim();
    setNewMessage("");

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, message: msgText })
      });
      if (!res.ok) {
        console.error("Failed to send message", await res.text());
      }
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full pt-20 pb-6 px-2 sm:px-4 flex items-center justify-center selection:bg-primary/30">
      {/* Background gradients similar to Personalsite */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none hidden dark:block" />

      <div className="relative z-10 w-full max-w-3xl h-[calc(100dvh-120px)] sm:h-[80vh] flex flex-col glass rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl">
        <div className="p-4 sm:p-5 border-b border-black/5 dark:border-white/10 flex items-center bg-white/40 dark:bg-black/40 backdrop-blur-md">
          <Link href="/" className="mr-3 p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors sm:hidden">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </Link>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="ml-4 min-w-0">
            <h2 className="font-black text-foreground text-lg">Support Admin</h2>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold tracking-wider uppercase flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Online • Sponsora
            </p>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 pb-24">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
              <img src="/images/popup-doodle.png" alt="Chat" className="w-32 h-32 object-contain mb-4 opacity-50 grayscale" />
              <p className="text-base font-bold text-foreground">No messages yet.</p>
              <p className="text-sm text-foreground/60 max-w-xs mt-1">Send a message to start chatting with the admin.</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isUser = msg.sender_type === 'user';
              return (
                <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] sm:max-w-[75%] p-3.5 sm:px-5 sm:py-3.5 rounded-[1.5rem] shadow-sm ${isUser ? 'bg-gradient-to-r from-primary to-accent text-white rounded-br-sm shadow-primary/20' : 'bg-white dark:bg-white/10 text-foreground rounded-bl-sm border border-black/5 dark:border-white/10'}`}>
                    <p className="text-[14px] sm:text-[15px] font-medium whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                    <p className={`text-[10px] sm:text-[11px] mt-2 font-bold flex ${isUser ? 'justify-end text-white/70' : 'justify-start text-foreground/40'}`}>
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-t border-black/5 dark:border-white/10">
          <form onSubmit={sendMessage} className="flex items-end gap-3 max-w-4xl mx-auto">
            <div className="flex-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl flex items-center pr-2 focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary/50 transition-all shadow-inner">
              <input 
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..." 
                className="flex-1 bg-transparent border-none py-3.5 px-5 text-[14px] sm:text-[15px] focus:outline-none text-foreground font-medium"
              />
            </div>
            <button type="submit" disabled={!newMessage.trim()} className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary to-accent hover:opacity-90 text-white rounded-2xl flex items-center justify-center shrink-0 disabled:opacity-50 disabled:grayscale transition-all shadow-lg shadow-primary/30 disabled:shadow-none active:scale-95">
              <Send className="w-5 h-5 ml-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
