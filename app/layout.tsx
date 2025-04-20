import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import {Toaster} from "sonner";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Talk2Job",
  description: "An AI-powered platform for preparing for tech interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark hydrated">
      <body className={`${monaSans.className} antialiased pattern`}>
        {children}

          <Toaster />
      </body>
    </html>
  );
}
