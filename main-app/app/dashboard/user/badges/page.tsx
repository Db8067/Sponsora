"use client";

import { Trophy, Star, Shield, Award, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function UserBadgesPage() {
  const badges = [
    { id: 1, name: "Early Bird", desc: "Registered for your first event in 2026", icon: <Trophy className="w-8 h-8" />, color: "from-orange-500 to-yellow-500", date: "Jan 12, 2026" },
    { id: 2, name: "AI Explorer", desc: "Participated in Global AI Hackathon", icon: <Sparkles className="w-8 h-8" />, color: "from-blue-500 to-indigo-500", date: "May 02, 2026" },
    { id: 3, name: "Social Star", desc: "Invited 5 friends to the platform", icon: <Star className="w-8 h-8" />, color: "from-purple-500 to-pink-500", date: "Feb 20, 2026" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">My Badges</h1>
        <p className="text-foreground/70 mt-1">Digital collectibles representing your achievements.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {badges.map((badge, i) => (
          <motion.div 
            key={badge.id}
            whileHover={{ y: -5, scale: 1.05 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6 rounded-3xl flex flex-col items-center text-center group"
          >
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${badge.color} p-0.5 shadow-lg mb-4 group-hover:shadow-primary/20 transition-all`}>
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white">
                {badge.icon}
              </div>
            </div>
            <h3 className="font-bold text-foreground mb-1">{badge.name}</h3>
            <p className="text-[10px] text-foreground/50 uppercase tracking-widest font-bold mb-3">{badge.date}</p>
            <p className="text-xs text-foreground/70 leading-tight">{badge.desc}</p>
          </motion.div>
        ))}

        {/* Locked Badge */}
        <div className="glass p-6 rounded-3xl flex flex-col items-center text-center opacity-40 grayscale">
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4 border border-white/10">
            <Shield className="w-8 h-8 text-foreground/20" />
          </div>
          <h3 className="font-bold text-foreground mb-1">Top Contributor</h3>
          <p className="text-xs text-foreground/70 leading-tight">Post 5 blog articles to unlock.</p>
        </div>
      </div>
    </div>
  );
}
