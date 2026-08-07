import { LoginForm } from "@/components/admin/login-form";
import { getSession } from "@/lib/supabase/auth";
import { redirect } from "next/navigation";

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");

  return (
    <div className="min-h-screen bg-[#08080c] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white tracking-widest">WARUNG APEX</h1>
          <p className="text-gray-500 text-sm mt-2">Admin Panel</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
