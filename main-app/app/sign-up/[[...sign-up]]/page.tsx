import { SignUp } from "@clerk/nextjs";

export default async function SignUpPage(props: { searchParams: Promise<{ redirect_url?: string, role?: string }> }) {
  const searchParams = await props.searchParams;
  const redirectParams = new URLSearchParams();
  if (searchParams.redirect_url) redirectParams.set('redirect_url', searchParams.redirect_url);
  if (searchParams.role) redirectParams.set('role', searchParams.role);
  
  const queryString = redirectParams.toString() ? `?${redirectParams.toString()}` : '';

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center pt-20 pb-10 bg-background gap-4">
      {searchParams.role && (
        <div className="bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-lg text-sm font-medium">
          Signing up as: <span className="capitalize">{searchParams.role}</span>
        </div>
      )}
      <SignUp 
        forceRedirectUrl={searchParams.redirect_url || '/'} 
        signInUrl={`/sign-in${queryString}`}
        unsafeMetadata={searchParams.role ? { role: searchParams.role } : undefined}
      />
    </div>
  );
}
