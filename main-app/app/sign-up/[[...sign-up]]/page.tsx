import { SignUp } from "@clerk/nextjs";

export default function SignUpPage({ searchParams }: { searchParams: { redirect_url?: string } }) {
  const redirectParams = searchParams.redirect_url ? `?redirect_url=${encodeURIComponent(searchParams.redirect_url)}` : '';

  return (
    <div className="min-h-[100dvh] flex items-center justify-center pt-20 pb-10 bg-background">
      <SignUp forceRedirectUrl={searchParams.redirect_url || '/'} signInUrl={`/sign-in${redirectParams}`} />
    </div>
  );
}
