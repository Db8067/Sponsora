"use client";

import React, { useState } from "react";
import CreateEventWorkflow from "@/components/events/CreateEventWorkflow";
import LiveEventPreview from "@/components/events/LiveEventPreview";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminCreateEventPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<any>({
    category_slug: "",
    title: "",
    short_summary: "",
    description: "",
    start_at: "",
    registration_deadline: "",
    venue_type: "in_person",
    venue_address: "",
    venue_link: "",
    banner_url: "",
    gallery_urls: [],
    is_paid: false,
    entry_fee: 0,
    prize_pool: "",
    team_allowed: false,
    min_team: 1,
    max_team: 1,
    is_featured: false,
    registration_link: "",
    status: "draft",
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSuccess = () => {
    setIsSuccess(true);
    setTimeout(() => {
      router.push("/adminevent");
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-6 rounded-full mb-6"
        >
          <CheckCircle className="w-16 h-16" />
        </motion.div>
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-heading font-bold text-foreground mb-2"
        >
          Event Created Successfully!
        </motion.h2>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-foreground/60"
        >
          Redirecting back to events dashboard...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start h-full pb-10">
      {/* Form Section */}
      <div className="w-full lg:w-3/5">
        <CreateEventWorkflow formData={formData} setFormData={setFormData} onSuccess={handleSuccess} />
      </div>

      {/* Live Preview Section - Only visible on lg and up */}
      <div className="hidden lg:block lg:w-2/5 sticky top-24">
        <div className="bg-background rounded-2xl shadow-sm border border-black/5 dark:border-white/10 overflow-hidden glass p-6">
          <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-6 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            Live Detail Preview
          </h3>
          <LiveEventPreview data={formData} />
        </div>
      </div>
    </div>
  );
}
