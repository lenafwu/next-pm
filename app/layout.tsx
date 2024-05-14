import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meow Dash",
  description: "Personal management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} className="mx-4 md:mx-8 lg:mx-16 xl:mx-24"`}
      >
        {children}
      </body>
    </html>
  );
}
