/**
 * Mock auth/session helpers used after Clerk authentication was removed.
 * All pages are public; these keep existing call-sites type-safe.
 */

export type MockUser = {
  id: string;
  fullName: string;
  primaryEmailAddress?: { emailAddress: string } | null;
  imageUrl?: string;
};

export const MOCK_USER: MockUser = {
  id: 'guest',
  fullName: 'Guest',
  primaryEmailAddress: { emailAddress: 'guest@example.com' },
};

export function useUser() {
  return { isLoaded: true, isSignedIn: false, user: null as MockUser | null };
}

export function useAuth() {
  return { isLoaded: true, isSignedIn: false, userId: null as string | null };
}

export function useClerk() {
  return {
    openSignIn: (_opts?: Record<string, unknown>) => {},
    openSignUp: (_opts?: Record<string, unknown>) => {},
    signOut: () => {},
  };
}

export function UserButton(props: Record<string, unknown>) {
  return null;
}

export function RedirectToSignIn() {
  return null;
}

export function SignIn() {
  return null;
}

export function SignUp() {
  return null;
}