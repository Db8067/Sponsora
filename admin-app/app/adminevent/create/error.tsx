"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Page Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-[#0A0A0B] px-4">
      <div className="max-w-md w-full bg-white dark:bg-[#1C1C1E] rounded-xl shadow-lg border border-red-100 dark:border-red-900/30 p-8 text-center">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Something went wrong!</h2>
        <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg mb-6 text-left overflow-auto max-h-48">
          <p className="text-sm text-red-800 dark:text-red-400 font-mono break-words">
            {error.message || "Unknown error occurred"}
          </p>
        </div>
        <div className="text-gray-500 dark:text-gray-400 mb-8 text-sm space-y-2">
          <p>Please make sure all environment variables (Supabase & Cloudinary) are properly set in your Vercel Dashboard.</p>
          <p className="text-indigo-600 dark:text-indigo-400 font-medium bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded">
            Note: In Vercel, ignore the grey text that says "cloudinary://...". That is just a placeholder example! You must paste your actual individual API Key and Secret into their respective boxes.
          </p>
        </div>
        <button
          onClick={() => reset()}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
