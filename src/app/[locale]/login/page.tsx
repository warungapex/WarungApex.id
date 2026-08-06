import { AuthUI } from "@/components/ui/auth-ui";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Warung Apex",
  description: "Sign in or create an account at Warung Apex.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background">
      <AuthUI />
    </main>
  );
}
