import { InfoIcon } from "@/assets/svg";
import Link from "next/link";

interface Props {
  title?: string;
  stat?: number;
  loading?: boolean;
  Icon?: Element;
  url?: string;
}

export function Stat({
  title = "",
  stat = 0,
  loading = false,
  Icon = InfoIcon,
  url = "#",
}: Props) {
  return (
    <Link href={url} className='box-border bock flex-2'>
      <div className='flex [&>div]:flex-1 items-center pl-[3rem] relative '>
        <div className='absolute left-[0px] bg-accent rounded-3xl w-[5rem] h-[5rem] p-[1.2rem] flex items-center justify-center'>
          <Icon className='[&>path]:fill-accent-content w-full h-full' />
        </div>
        <div className='min-w-[303px] bg-base-200 rounded-3xl pr-[3rem] pl-[3rem] h-28 w-full flex flex-col items-center justify-center'>
          <div className='font-bold stat-title text-secundary'>{title}</div>
          {/* <div className='stat-value text-primary'>
            {loading ? <Preload /> : stat}
          </div> */}
        </div>
      </div>
    </Link>
  );
}
