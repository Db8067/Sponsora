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
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });
      
      if (!error && data) {
        setMessages(data);
        scrollToBottom();
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

    const { error } = await supabase.from('chats').insert({
      user_id: user.id,
      message: msgText,
      sender_type: 'user'
    } as any);

    if (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-0 sm:px-6 lg:px-8 py-0 sm:py-8 h-[calc(100vh-64px)] overflow-hidden">
      <div className="glass sm:rounded-2xl border-0 sm:border border-white/10 h-full flex flex-col overflow-hidden relative">
        <div className="p-4 border-b border-white/10 flex items-center bg-black/40 backdrop-blur-md">
          <Link href="/" className="mr-3 p-2 hover:bg-white/10 rounded-full transition-colors sm:hidden">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </Link>
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="ml-3 min-w-0">
            <h2 className="font-bold text-foreground text-sm sm:text-base">Support Admin</h2>
            <p className="text-[10px] sm:text-xs text-emerald-500 font-bold tracking-widest uppercase">Online • Sponsora Team</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <p className="text-sm font-medium text-foreground">No messages yet.</p>
              <p className="text-xs text-foreground/50">Send a message to start chatting with the admin.</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isUser = msg.sender_type === 'user';
              return (
                <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] sm:max-w-[70%] p-3 sm:px-4 sm:py-3 rounded-2xl ${isUser ? 'bg-primary text-primary-foreground rounded-br-sm shadow-[0_4px_14px_0_hsl(var(--primary)/0.3)]' : 'bg-white/10 text-foreground rounded-bl-sm border border-white/10'}`}>
                    <p className="text-[13px] sm:text-sm font-medium whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                    <p className={`text-[9px] sm:text-[10px] mt-1.5 text-right font-medium ${isUser ? 'text-primary-foreground/70' : 'text-foreground/40'}`}>
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-background/80 backdrop-blur-xl border-t border-white/10">
          <form onSubmit={sendMessage} className="flex items-end gap-2 max-w-4xl mx-auto">
            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl flex items-center pr-2 focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary/50 transition-all">
              <input 
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..." 
                className="flex-1 bg-transparent border-none py-3 px-4 text-[13px] sm:text-sm focus:outline-none text-foreground"
              />
            </div>
            <button type="submit" disabled={!newMessage.trim()} className="w-11 h-11 sm:w-12 sm:h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl flex items-center justify-center shrink-0 disabled:opacity-50 disabled:hover:bg-primary transition-all shadow-[0_4px_14px_0_hsl(var(--primary)/0.3)] disabled:shadow-none">
              <Send className="w-5 h-5 ml-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
