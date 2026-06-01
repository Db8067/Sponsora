import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started | Sponsora",
  description: "Choose your path on Sponsora. Discover events, organize your own, ask for sponsorship, or become a sponsor.",
};

export default function GetStartedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
