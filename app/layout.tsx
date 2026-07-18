import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const assetPath = (path: string) => `${basePath}${path}`;

export const dynamic = "force-static";

export const metadata: Metadata = {
  metadataBase: new URL(`${siteOrigin}${basePath}/`),
  title: "RUN READY | Star Trac 트레드밀 가이드",
  description: "Star Trac 트레드밀을 안전하고 편안하게 시작하기 위한 빠른 안내.",
  icons: { icon: assetPath("/favicon.svg") },
  openGraph: {
    title: "RUN READY | Star Trac 트레드밀 가이드",
    description: "처음에도 자신 있게 시작하는 Star Trac 트레드밀 빠른 안내.",
    images: [{ url: assetPath("/og.png"), width: 1792, height: 896, alt: "RUN READY Star Trac Quick Guide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RUN READY | Star Trac 트레드밀 가이드",
    description: "처음에도 자신 있게 시작하는 Star Trac 트레드밀 빠른 안내.",
    images: [assetPath("/og.png")],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
