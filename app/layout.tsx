import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 笔友信箱",
  description: "一个温柔复古的 AI 笔友信箱 UI 骨架",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
