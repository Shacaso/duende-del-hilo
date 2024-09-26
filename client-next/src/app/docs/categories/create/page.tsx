"use client";
import CreateCategoryDocs from "../components/CreateCategory";

interface Props {
	children: React.ReactNode;
}

export default function IndexCategory({ children }: Props) {
	return <CreateCategoryDocs />;
}
