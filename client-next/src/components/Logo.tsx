import { LogoIcon } from "@/assets/svg";

interface Props {
  className?: string;
}

export default function Logo({ className }: Props) {
  return (
    <>
      <LogoIcon className={`w-32 h-32 ${className}`} />
    </>
  );
}
