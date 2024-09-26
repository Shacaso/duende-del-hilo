"use client";
import { NavDocs } from "./components/NavDocs";
import { SectionContainer } from "./components/SectionContainer";

interface Props {
	children: React.ReactNode;
}

export default function Dashboard({ children }: Props) {
	return (
		<html>
			<body className="w-screen h-full flex flex-row">
				<NavDocs />
				<SectionContainer>{children}</SectionContainer>

				<aside className="bg-yellow-300 h-full basis-1/5">Aside</aside>
			</body>
			<footer className="bg-blue-400">Footer</footer>
		</html>
	);
}
