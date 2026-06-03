"use client";

import { motion } from "framer-motion";

export default function AdminCreateInternshipPage() {
  return (
    <div className="p-6 md:p-10 w-full mx-auto max-w-4xl flex flex-col min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Create New Internship</h1>
        <p className="text-foreground/60 mt-1">Fill out the details to post a new internship opportunity.</p>
      </div>

      <div className="w-full p-8 glass rounded-3xl border border-white/5 flex flex-col gap-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Internship Form Builder</h2>
          <p className="text-foreground/60">
            The advanced internship creation workflow is currently under development.
            It will feature a step-by-step form similar to the Event Builder!
          </p>
        </div>
      </div>
    </div>
  );
}
