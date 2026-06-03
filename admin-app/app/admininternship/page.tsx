"use client";

import { motion } from "framer-motion";
import { PlusCircle, Search } from "lucide-react";
import Link from "next/link";

export default function AdminInternshipsPage() {
  return (
    <div className="p-6 md:p-10 w-full mx-auto max-w-7xl flex flex-col min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Internships</h1>
          <p className="text-foreground/60 mt-1">Manage and monitor all internship listings.</p>
        </div>
        <Link 
          href="/admincreateinternship"
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full hover:bg-primary-dark transition-colors font-medium shadow-lg shadow-primary/20"
        >
          <PlusCircle className="w-5 h-5" />
          Create Internship
        </Link>
      </div>

      <div className="w-full py-20 flex flex-col items-center justify-center text-center glass rounded-3xl border border-white/5">
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
          <Search className="w-8 h-8 text-foreground/30" />
        </div>
        <h3 className="text-xl font-bold mb-2">No Internships Yet</h3>
        <p className="text-foreground/60 max-w-sm mb-6">
          You haven't posted any internship opportunities yet. Create your first one to get started!
        </p>
        <Link 
          href="/admincreateinternship"
          className="px-6 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-semibold"
        >
          Create Internship
        </Link>
      </div>
    </div>
  );
}
