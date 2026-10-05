import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center pt-20 pb-10 bg-transparent gap-6 text-center px-4">
      <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white">
        Authentication is disabled
      </h1>
      <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
        Sign-in and sign-up have been removed from this site. All pages are now publicly
        accessible without an account.
      </p>
      <Link
        href="/"
        className="bg-primary text-white px-8 py-3.5 rounded-xl font-bold text-base hover:bg-primary-dark transition-all shadow-lg shadow-primary/25"
      >
        Back to Homepage
      </Link>
    </div>
  );
}
