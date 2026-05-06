"use client";

import { Award, Download, FileText, ExternalLink, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function UserCertificatesPage() {
  const certificates = [
    { id: 1, name: "Certificate of Participation", event: "Global AI Hackathon 2026", date: "May 10, 2026", issuer: "Sponsora Verified" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">My Certificates</h1>
        <p className="text-foreground/70 mt-1">Official credentials for your event participation.</p>
      </div>

      {certificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert, i) => (
            <motion.div 
              key={cert.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-6 rounded-3xl border-l-8 border-l-primary group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-white/10 rounded-lg text-foreground/50 hover:text-foreground transition-colors" title="View PDF">
                    <ExternalLink className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg text-foreground/50 hover:text-primary transition-colors" title="Download">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <h3 className="font-bold text-xl text-foreground mb-1">{cert.name}</h3>
              <p className="text-sm text-primary font-medium mb-6">{cert.event}</p>
              
              <div className="flex items-center justify-between text-xs text-foreground/50 border-t border-white/5 pt-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Issued on {cert.date}
                </div>
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-[9px] text-success">
                  {cert.issuer}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="glass p-16 rounded-3xl text-center flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
            <Award className="w-10 h-10 text-foreground/10" />
          </div>
          <h3 className="font-bold text-xl text-foreground mb-2">No Certificates Yet</h3>
          <p className="text-foreground/60 max-w-sm mx-auto">
            Certificates are issued by organizers after events are completed. Keep participating to build your portfolio!
          </p>
        </div>
      )}
    </div>
  );
}
