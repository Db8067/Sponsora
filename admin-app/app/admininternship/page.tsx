"use client";

import { motion } from "framer-motion";
import { PlusCircle, Image as ImageIcon, Settings, Trash2, Edit3, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { uploadToCloudinary } from "@/lib/cloudinary";

interface Category {
  id: string;
  name: string;
  description: string;
  banner_url: string;
  slug: string;
}

const mockCategories = [
  { id: "1", name: "Software Engineering", slug: "software-engineering", description: "Frontend, Backend, Fullstack, AI & DevOps", banner_url: "/images/se_internship_doodle.png" },
  { id: "2", name: "Design & UI/UX", slug: "design", description: "Product Design, Graphic Design, Web Design", banner_url: "/images/design_internship_doodle.png" },
];

export default function AdminInternshipsCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [isAdding, setIsAdding] = useState(false);
  
  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");
  const [newCatBanner, setNewCatBanner] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadToCloudinary(file);
      setNewCatBanner(url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveCategory = () => {
    if (!newCatName) return toast.error("Name is required");
    
    const newCategory: Category = {
      id: Math.random().toString(),
      name: newCatName,
      slug: newCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: newCatDesc,
      banner_url: newCatBanner || "/images/media__1780053351688.png"
    };

    setCategories([...categories, newCategory]);
    setIsAdding(false);
    setNewCatName("");
    setNewCatDesc("");
    setNewCatBanner("");
    toast.success("Category added successfully!");
  };

  const handleDelete = (id: string) => {
    if(confirm("Are you sure you want to delete this category? All internships in it will be lost.")) {
      setCategories(categories.filter(c => c.id !== id));
      toast.success("Category deleted");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-10 w-full mx-auto max-w-7xl flex flex-col min-h-screen"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Internship Landing Page</h1>
          <p className="text-foreground/60 mt-1">Customize categories shown on the internship landing page. Click a category to manage its internships.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full hover:bg-primary-dark transition-colors font-medium shadow-lg shadow-primary/20"
        >
          <PlusCircle className="w-5 h-5" />
          Add Category
        </button>
      </div>

      {isAdding && (
        <div className="mb-8 p-6 rounded-3xl glass border border-white/10 animate-in fade-in slide-in-from-top-4">
          <h3 className="text-xl font-bold mb-4">New Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category Name</label>
                <input 
                  type="text" 
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:border-primary outline-none"
                  placeholder="e.g. Data Science"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Short Description</label>
                <input 
                  type="text" 
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:border-primary outline-none"
                  placeholder="e.g. ML, Data Eng, AI"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category Banner/Doodle</label>
              <div className="flex items-center gap-4">
                {newCatBanner ? (
                  <img src={newCatBanner} alt="Preview" className="w-24 h-24 object-contain bg-white/5 rounded-xl border border-white/10" />
                ) : (
                  <div className="w-24 h-24 rounded-xl bg-white/5 border border-white/10 border-dashed flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-foreground/30" />
                  </div>
                )}
                <div>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm font-medium disabled:opacity-50"
                  >
                    {isUploading ? "Uploading..." : "Upload Image"}
                  </button>
                  <p className="text-xs text-foreground/50 mt-2">Upload a transparent doodle PNG</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={() => setIsAdding(false)} className="px-5 py-2 rounded-xl border border-white/10 hover:bg-white/5">Cancel</button>
            <button onClick={handleSaveCategory} className="px-5 py-2 rounded-xl bg-primary text-white hover:bg-primary-dark">Save Category</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(category => (
          <div key={category.id} className="relative group p-6 rounded-3xl glass border border-white/10 hover:border-primary/30 transition-all flex flex-col items-center text-center">
            
            <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 bg-white/10 rounded-full hover:bg-white/20" title="Edit"><Edit3 className="w-4 h-4 text-primary" /></button>
              <button onClick={() => handleDelete(category.id)} className="p-2 bg-white/10 rounded-full hover:bg-red-500/20" title="Delete"><Trash2 className="w-4 h-4 text-red-500" /></button>
            </div>

            <img src={category.banner_url} alt={category.name} className="w-32 h-32 object-contain mb-4" />
            <h3 className="text-xl font-bold mb-1">{category.name}</h3>
            <p className="text-sm text-foreground/60 mb-6 line-clamp-2 min-h-[40px]">{category.description}</p>
            
            <Link 
              href={`/admininternship/${category.slug}`}
              className="w-full mt-auto py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center gap-2 text-sm font-semibold transition-colors group-hover:text-primary group-hover:border-primary/30"
            >
              Manage Internships <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
