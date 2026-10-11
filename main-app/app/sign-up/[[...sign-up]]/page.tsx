import { SignUp } from '@clerk/nextjs';
import ClerkAuthWrapper from '@/components/ClerkAuthWrapper';
import Snowfall from '@/components/Snowfall';

export default function SignUpPage() {
  return (
    <div className="min-h-[100dvh] relative overflow-hidden flex items-center justify-center pt-20 pb-10 px-4 bg-slate-900/5 dark:bg-slate-950">
      <Snowfall />
      <div className="relative z-10 w-full flex justify-center">
        <ClerkAuthWrapper mode="sign-up">
          <SignUp routing="path" path="/sign-up" fallbackRedirectUrl="/" signInUrl="/sign-in" />
        </ClerkAuthWrapper>
      </div>
    </div>
  );
}
