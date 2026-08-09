"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { X } from "lucide-react";
import Image from "next/image";

export function LocaleSwitcherModal() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("localeSwitcher");

  const [isOpen, setIsOpen] = useState(false);
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  // Local state for the form before saving
  const [selectedLanguage, setSelectedLanguage] = useState(locale);

  const handleSave = () => {
    setIsOpen(false);
    if (selectedLanguage !== locale) {
      router.replace(pathname, { locale: selectedLanguage });
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 hover:bg-white/10 px-3 py-2 rounded-full transition"
      >
        <Image 
          src={locale === "id" ? "https://flagcdn.com/w40/id.png" : "https://flagcdn.com/w40/us.png"} 
          alt={locale === "id" ? "ID Flag" : "US Flag"} 
          width={20}
          height={14}
          className="w-5 h-3.5 rounded-[2px] object-cover shadow-sm" 
        />
        <span className="hidden sm:inline font-semibold text-sm tracking-wide uppercase text-white">
          {locale === "id" ? "ID" : "EN"}
        </span>
      </button>

      {mounted && isOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">{t("title")}</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Region */}
              <div className="flex flex-col gap-2 border-b border-white/10 pb-4">
                <label className="text-sm text-gray-400">{t("region")}</label>
                <div className="flex items-center gap-2 text-white font-medium">
                  <Image 
                    src={selectedLanguage === "id" ? "https://flagcdn.com/w40/id.png" : "https://flagcdn.com/w40/us.png"} 
                    alt={selectedLanguage === "id" ? "ID Flag" : "US Flag"} 
                    width={24}
                    height={16}
                    className="w-6 h-4 rounded-[2px] object-cover shadow-sm" 
                  />
                  <span>{selectedLanguage === "id" ? "Indonesia" : "United States"}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {t("regionNote")}
                </p>
              </div>

              {/* Language */}
              <div className="flex flex-col gap-2 border-b border-white/10 pb-4">
                <label className="text-sm text-gray-400">{t("language")}</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-[#242424] border border-white/10 text-white rounded-lg px-3 py-2.5 outline-none focus:border-brand-cyan transition"
                >
                  <option value="id">Bahasa Indonesia</option>
                  <option value="en">English (US)</option>
                </select>
              </div>

              {/* Currency */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">{t("currency")}</label>
                <select
                  value={selectedLanguage === "id" ? "IDR" : "USD"}
                  disabled
                  className="bg-[#242424] border border-white/10 text-white rounded-lg px-3 py-2.5 outline-none opacity-80 cursor-not-allowed"
                >
                  <option value="IDR">Indonesia Rupiah (IDR)</option>
                  <option value="USD">US Dollar (USD)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white border border-white/20 hover:bg-white/10 transition"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-brand-red hover:bg-red-600 transition"
              >
                {t("save")}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
