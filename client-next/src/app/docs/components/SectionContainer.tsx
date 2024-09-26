interface Props {
	children: React.ReactNode;
}

export const SectionContainer = ({ children }: Props) => (
	<section className="bg-red-500 h-max w-max basis-3/5">{children}</section>
);
