"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type StickyFooterProps = React.ComponentProps<"footer">;

export function StickyFooter({ className, ...props }: StickyFooterProps) {
	const t = useTranslations("footer");

	const footerLinkGroups = [
		{
			label: t("group1_label"),
			links: [
				{ title: t("group1_1"), href: "#" },
				{ title: t("group1_2"), href: "#" },
				{ title: t("group1_3"), href: "#" },
			],
		},
		{
			label: t("group2_label"),
			links: [
				{ title: t("group2_1"), href: "#" },
				{ title: t("group2_2"), href: "#" },
			],
		},
	];

	const legalLinks = [
		{ title: t("group3_2"), href: "#" },
		{ title: t("group3_1"), href: "#" },
		{ title: t("group3_4"), href: "#" },
	];

	return (
		<footer
			className={cn("relative h-[600px] sm:h-[520px] md:h-[480px] w-full", className)}
			style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
			{...props}
		>
			<div className="fixed bottom-0 h-[600px] sm:h-[520px] md:h-[480px] w-full">
				<div className="sticky top-[calc(100vh-600px)] sm:top-[calc(100vh-520px)] md:top-[calc(100vh-480px)] h-full">
					{/* Subtle ambient background */}
					<div className="flex size-full items-end justify-center px-4 pb-8 pt-4 md:px-8">
						<AnimatedContainer className="w-full max-w-7xl">
							{/* Card */}
							<div className="rounded-2xl border border-white/[0.07] bg-[#0d0d12]/95 backdrop-blur-xl px-8 pt-10 pb-5 shadow-[0_0_80px_rgba(0,0,0,0.6)]">
								{/* Top: Brand + Nav columns */}
								<div className="flex flex-col gap-10 md:flex-row md:gap-12">
									{/* Brand */}
									<div className="w-full shrink-0 space-y-4 md:max-w-[240px]">
										{/* Logo mark */}
										<div className="flex items-center gap-2.5">
											<div className="flex size-9 shrink-0 items-center justify-center overflow-hidden">
												<Image
													src="/logo/white/white warpex no background.svg"
													alt="Warung Apex"
													width={36}
													height={36}
													className="size-full object-contain"
												/>
											</div>
											<span className="text-[15px] font-semibold tracking-wide text-white">
												Warung Apex
											</span>
										</div>

										{/* Tagline */}
										<p className="text-[13px] leading-relaxed text-white/45">
											{t("brand")}
										</p>

										{/* Social icons — flat, no border */}
										<div className="flex items-center gap-[18px]">
											{socialLinks.map((link) => (
												<a
													key={link.title}
													href={link.href}
													aria-label={link.title}
													className="text-white/40 transition-colors duration-200 hover:text-white"
												>
													<link.icon className="size-[17px]" />
												</a>
											))}
										</div>
									</div>

									{/* Nav columns */}
									<div className="flex flex-1 flex-wrap gap-8 md:justify-end">
										{footerLinkGroups.map((group) => (
											<div key={group.label} className="min-w-[110px]">
												<h3 className="mb-4 text-[13px] font-semibold text-white">
													{group.label}
												</h3>
												<ul className="space-y-[10px]">
													{group.links.map((link) => (
														<li key={link.title}>
															<a
																href={link.href}
																className="text-[13px] text-white/40 transition-colors duration-200 hover:text-white/90"
															>
																{link.title}
															</a>
														</li>
													))}
												</ul>
											</div>
										))}
									</div>
								</div>

								{/* Divider */}
								<div className="my-6 border-t border-white/[0.07]" />

								{/* Bottom bar */}
								<div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
									<p className="text-[12px] text-white/30">
										© 2025 Warung Apex. All rights reserved.
									</p>
									<div className="flex items-center gap-5">
										{legalLinks.map((link) => (
											<a
												key={link.title}
												href={link.href}
												className="text-[12px] text-white/40 underline underline-offset-2 transition-colors duration-200 hover:text-white/80"
											>
												{link.title}
											</a>
										))}
									</div>
								</div>
							</div>
						</AnimatedContainer>
					</div>
				</div>
			</div>
		</footer>
	);
}

// ─── Social Icons (custom SVG) ────────────────────────────────────────────────

const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 24 24" fill="currentColor" {...props}>
		<path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 13.568l-2.95-.924c-.64-.204-.654-.64.135-.954l11.566-4.458c.537-.194 1.006.131.663.989z" />
	</svg>
);

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 24 24" fill="currentColor" {...props}>
		<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
	</svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 24 24" fill="currentColor" {...props}>
		<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
	</svg>
);

const socialLinks = [
	{ title: "Instagram", href: "#", icon: InstagramIcon },
	{ title: "Telegram", href: "#", icon: TelegramIcon },
	{ title: "WhatsApp", href: "#", icon: WhatsAppIcon },
];

// ─── Animated Container ───────────────────────────────────────────────────────

type AnimatedContainerProps = React.ComponentProps<typeof motion.div> & {
	children?: React.ReactNode;
	delay?: number;
};

function useMounted() {
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setMounted(true);
	}, []);
	return mounted;
}

function AnimatedContainer({
	delay = 0.1,
	children,
	...props
}: AnimatedContainerProps) {
	const shouldReduceMotion = useReducedMotion();
	const mounted = useMounted();

	if (!mounted || shouldReduceMotion) {
		return <div {...(props as React.ComponentProps<"div">)}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: "blur(4px)", translateY: 12, opacity: 0 }}
			whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.7, ease: "easeOut" }}
			{...props}
		>
			{children}
		</motion.div>
	);
}