"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabase";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { CheckCircle2, ChevronRight, ChevronLeft, Image as ImageIcon, MapPin, UploadCloud, X } from "lucide-react";
import TipTapEditor from "./TipTapEditor";

export default function EventUploadForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    short_summary: "",
    description: "",
    start_at: "",
    end_at: "",
    registration_deadline: "",
    venue_type: "in_person",
    venue_address: "",
    venue_link: "",
    category_id: "",
    banner_url: "",
    gallery_urls: [] as string[],
    is_paid: false,
    entry_fee: 0,
    max_participants: 0,
    status: "draft",
  });

  // Autosave Draft
  useEffect(() => {
    const draft = localStorage.getItem("event_draft");
    if (draft) {
      setFormData(JSON.parse(draft));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("event_draft", JSON.stringify(formData));
  }, [formData]);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from("categories").select("id, name");
      if (data) setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDescriptionChange = (content: string) => {
    setFormData({ ...formData, description: content });
  };

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const payload = {
        ...formData,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now(),
        entry_fee: formData.is_paid ? Number(formData.entry_fee) : 0,
        max_participants: Number(formData.max_participants) || null,
        category_id: formData.category_id === "" ? null : formData.category_id,
        end_at: formData.end_at === "" ? null : formData.end_at,
        registration_deadline: formData.registration_deadline === "" ? null : formData.registration_deadline,
      };

      const { data, error: submitError } = await supabase.from("events").insert([payload]);

      if (submitError) throw submitError;

      localStorage.removeItem("event_draft");
      router.push("/adminevent?success=true");
    } catch (err: any) {
      setError(err.message || "Failed to create event.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-[#1C1C1E] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                step >= s ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-400 dark:bg-gray-800"
              }`}
            >
              {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
            </div>
            {s < 4 && (
              <div
                className={`flex-1 h-1 mx-2 rounded ${
                  step > s ? "bg-indigo-600" : "bg-gray-100 dark:bg-gray-800"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {error && <div className="mb-4 p-4 text-red-600 bg-red-50 rounded-lg">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Basic Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Event Title *</label>
              <input
                required
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., Tech Startup Mixer 2026"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Summary</label>
              <textarea
                name="short_summary"
                value={formData.short_summary}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500"
                placeholder="A brief overview for the event cards..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Description</label>
              <div className="mb-12">
                <TipTapEditor content={formData.description} onChange={handleDescriptionChange} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date & Time *</label>
                <input
                  required
                  type="datetime-local"
                  name="start_at"
                  value={formData.start_at}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date & Time</label>
                <input
                  type="datetime-local"
                  name="end_at"
                  value={formData.end_at}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Venue & Categorization</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Venue Type *</label>
              <select
                name="venue_type"
                value={formData.venue_type}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              >
                <option value="in_person">In Person</option>
                <option value="online">Online / Virtual</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            {(formData.venue_type === "in_person" || formData.venue_type === "hybrid") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Venue Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="venue_address"
                    value={formData.venue_address}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                    placeholder="123 Innovation Ave, Tech City"
                  />
                </div>
              </div>
            )}

            {(formData.venue_type === "online" || formData.venue_type === "hybrid") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Virtual Meeting Link</label>
                <input
                  type="url"
                  name="venue_link"
                  value={formData.venue_link}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                  placeholder="https://zoom.us/j/123456789"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              >
                <option value="">Select a Category...</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Media Upload</h2>
            
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center">
              {formData.banner_url ? (
                <div className="relative group">
                  <img src={formData.banner_url} alt="Banner" className="w-full h-64 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, banner_url: "" })}
                    className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? (
                <div className="p-8 bg-red-50 text-red-600 rounded-lg">
                  <p className="font-bold">Cloudinary Configuration Missing</p>
                  <p className="text-sm mt-2">Please add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME to your Vercel Environment Variables.</p>
                </div>
              ) : (
                <CldUploadWidget
                  signatureEndpoint="/api/cloudinary/sign"
                  onSuccess={(result: any) => {
                    setFormData({ ...formData, banner_url: result.info.secure_url });
                  }}
                >
                  {({ open }) => (
                    <button type="button" onClick={() => open()} className="flex flex-col items-center justify-center w-full space-y-3">
                      <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-full">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Upload Banner Image</p>
                        <p className="text-sm text-gray-500">Secure upload to Cloudinary</p>
                      </div>
                    </button>
                  )}
                </CldUploadWidget>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Event Gallery (Optional)</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.gallery_urls.map((url, i) => (
                  <div key={i} className="relative group aspect-square">
                    <img src={url} alt="Gallery" className="w-full h-full object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, gallery_urls: formData.gallery_urls.filter((_, idx) => idx !== i) })}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                {!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? (
                  <div className="aspect-square border-2 border-dashed border-red-300 bg-red-50 rounded-lg flex flex-col items-center justify-center text-red-500 text-center p-2">
                    <span className="text-[10px] font-bold">Cloudinary Missing</span>
                  </div>
                ) : (
                  <CldUploadWidget
                    signatureEndpoint="/api/cloudinary/sign"
                    onSuccess={(result: any) => {
                      setFormData({ ...formData, gallery_urls: [...formData.gallery_urls, result.info.secure_url] });
                    }}
                  >
                    {({ open }) => (
                      <button type="button" onClick={() => open()} className="aspect-square border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:text-indigo-600 hover:border-indigo-500 transition-colors">
                        <UploadCloud className="w-6 h-6 mb-2" />
                        <span className="text-xs font-medium">Add Photo</span>
                      </button>
                    )}
                  </CldUploadWidget>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Ticketing & Settings</h2>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Paid Event</p>
                <p className="text-sm text-gray-500">Charge an entry fee for attendees</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="is_paid" checked={formData.is_paid} onChange={handleChange} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            {formData.is_paid && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Entry Fee ($)</label>
                <input
                  type="number"
                  name="entry_fee"
                  value={formData.entry_fee}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max Participants / RSVP Limit (0 for unlimited)</label>
              <input
                type="number"
                name="max_participants"
                value={formData.max_participants}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Publishing Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              >
                <option value="draft">Save as Draft</option>
                <option value="published">Publish Immediately</option>
              </select>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 1}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              step === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </button>
          
          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Continue <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px-6 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : (formData.status === 'published' ? "Publish Event" : "Save Draft")}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
