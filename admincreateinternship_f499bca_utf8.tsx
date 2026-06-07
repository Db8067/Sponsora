"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Building2, MapPin, IndianRupee, Clock, CalendarDays, ArrowLeft, Image as ImageIcon, CheckCircle2, Save } from "lucide-react";
import { toast } from "sonner";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { useRouter } from "next/navigation";

export default function AdminCreateInternshipPage() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    company_name: "",
    company_logo_url: "",
    category: "software-engineering",
    location_type: "Remote",
    city: "",
    stipend_min: "",
    stipend_max: "",
    duration_months: "",
    deadline: "",
    description: "",
    skills: "",
    perks: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadToCloudinary(file);
      setFormData(prev => ({ ...prev, company_logo_url: url }));
      toast.success("Logo uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload logo");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = () => {
    if (!formData.title || !formData.company_name) {
      return toast.error("Please fill the required fields");
    }
    toast.success("Internship saved successfully!");
    setTimeout(() => router.back(), 1500);
  };

  const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
  const perksArray = formData.perks.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] w-full overflow-hidden bg-background">
      
      {/* LEFT: FORM BUILDER */}
      <div className="w-full md:w-1/2 h-full overflow-y-auto p-6 md:p-8 border-r border-white/10 custom-scrollbar">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-foreground/60 hover:text-foreground mb-6 text-sm font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Internship Builder</h1>
            <p className="text-foreground/60 mt-1">Create or edit internship listings</p>
          </div>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
          >
            <Save className="w-4 h-4" /> Save
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {/* Category */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <label className="block text-sm font-semibold mb-2 text-primary">Target Category</label>
            <select 
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary font-medium"
            >
              <option value="software-engineering">Software Engineering</option>
              <option value="design">Design & UI/UX</option>
              <option value="marketing">Marketing & Growth</option>
              <option value="finance">Finance & Accounting</option>
              <option value="operations">Operations & HR</option>
            </select>
          </div>

          {/* Basic Info */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4">
            <h3 className="font-semibold text-lg border-b border-white/10 pb-2">Basic Info</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Internship Title *</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-primary" placeholder="e.g. Frontend Intern" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Company Name *</label>
                <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company Logo</label>
                <input type="file" ref={logoInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                <button 
                  onClick={() => logoInputRef.current?.click()}
                  className="w-full bg-background/50 border border-white/10 border-dashed hover:border-primary rounded-xl px-4 py-2 flex items-center justify-center gap-2 text-sm text-foreground/70"
                >
                  <ImageIcon className="w-4 h-4" /> {isUploading ? "Uploading..." : formData.company_logo_url ? "Change Logo" : "Upload Logo"}
                </button>
              </div>
            </div>
          </div>

          {/* Logistics */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4">
            <h3 className="font-semibold text-lg border-b border-white/10 pb-2">Logistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Location Type</label>
                <select name="location_type" value={formData.location_type} onChange={handleChange} className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-primary">
                  <option value="Remote">Remote</option>
                  <option value="Onsite">Onsite</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City (if applicable)</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Min Stipend (Γé╣)</label>
                <input type="number" name="stipend_min" value={formData.stipend_min} onChange={handleChange} className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Max Stipend (Γé╣)</label>
                <input type="number" name="stipend_max" value={formData.stipend_max} onChange={handleChange} className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Duration (Months)</label>
                <input type="number" name="duration_months" value={formData.duration_months} onChange={handleChange} className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Application Deadline</label>
                <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-primary" />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4">
            <h3 className="font-semibold text-lg border-b border-white/10 pb-2">Description & Requirements</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Full Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Skills Required (comma separated)</label>
              <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g. React, TypeScript, Node.js" className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Perks (comma separated)</label>
              <input type="text" name="perks" value={formData.perks} onChange={handleChange} placeholder="e.g. Flexible Hours, Free Lunch, PPO" className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-primary" />
            </div>
          </div>

          <div className="h-20"></div> {/* Scroll padding */}
        </div>
      </div>

      {/* RIGHT: LIVE PREVIEW */}
      <div className="hidden md:flex w-1/2 h-full bg-black/5 dark:bg-white/5 border-l border-white/10 overflow-y-auto p-8 relative flex-col items-center">
        
        <div className="w-full mb-4 flex items-center justify-between">
          <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Live Preview
          </span>
          <span className="text-xs text-foreground/50">
            Category: <strong className="text-foreground">{formData.category.replace('-', ' ').toUpperCase()}</strong>
          </span>
        </div>

        {/* Mock Phone Container for Preview */}
        <div className="w-full max-w-[420px] bg-background border-4 border-white/10 rounded-[3rem] overflow-hidden shadow-2xl relative min-h-[800px] flex flex-col">
          {/* Phone Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-white/10 rounded-b-3xl z-50 backdrop-blur-md" />
          
          <div className="flex-1 overflow-y-auto pt-12 pb-8 px-5 custom-scrollbar bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
            
            {/* Header Card Preview */}
            <div className="p-5 rounded-3xl glass border border-white/10 relative overflow-hidden mb-6">
              <div className="flex flex-col gap-4">
                <div className="h-16 w-16 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                  {formData.company_logo_url ? (
                    <img src={formData.company_logo_url} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <Building2 className="w-8 h-8 text-primary/50" />
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground tracking-tight mb-1">
                    {formData.title || "Internship Title"}
                  </h1>
                  <p className="text-sm text-foreground/70 font-medium flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" />
                    {formData.company_name || "Company Name"}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Details Preview */}
            <div className="p-5 rounded-3xl glass border border-white/10 w-full mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-xs text-foreground/50 font-medium">
                    <IndianRupee className="w-3.5 h-3.5 text-primary" /> Stipend
                  </div>
                  <p className="font-bold text-sm">
                    {formData.stipend_min ? `Γé╣${formData.stipend_min}` : "Γé╣0"} 
                    {formData.stipend_max ? ` - Γé╣${formData.stipend_max}` : ""}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-xs text-foreground/50 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-accent" /> Location
                  </div>
                  <p className="font-bold text-sm">
                    {formData.location_type} {formData.city && `- ${formData.city}`}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-xs text-foreground/50 font-medium">
                    <Clock className="w-3.5 h-3.5" /> Duration
                  </div>
                  <p className="font-bold text-sm">
                    {formData.duration_months ? `${formData.duration_months} Months` : "-"}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-xs text-foreground/50 font-medium">
                    <CalendarDays className="w-3.5 h-3.5 text-red-500" /> Deadline
                  </div>
                  <p className="font-bold text-sm">
                    {formData.deadline || "Rolling"}
                  </p>
                </div>
              </div>
              <div className="w-full h-[1px] bg-white/10 my-4" />
              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-sm flex items-center justify-center">
                Apply Now
              </button>
            </div>

            {/* Description Preview */}
            <div className="p-5 rounded-3xl glass border border-white/10 mb-6">
              <h2 className="text-lg font-bold mb-3">About the Role</h2>
              <div className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                {formData.description || "Description will appear here..."}
              </div>

              {skillsArray.length > 0 && (
                <>
                  <h3 className="text-base font-bold mt-6 mb-3">Skills Required</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillsArray.map((skill, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {perksArray.length > 0 && (
                <>
                  <h3 className="text-base font-bold mt-6 mb-3">Perks & Benefits</h3>
                  <div className="flex flex-col gap-2">
                    {perksArray.map((perk, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                        <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
