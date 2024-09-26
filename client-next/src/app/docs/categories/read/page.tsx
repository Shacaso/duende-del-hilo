"use client";
import ReadCategory from "../components/ReadCategory";

interface Props {
	children: React.ReactNode;
}

export default function IndexCategory({ children }: Props) {
	return <ReadCategory />;
}
