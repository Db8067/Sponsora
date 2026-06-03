"use client";

import { motion } from "framer-motion";
import { Building2, MapPin, IndianRupee, Clock, CalendarDays, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface Internship {
  id: string;
  title: string;
  slug: string;
  company_name: string;
  company_logo_url?: string;
  location_type: string;
  city?: string;
  stipend_min?: number;
  stipend_max?: number;
  duration_months?: number;
  deadline?: string;
  skills_required?: string[];
  is_featured?: boolean;
  category_slug: string;
}

interface InternshipCardProps {
  internship: Internship;
  index?: number;
}

export function InternshipCard({ internship, index = 0 }: InternshipCardProps) {
  const router = useRouter();
  
  const formatStipend = () => {
    if (!internship.stipend_min && !internship.stipend_max) return "Unpaid";
    if (internship.stipend_min && !internship.stipend_max) return `₹${internship.stipend_min.toLocaleString()}/mo`;
    return `₹${internship.stipend_min?.toLocaleString()} - ₹${internship.stipend_max?.toLocaleString()}/mo`;
  };

  const handleCardClick = () => {
    router.push(`/internships/${internship.category_slug}/${internship.slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={handleCardClick}
      className="group relative w-full cursor-pointer rounded-2xl glass p-5 sm:p-6 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/30 transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row gap-5">
        
        {/* Company Logo */}
        <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
          {internship.company_logo_url ? (
            <img 
              src={internship.company_logo_url} 
              alt={internship.company_name} 
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
              <p className="text-foreground/70 font-medium text-sm flex items-center gap-1.5 mt-1">
                <Building2 className="w-4 h-4" />
                {internship.company_name}
              </p>
            </div>
            
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {internship.is_featured && (
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-accent/20 text-accent border border-accent/20">
                  Recommended
                </span>
              )}
            </div>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="truncate">{internship.location_type === 'remote' ? 'Remote' : (internship.city || 'Onsite')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              <IndianRupee className="w-4 h-4 text-green-500" />
              <span className="truncate">{formatStipend()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              <Clock className="w-4 h-4 text-accent" />
              <span>{internship.duration_months} Months</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              <CalendarDays className="w-4 h-4 text-foreground/50" />
              <span>{internship.deadline ? new Date(internship.deadline).toLocaleDateString() : 'Rolling'}</span>
            </div>
          </div>

          {/* Footer (Skills & CTA) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2 pt-4 border-t border-white/10 dark:border-white/5">
            <div className="flex flex-wrap gap-2">
              {internship.skills_required?.slice(0, 3).map((skill, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-foreground/80">
                  {skill}
                </span>
              ))}
              {internship.skills_required && internship.skills_required.length > 3 && (
                <span className="px-2.5 py-1 rounded-md text-xs text-foreground/50">
                  +{internship.skills_required.length - 3} more
                </span>
              )}
            </div>

            <button 
              className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-primary-dark transition-colors"
            >
              View Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
