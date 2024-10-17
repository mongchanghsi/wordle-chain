import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Root from "@/components/Shared/Root";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Wordle3",
  description: "Wordle on Chain",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Root>{children}</Root>
      </body>
    </html>
  );
};

export default RootLayout;
