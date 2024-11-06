import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vicnasol",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <Head>
      <title>{metadata.title as string}</title>
      </Head>
      <body className={inter.className}>
        <Navbar />
        <div className="min-h-screen bg-green-50">
        {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
