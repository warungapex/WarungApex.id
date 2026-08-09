import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "../globals.css";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
const orbitron = Orbitron({ variable: "--font-display", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin — Warung Apex",
  icons: {
    icon: "/logo/white/white warpex no background.svg",
    shortcut: "/logo/white/white warpex.png",
    apple: "/logo/white/white warpex.png",
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${orbitron.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#08080c] text-white">
        {children}
      </body>
    </html>
  );
}
