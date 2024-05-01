import Navbar from "@/components/navbar-cmp/Navbar";

interface Props {
	children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
	return (
		<div className="flex h-screen overflow-auto">
			<Navbar />
			{children}
		</div>
	);
}
