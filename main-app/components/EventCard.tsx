"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Trophy, Users, ArrowRight, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export interface EventPost {
  id: string;
  title: string;
  image_url?: string;
  date_info?: string;
  category_slug?: string;
  created_at?: string;
  metadata: {
    venue_type: string;
    venue_address?: string;
    prize_pool?: string;
    team_allowed?: boolean;
    min_team?: number;
    max_team?: number;
    is_featured?: boolean;
    skills?: string;
  };
}

interface EventCardProps {
  event: EventPost;
  index?: number;
  categorySlug: string;
}

export function EventCard({ event, index = 0, categorySlug }: EventCardProps) {
  const router = useRouter();
  const meta = event.metadata || {};

  const handleCardClick = () => {
    router.push(`/events/category/${categorySlug}/${event.id}`);
  };

  const skillsList = meta.skills ? meta.skills.split(',').map(s => s.trim()).filter(Boolean) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={handleCardClick}
      className="group relative w-full h-full cursor-pointer rounded-2xl bg-white dark:bg-[#1A1A1D] border border-black/5 dark:border-white/10 overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/30 transition-all duration-300 flex flex-col"
    >
      {/* Event Image */}
      <div className="w-full h-48 shrink-0 bg-black/5 dark:bg-white/5 relative overflow-hidden">
        {event.image_url ? (
          <img 
            src={event.image_url} 
            alt={event.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-foreground/20" />
          </div>
        )}
        {meta.is_featured && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider rounded-md shadow-md">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col min-w-0">
        
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-4">
          {event.title}
        </h3>

        {/* Key Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 mt-auto">
          <div className="flex items-center gap-2 text-sm text-foreground/80">
            <Calendar className="w-4 h-4 text-indigo-500" />
            <span className="truncate">{event.date_info || "TBD"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground/80">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span className="truncate capitalize">{meta.venue_type || 'TBD'}</span>
          </div>
          {meta.prize_pool && (
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="truncate">{meta.prize_pool}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-foreground/80">
            <Users className="w-4 h-4 text-blue-500" />
            <span className="truncate">{meta.team_allowed ? `${meta.min_team}-${meta.max_team} Members` : "Solo"}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-black/5 dark:border-white/10 mt-auto">
          <div className="flex gap-2">
            {skillsList.slice(0, 2).map((skill, i) => (
              <span key={i} className="px-2 py-1 rounded-md bg-black/5 dark:bg-white/5 text-[10px] font-medium text-foreground/70">
                {skill}
              </span>
            ))}
            {skillsList.length > 2 && (
              <span className="px-2 py-1 rounded-md text-[10px] text-foreground/50 font-medium">
                +{skillsList.length - 2}
              </span>
            )}
          </div>

          <button className="flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-primary-dark transition-colors">
            Register <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </motion.div>
  );
}
