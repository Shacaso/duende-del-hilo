import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar-cmp/Navbar";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Duende del hilo",
  description: "Gestor de negocio de alquiler de departamenteos",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang='en'>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
