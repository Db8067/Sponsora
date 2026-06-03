"use client";

import { motion } from "framer-motion";
import { PlusCircle, Search, Filter, Edit3, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

// Mock internships
const mockInternships = [
  { id: "1", title: "Frontend Engineering Intern", company: "TechCorp", location: "Remote", status: "published" },
];

export default function AdminCategoryInternshipsPage() {
  const { categoryId } = useParams();
  const router = useRouter();
  
  const [internships, setInternships] = useState(mockInternships);
  const [showFilterConfig, setShowFilterConfig] = useState(false);
  
  // Dynamic Filters config for this category
  const [filters, setFilters] = useState([
    { id: "f1", name: "Location Type", type: "select", options: "Remote, Onsite, Hybrid" },
    { id: "f2", name: "Duration", type: "select", options: "1-3 Months, 3+ Months" }
  ]);

  const handleDelete = (id: string) => {
    if(confirm("Delete this internship?")) {
      setInternships(internships.filter(i => i.id !== id));
    }
  };

  return (
    <div className="p-6 md:p-10 w-full mx-auto max-w-7xl flex flex-col min-h-screen">
      
      <button onClick={() => router.back()} className="flex items-center gap-2 text-foreground/60 hover:text-foreground mb-6 w-fit text-sm font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Categories
      </button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground capitalize">{decodeURIComponent(categoryId as string).replace('-', ' ')}</h1>
          <p className="text-foreground/60 mt-1">Manage internships and customize filters for this category.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowFilterConfig(!showFilterConfig)}
            className="flex items-center gap-2 bg-white/10 text-foreground px-5 py-2.5 rounded-full hover:bg-white/20 transition-colors font-medium border border-white/10"
          >
            <Filter className="w-5 h-5" />
            Configure Filters
          </button>
          <Link 
            href={`/admincreateinternship?category=${categoryId}`}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full hover:bg-primary-dark transition-colors font-medium shadow-lg shadow-primary/20"
          >
            <PlusCircle className="w-5 h-5" />
            Add Internship
          </Link>
        </div>
      </div>

      {showFilterConfig && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-8 p-6 rounded-3xl glass border border-primary/30"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Dynamic Filter Configuration</h3>
            <button className="text-sm bg-primary/20 text-primary px-3 py-1.5 rounded-lg font-medium">+ Add New Filter</button>
          </div>
          <p className="text-sm text-foreground/60 mb-6">These filters will appear on the internship listing page for users to filter opportunities.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filters.map(f => (
              <div key={f.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-2 relative group">
                <button className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4"/></button>
                <span className="font-bold">{f.name}</span>
                <span className="text-xs text-foreground/50 uppercase tracking-wider">{f.type}</span>
                <span className="text-sm text-foreground/80 mt-2">Options: {f.options}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Internships Table */}
      <div className="w-full glass rounded-3xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-foreground/70 text-sm font-medium">
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium">Company</th>
                <th className="p-4 font-medium">Location</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {internships.map(internship => (
                <tr key={internship.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-bold">{internship.title}</td>
                  <td className="p-4 text-foreground/80">{internship.company}</td>
                  <td className="p-4 text-foreground/80">{internship.location}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-500">
                      {internship.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admincreateinternship?edit=${internship.id}`} className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-primary transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(internship.id)} className="p-2 bg-white/5 rounded-lg hover:bg-red-500/20 text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {internships.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-foreground/50">
                    No internships found in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
