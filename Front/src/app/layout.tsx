"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";


const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Vicnasol",
//   description: "Generated by create next app",
// };

const metadata = {
  title: "Vicnasol",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mostrarVentana, setMostrarVentana] = useState(false);

  const toggleVentana = () => {
    setMostrarVentana(!mostrarVentana);
  };
  const pathname = usePathname(); 
  const isPreHome = pathname === "/";

  return (
    <html lang="es">
      <Head>
        <title>{metadata.title as string}</title>
      </Head>
      <body className={inter.className}>
        <UserProvider>
          {/* Muestra Navbar y Footer solo si no estás en la página de bienvenida */}
          {!isPreHome && <Navbar />}
          <div className="min-h-screen bg-green-50">{children}</div>
          <div className=" bg-gray-100 flex justify-center items-center">
        <button
          onClick={toggleVentana}
          className="fixed bottom-5 right-5 bg-green-500 text-white p-2 rounded-full text-xl shadow-lg cursor-pointer hover:bg-green-600 transition"
        >
          <Image src="/images/logoia.webp" alt="Chatbot" width={40} height={40} className=" object-contain rounded-full " />
        </button>

        {/* Ventana Emergente */}
        {mostrarVentana && (
          <div className="fixed z-10 bottom-20 right-5 w-64 h-64 lg:w-96 lg:h-96 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="https://landbot.online/v3/H-2702970-T4MR6WL77PM8Z6WY/index.html"
              className="w-full h-full border-none"
              title="Chatbot"
            ></iframe>
          </div>
        )}
      </div>
          {!isPreHome && <Footer />}
        </UserProvider>
      </body>
    </html>
  );
}
