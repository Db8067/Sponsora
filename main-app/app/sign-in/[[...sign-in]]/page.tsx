import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center pt-24 pb-10 px-4">
      <SignIn fallbackRedirectUrl="/" signUpUrl="/sign-up" />
    </div>
  );
}
