'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const SEARCH_PHRASES = [
  "Search for electronics...",
  "Search for fashion & clothing...",
  "Search for home appliances...",
  "Search for books and more...",
  "Search for top brands...",
];

export function TypewriterSearch() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const fullPhrase = SEARCH_PHRASES[currentPhraseIndex];
      
      if (!isDeleting) {
        // Typing forward
        setCurrentText(fullPhrase.substring(0, currentText.length + 1));
        setTypingSpeed(100);
        
        if (currentText === fullPhrase) {
          // Pause before deleting
          setTypingSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        // Deleting backward
        setCurrentText(fullPhrase.substring(0, currentText.length - 1));
        setTypingSpeed(50);
        
        if (currentText === '') {
          // Move to next phrase
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % SEARCH_PHRASES.length);
          setTypingSpeed(500); // Pause before typing new phrase
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, typingSpeed]);

  return (
    <div className="relative w-full">
      <input 
        type="text" 
        placeholder={currentText}
        className="w-full h-10 pl-4 pr-10 rounded-full border border-input bg-muted/50 focus:bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-muted-foreground/70"
      />
      <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
}
