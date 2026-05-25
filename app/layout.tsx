import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Velora Voice",
  description: "실시간 음성 AI를 더 빠르고 정확하게 체험하는 Velora Voice 홈페이지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
