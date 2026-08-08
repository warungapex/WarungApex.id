import { NeuralLogin } from "@/components/ui/neural-login";
import { getSession } from "@/lib/supabase/auth";
import { redirect } from "next/navigation";

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");

  return <NeuralLogin />;
}
