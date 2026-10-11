import { SignIn } from '@clerk/nextjs';
import ClerkAuthWrapper from '@/components/ClerkAuthWrapper';
import Snowfall from '@/components/Snowfall';

export default function SignInPage() {
  return (
    <div className="min-h-[100dvh] relative overflow-hidden flex items-center justify-center pt-20 pb-10 px-4 bg-slate-900/5 dark:bg-slate-950">
      <Snowfall />
      <div className="relative z-10 w-full flex justify-center">
        <ClerkAuthWrapper mode="sign-in">
          <SignIn routing="path" path="/sign-in" fallbackRedirectUrl="/" signUpUrl="/sign-up" />
        </ClerkAuthWrapper>
      </div>
    </div>
  );
}
