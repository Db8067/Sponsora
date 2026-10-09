import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center pt-24 pb-10 px-4">
      <SignUp fallbackRedirectUrl="/" signInUrl="/sign-in" />
    </div>
  );
}
