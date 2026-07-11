'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const DEFAULT_PHRASES = [
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
  const [phrases, setPhrases] = useState<string[]>(DEFAULT_PHRASES);

  useEffect(() => {
    async function fetchSearchTexts() {
      const { data, error } = await supabase.from('site_settings').select('value').eq('key', 'search_texts').single();
      if (!error && data?.value && Array.isArray(data.value) && data.value.length > 0) {
        setPhrases(data.value);
      }
    }
    fetchSearchTexts();
  }, []);

  useEffect(() => {
    if (phrases.length === 0) return;

    const handleTyping = () => {
      const fullPhrase = phrases[currentPhraseIndex];
      
      if (!isDeleting) {
        // Typing forward
        setCurrentText(fullPhrase.substring(0, currentText.length + 1));
        setTypingSpeed(50); // Increased typing speed
        
        if (currentText === fullPhrase) {
          // Pause before deleting
          setTypingSpeed(1500);
          setIsDeleting(true);
        }
      } else {
        // Deleting backward
        setCurrentText(fullPhrase.substring(0, currentText.length - 1));
        setTypingSpeed(30); // Increased deleting speed
        
        if (currentText === '') {
          // Move to next phrase
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
          setTypingSpeed(300); // Pause before typing new phrase
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, typingSpeed, phrases]);

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
