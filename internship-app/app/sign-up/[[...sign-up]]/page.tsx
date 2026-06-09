import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center pt-20 pb-10 bg-background">
      <SignUp fallbackRedirectUrl="/subscribe" forceRedirectUrl="/subscribe" />
    </div>
  );
}
