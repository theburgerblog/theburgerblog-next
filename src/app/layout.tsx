import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TheBurgerBlog - Vienna's Best Burgers",
  description: "Exploring the best burger spots in Vienna and beyond",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <NavBar />
        <main className="flex-1 container max-w-screen-xl py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
