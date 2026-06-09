"use client";

import { motion } from "framer-motion";
import { Building2, MapPin, IndianRupee, Clock, CalendarDays, ArrowRight, Eye, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSubscription } from "./SubscriptionContext";
import { useUser } from "@clerk/nextjs";
import { useSignIn } from "@clerk/nextjs";

export interface InternshipPost {
  id: string;
  title: string;
  category_slug?: string;
  slug?: string;
  created_at?: string;
  isBlurred?: boolean;
  metadata: {
    company_name: string;
    company_logo_url?: string;
    location_type: string;
    city?: string;
    stipend_min?: number;
    stipend_max?: number;
    duration_months?: number;
    deadline?: string;
    skills?: string;
    is_featured?: boolean;
    apply_link?: string;
  };
}

interface InternshipCardProps {
  internship: InternshipPost;
  index?: number;
  categorySlug: string;
}

export function InternshipCard({ internship, index = 0, categorySlug }: InternshipCardProps) {
  const router = useRouter();
  const { isPaid, isLoading } = useSubscription();
  const { isSignedIn } = useUser();
  const meta = internship.metadata || {};
  const isBlurred = !isPaid;

  const formatStipend = () => {
    if (!meta.stipend_min && !meta.stipend_max) return "Unpaid";
    if (meta.stipend_min && !meta.stipend_max) return `₹${Number(meta.stipend_min).toLocaleString()}/mo`;
    return `₹${Number(meta.stipend_min).toLocaleString()} - ₹${Number(meta.stipend_max).toLocaleString()}/mo`;
  };

  const handleCompanyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isSignedIn) {
      // Not logged in — redirect to Clerk sign-in
      router.push("/sign-in?redirect_url=" + encodeURIComponent(window.location.pathname));
      return;
    }
    // Logged in but not paid — go to subscribe
    router.push("/subscribe");
  };

  const skillsList = meta.skills ? meta.skills.split(",").map((s) => s.trim()).filter(Boolean) : [];

  return (
    <motion.a
      href={`/internships/category/${categorySlug}/${internship.slug || internship.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative w-full cursor-pointer block rounded-2xl glass bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-5 sm:p-6 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/30 transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row gap-5">

        {/* Company Logo */}
        <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-xl bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center overflow-hidden relative">
          {isBlurred ? (
            <>
              <div className="absolute inset-0 backdrop-blur-md bg-white/20 dark:bg-black/30 z-10 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-primary/70" />
              </div>
              <Building2 className="w-8 h-8 text-foreground/20" />
            </>
          ) : meta.company_logo_url ? (
            <img
              src={meta.company_logo_url}
              alt={meta.company_name}
              className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <Building2 className="w-8 h-8 text-primary/50" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 mb-2">
            <div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors truncate">
                {internship.title}
              </h3>

              {/* Company Name — Blurred for non-paid users */}
              <div className="flex items-center gap-1.5 mt-1">
                <Building2 className="w-4 h-4 text-foreground/50 shrink-0" />
                {isBlurred ? (
                  <button
                    onClick={handleCompanyClick}
                    className="flex items-center gap-1.5 group/blur"
                    title="Unlock to see company"
                  >
                    <span
                      className="font-medium text-sm select-none pointer-events-none"
                      style={{
                        filter: "blur(6px)",
                        userSelect: "none",
                        WebkitUserSelect: "none",
                        color: "transparent",
                        textShadow: "0 0 10px rgba(108,99,255,0.5)",
                        letterSpacing: "2px",
                      }}
                    >
                      {meta.company_name || "████████████"}
                    </span>
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold group-hover/blur:bg-primary group-hover/blur:text-white transition-all ml-1">
                      <Eye className="w-3 h-3" /> See Company details
                    </span>
                  </button>
                ) : (
                  <p className="text-foreground/70 font-medium text-sm">
                    {meta.company_name || "Company Name"}
                  </p>
                )}
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {meta.is_featured && (
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-accent/20 text-accent border border-accent/20">
                  Featured
                </span>
              )}
            </div>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="truncate">{meta.location_type || "Online"}{meta.city ? `, ${meta.city}` : ""}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              <IndianRupee className="w-4 h-4 text-green-500" />
              <span className="truncate">{formatStipend()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              <Clock className="w-4 h-4 text-accent" />
              <span>{meta.duration_months ? `${meta.duration_months} Months` : "-"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              <CalendarDays className="w-4 h-4 text-foreground/50" />
              <span>{meta.deadline ? new Date(meta.deadline).toLocaleDateString() : "Rolling"}</span>
            </div>
          </div>

          {/* Footer (CTA) */}
          <div className="flex flex-col sm:flex-row items-end justify-end gap-4 mt-2 pt-4 border-t border-black/5 dark:border-white/5">
            <button className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-primary-dark transition-colors">
              View internship details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </motion.a>
  );
}
