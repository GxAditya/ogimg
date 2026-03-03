import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ogimg.in - Create Beautiful Open Graph Images",
  description: "Create open graph images for your website from pre-existing templates. Fill your info and download PNG/JPG.",
  icons: {
    icon: "/ogimg.png",
    shortcut: "/ogimg.png",
    apple: "/ogimg.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/fonts/fonts.css" />
      </head>
      <body className="antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
