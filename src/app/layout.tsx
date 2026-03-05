import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Providers } from "@/components/layout/Providers";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "HX AI Hub",
  description: "Holiday Extras internal AI knowledge hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
