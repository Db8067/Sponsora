import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center pt-20 pb-10 bg-background">
      <SignIn forceRedirectUrl="/sync-user" signUpUrl="/sign-up" />
    </div>
  );
}
