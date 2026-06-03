"use client";

import { useState } from "react";
import { Search, MoreVertical, Paperclip, Send, FileText, Check, CheckCheck, ChevronLeft, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SharedChatSystem() {
  const [activeChat, setActiveChat] = useState<number | null>(null);

  const chats = [
    { id: 1, name: "Acme Corp (Sponsor)", event: "Global AI Hackathon", unread: 2, time: "10:42 AM", lastMsg: "We're reviewing the proposal now." },
    { id: 2, name: "TechFlow", event: "Web3 Meetup", unread: 0, time: "Yesterday", lastMsg: "Sounds good, looking forward to it." },
    { id: 3, name: "CloudScale", event: "React India Conf", unread: 0, time: "Mon", lastMsg: "Can we schedule a call?" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-0 sm:py-8 h-[calc(100vh-64px)] overflow-hidden">
      <div className="glass sm:rounded-2xl border-0 sm:border border-white/10 h-full flex overflow-hidden relative">
        
        {/* Chat Sidebar (List) */}
        <div className={`w-full md:w-1/3 border-r border-white/10 flex flex-col bg-black/20 transition-all duration-300 ${activeChat ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b border-white/10">
            <h2 className="font-heading text-xl font-bold text-foreground mb-4">Inbox</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
              <input 
                type="text" 
                placeholder="Search messages..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {chats.map(chat => (
              <div 
                key={chat.id} 
                onClick={() => setActiveChat(chat.id)}
                className={`p-4 border-b border-white/5 cursor-pointer transition-colors flex items-start gap-3 ${activeChat === chat.id ? 'bg-primary/20' : 'hover:bg-white/5'}`}
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                  {chat.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-sm text-foreground truncate">{chat.name}</h3>
                    <span className="text-[10px] text-foreground/50 shrink-0">{chat.time}</span>
                  </div>
                  <p className="text-[10px] text-primary mb-1 truncate font-bold uppercase tracking-tight">{chat.event}</p>
                  <p className={`text-sm truncate ${chat.unread > 0 ? 'text-foreground font-semibold' : 'text-foreground/60'}`}>
                    {chat.lastMsg}
                  </p>
                </div>
                {chat.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-1">
                    {chat.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Active Chat Area */}
        <AnimatePresence mode="wait">
          {activeChat ? (
            <motion.div 
              key="chat"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="flex-1 flex flex-col bg-background/50 absolute inset-0 z-10 md:relative md:z-0"
            >
              {/* Chat Header */}
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/40 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setActiveChat(null)}
                    className="md:hidden p-2 -ml-2 hover:bg-white/10 rounded-full"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {chats.find(c => c.id === activeChat)?.name[0]}
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-bold text-foreground text-sm sm:text-base truncate">{chats.find(c => c.id === activeChat)?.name}</h2>
                    <p className="text-[10px] sm:text-xs text-foreground/50 truncate">Interested in: {chats.find(c => c.id === activeChat)?.event}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="hidden sm:flex bg-primary/20 text-primary px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-primary/30 transition-colors items-center gap-2 border border-primary/30">
                    <FileText className="w-3.5 h-3.5" /> Agreement
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg text-foreground/70 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col scrollbar-hide">
                <div className="text-center text-[10px] uppercase font-bold tracking-widest text-foreground/20 my-4">Today</div>
                
                {/* Incoming Message */}
                <div className="flex items-start gap-3 max-w-[90%] sm:max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0 text-xs">
                    A
                  </div>
                  <div>
                    <div className="bg-white/10 border border-white/5 rounded-2xl rounded-tl-none p-3 text-sm text-foreground">
                      Hi team! We saw your listing for the Global AI Hackathon and we're very interested in the Title Sponsorship package.
                    </div>
                    <span className="text-[10px] text-foreground/40 mt-1 ml-1">10:30 AM</span>
                  </div>
                </div>

                {/* Outgoing Message with Attachment */}
                <div className="flex items-start gap-3 max-w-[90%] sm:max-w-[80%] self-end flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold shrink-0 text-xs">
                    Me
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="bg-primary text-white rounded-2xl rounded-tr-none p-3 text-sm shadow-lg shadow-primary/20">
                      Hello! I've attached our full sponsorship deck.
                    </div>
                    <div className="mt-2 bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3 w-56 sm:w-64">
                      <div className="w-10 h-10 rounded-lg bg-red-500/20 text-red-500 flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-foreground truncate">AI_Hackathon_Deck.pdf</p>
                        <p className="text-[10px] text-foreground/50">2.4 MB</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-1 mr-1">
                      <span className="text-[10px] text-foreground/40">10:35 AM</span>
                      <CheckCheck className="w-3 h-3 text-primary" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-md">
                <div className="relative flex items-center bg-white/5 border border-white/10 rounded-xl px-2">
                  <button className="p-2 hover:bg-white/10 rounded-lg text-foreground/50 hover:text-foreground transition-colors shrink-0">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    className="flex-1 bg-transparent py-4 px-2 text-sm focus:outline-none text-foreground"
                  />
                  <button className="p-2 bg-primary hover:bg-primary-dark rounded-lg text-white transition-colors shrink-0 m-1">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="hidden md:flex flex-1 items-center justify-center bg-background/50 text-foreground/40">
              <div className="text-center">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-lg text-foreground/60">Your Inbox</h3>
                <p className="text-sm max-w-[200px]">Select a conversation to start messaging sponsors and organizers.</p>
              </div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

