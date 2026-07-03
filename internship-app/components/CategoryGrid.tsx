"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CategoryGrid({ categories }: { categories: any[] }) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedHref, setSelectedHref] = useState("");
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setSelectedHref(href);
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
    router.push(selectedHref);
  };

  const handleJoin = () => {
    window.open("https://chat.whatsapp.com/ImrwZpwQPENJ1PBR8EBODL", "_blank");
    setShowPopup(false);
    router.push(selectedHref);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3 xl:gap-6 w-full">
        {categories.map((category, index) => (
          <Link
            key={index}
            href={category.href}
            onClick={(e) => handleCardClick(e, category.href)}
            className="group relative flex flex-row items-center md:flex-col md:justify-end w-full h-auto p-4 sm:p-5 md:p-0 md:h-[280px] lg:h-[300px] xl:h-[320px] rounded-2xl md:rounded-[2rem] overflow-hidden glass md:hover:-translate-y-2 active:scale-[0.98] transition-all duration-300 ease-out text-left bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-primary/20 dark:hover:border-white/20 shadow-lg md:shadow-xl hover:shadow-xl md:hover:shadow-primary/20"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 md:absolute md:inset-0 md:w-full md:h-full opacity-100 md:opacity-60 md:group-hover:opacity-100 transition-all duration-500 md:group-hover:scale-110 ease-out bg-cover bg-center rounded-xl md:rounded-none dark:opacity-60 md:opacity-80"
                 style={{ backgroundImage: `url('${category.bgImage}')` }} />
            
            <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20 z-10 transition-opacity duration-300 group-hover:opacity-80" />
            <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 z-10 " />

            <div className="relative z-20 flex-1 md:flex-none md:w-full ml-4 md:ml-0 md:p-6 lg:p-4 xl:p-6 flex flex-col gap-1 md:gap-3">
              <h3 className="text-base sm:text-lg lg:text-lg xl:text-2xl font-bold text-foreground md:text-white transition-colors leading-tight">
                {category.title}
              </h3>
              <p className="hidden md:block text-white/70 text-sm font-medium lg:line-clamp-1 xl:line-clamp-2">
                {category.description}
              </p>
              <div className="hidden md:flex mt-4 w-10 h-10 rounded-full bg-white/10 items-center justify-center backdrop-blur-md border border-white/20 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col items-center text-center border border-primary/20 animate-in zoom-in-95 duration-200">
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-zinc-500" />
            </button>
            
            <img 
              src="/whatsapp-doodle.png" 
              alt="WhatsApp Community Doodle" 
              className="w-48 h-48 object-contain mb-6 drop-shadow-md"
            />
            
            <h3 className="text-2xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#25D366] to-[#128C7E]">
              Join Our Community!
            </h3>
            
            <p className="text-zinc-600 dark:text-zinc-300 mb-8 font-medium text-balance">
              Get daily updates for the best internships and jobs right on your WhatsApp. Don't miss out on your dream career!
            </p>
            
            <button 
              onClick={handleJoin}
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#25D366]/30 flex items-center justify-center gap-2 text-lg active:scale-95"
            >
              Join WhatsApp Community
            </button>
          </div>
        </div>
      )}
    </>
  );
}
