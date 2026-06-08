"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const loadingMessages = [
    "Establishing secure connection...",
    "Syncing profile data...",
    "Optimizing user experience...",
    "Loading opportunities...",
    "Finding the best internships..."
];

const LoadingScreen = ({ progress = 0 }: { progress?: number }) => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 bg-white dark:bg-[#0a0a0a] z-[9999] flex flex-col items-center justify-center overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50/50 dark:bg-blue-900/10 rounded-full blur-3xl -mr-20 -mb-20" />
            <div className="absolute top-0 left-0 w-72 h-72 bg-purple-50/50 dark:bg-purple-900/10 rounded-full blur-3xl -ml-20 -mt-20" />

            {/* Central Animation */}
            <div className="relative mb-12">
                {/* Spinning Rings */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 rounded-full border-2 border-dashed border-blue-200 dark:border-blue-800"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-32 h-32 rounded-full border-2 border-dashed border-purple-200 dark:border-purple-800 scale-75"
                />

                {/* Center Logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="bg-white dark:bg-black/50 p-2 rounded-2xl shadow-sm z-10 flex items-center justify-center"
                    >
                        <img
                            src="/images/logo-light.png"
                            alt="Logo"
                            className="w-16 h-16 object-contain dark:hidden block"
                        />
                        <img
                            src="/images/logo-dark.png"
                            alt="Logo"
                            className="w-16 h-16 object-contain hidden dark:block"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Text Animations */}
            <div className="h-20 flex flex-col items-center justify-center overflow-hidden relative w-full max-w-md px-4 text-center gap-2">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={messageIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                        className="text-base font-bold text-gray-600 dark:text-gray-400 tracking-tight"
                    >
                        {loadingMessages[messageIndex]}
                    </motion.p>
                </AnimatePresence>

                {/* Progress Optional Display */}
                {progress > 0 && (
                    <motion.span
                        className="text-2xl font-black text-blue-600 dark:text-blue-400 tabular-nums"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        {Math.round(progress)}%
                    </motion.span>
                )}
            </div>

            {/* Progress Bar (Simulated if progress=0) */}
            <div className="mt-6 w-64 h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden relative">
                {progress > 0 ? (
                    <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ type: "spring", stiffness: 50, damping: 15 }}
                    />
                ) : (
                    <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ x: "-100%" }}
                        animate={{ x: "200%" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        style={{ width: "50%" }}
                    />
                )}
            </div>
        </div>
    );
};

export default LoadingScreen;
