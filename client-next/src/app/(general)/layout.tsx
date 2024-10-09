import Navbar from "@/components/navbar-cmp/Navbar";

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <div className=' grid overflow-x-hidden grid-cols-[240px_1fr] h-screen'>
      <Navbar />
      {children}
    </div>
  );
}
