import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function UnauthorizedPage({ searchParams }: { searchParams: { role?: string, attempted?: string } }) {
  const role = searchParams.role || 'unknown';
  const attempted = searchParams.attempted || 'restricted';

  let title = "Access Restricted";
  let message = "You do not have permission to view this page.";
  let buttonText = "Back to Home";
  let buttonLink = "/";
  let imageSrc = "/images/doodle_participant_denied.png";

  if (role === 'participant') {
    title = "Oops! Wrong Door!";
    message = "Looks like you're exploring the backend! This area is specifically for event creators and sponsors. Let's get you back to discovering awesome events.";
    buttonText = "Back to Discover Events";
    buttonLink = "/events";
    imageSrc = "/images/doodle_participant_denied.png";
  } else if (role === 'organizer') {
    title = "Hey Organizer!";
    message = "This area is restricted to Sponsors only! You can head back to your dashboard to manage your amazing events.";
    buttonText = "Back to My Dashboard";
    buttonLink = "/dashboard/organizer";
    imageSrc = "/images/doodle_organizer_denied.png";
  } else if (role === 'sponsor') {
    title = "Hey Sponsor!";
    message = "This area is for Organizers to manage their events. Let's head back to the Sponsor Catalog to find your next great partnership.";
    buttonText = "Back to Sponsor Dashboard";
    buttonLink = "/dashboard/sponsor";
    imageSrc = "/images/doodle_sponsor_denied.png";
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/30 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 text-center p-8 space-y-6">
        
        <div className="relative w-48 h-48 mx-auto drop-shadow-md">
          <Image 
            src={imageSrc} 
            alt="Access Denied Doodle" 
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">{title}</h1>
          <p className="text-gray-500 font-medium leading-relaxed">
            {message}
          </p>
        </div>

        <div className="pt-4">
          <Link href={buttonLink}>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95">
              {buttonText}
            </button>
          </Link>
        </div>

        <div className="pt-2">
          <Link href="/get-started" className="text-sm text-gray-400 hover:text-indigo-600 font-medium transition-colors">
            Oopsie! Took a wrong turn? Let's teleport you back to your magical portal! ✨🚀
          </Link>
        </div>

      </div>
    </div>
  );
}
