import type { Metadata } from "next";
import { AppRouteShell } from "@/components/layout/AppRouteShell";
import { Toaster } from "@/components/ui/sonner";
import { I18nProvider } from "@/src/i18n/I18nProvider";
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
    <html lang="zh-CN" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <I18nProvider>
          <AppRouteShell>{children}</AppRouteShell>
          <Toaster />
        </I18nProvider>
      </body>
    </html>
  );
}
