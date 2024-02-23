import type { Metadata } from "next";
import Navbar from "@/components/navbar-cmp/Navbar";
import logo from "../../../public/favicon.svg";

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <div className='flex h-screen overflow-auto'>
      <Navbar />
      {children}
    </div>
  );
}
