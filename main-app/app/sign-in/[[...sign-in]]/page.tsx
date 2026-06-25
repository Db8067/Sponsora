import { SignIn } from "@clerk/nextjs";

export default function SignInPage({ searchParams }: { searchParams: { redirect_url?: string } }) {
  const redirectParams = searchParams.redirect_url ? `?redirect_url=${encodeURIComponent(searchParams.redirect_url)}` : '';
  
  return (
    <div className="min-h-[100dvh] flex items-center justify-center pt-20 pb-10 bg-background">
      <SignIn forceRedirectUrl={`/sync-user${redirectParams}`} signUpUrl={`/sign-up${redirectParams}`} />
    </div>
  );
}
