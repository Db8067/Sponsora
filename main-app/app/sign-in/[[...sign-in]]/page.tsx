import { SignIn } from "@clerk/nextjs";

export default async function SignInPage(props: { searchParams: Promise<{ redirect_url?: string }> }) {
  const searchParams = await props.searchParams;
  const redirectParams = searchParams.redirect_url ? `?redirect_url=${encodeURIComponent(searchParams.redirect_url)}` : '';
  
  return (
    <div className="min-h-[100dvh] flex items-center justify-center pt-20 pb-10 bg-transparent">
      <SignIn forceRedirectUrl={searchParams.redirect_url || '/'} signUpUrl={`/sign-up${redirectParams}`} />
    </div>
  );
}
