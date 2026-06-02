"use client";

import React from "react";
import { Calendar, MapPin, Users, Trophy, ExternalLink } from "lucide-react";
import { format } from "date-fns";

export default function LiveEventPreview({ data }: { data: any }) {
  // Safe parsing for date
  let dateDisplay = "Date TBD";
  if (data.start_at) {
    try {
      dateDisplay = format(new Date(data.start_at), "MMM d, yyyy");
    } catch (e) {
      dateDisplay = "Invalid Date";
    }
  }

  return (
    <div className="flex flex-col h-[600px] overflow-y-auto bg-white dark:bg-slate-900 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] border border-gray-100 dark:border-gray-800 pointer-events-none custom-scrollbar">
      {/* Banner */}
      <div className="w-full h-48 bg-gray-100 dark:bg-slate-800 relative shrink-0">
        {data.banner_url ? (
          <img src={data.banner_url} alt="Banner Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-foreground/30 font-medium text-sm">
            No Banner Uploaded
          </div>
        )}
        {data.is_featured && (
          <div className="absolute top-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h2 className="font-heading text-2xl font-bold text-foreground mb-2 leading-tight">
          {data.title || "Event Title Preview"}
        </h2>
        <p className="text-foreground/70 text-sm mb-6 line-clamp-2">
          {data.short_summary || "Event short summary will appear here."}
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-foreground/50 uppercase tracking-wider">Date</p>
              <p className="font-semibold text-foreground text-sm">{dateDisplay}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-foreground/50 uppercase tracking-wider">Location</p>
              <p className="font-semibold text-foreground text-sm line-clamp-1">
                {data.venue_type === "online" ? "Online Event" : (data.venue_address || "TBD")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-foreground/50 uppercase tracking-wider">Prize Pool</p>
              <p className="font-semibold text-foreground text-sm line-clamp-1">
                {data.prize_pool || "None"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-foreground/50 uppercase tracking-wider">Team Size</p>
              <p className="font-semibold text-foreground text-sm">
                {data.team_allowed ? `${data.min_team} - ${data.max_team} Members` : "Individual"}
              </p>
            </div>
          </div>
        </div>

        {/* Description Snippet */}
        <div className="mt-2 mb-8">
          <h3 className="font-semibold text-foreground mb-2">About Event</h3>
          <div 
            className="text-sm text-foreground/70 prose dark:prose-invert prose-sm max-w-none line-clamp-4"
            dangerouslySetInnerHTML={{ __html: data.description || "<p>Detailed description will appear here...</p>" }}
          />
        </div>

        {/* CTA */}
        <div className="mt-auto pt-4 border-t border-black/5 dark:border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-lg text-foreground">
              {data.is_paid && data.entry_fee > 0 ? `₹${data.entry_fee}` : "Free Entry"}
            </span>
            <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-medium shadow-lg flex items-center gap-2">
              Register Now <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.3);
          border-radius: 10px;
        }
        :global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(75, 85, 99, 0.5);
        }
      `}</style>
    </div>
  );
}
