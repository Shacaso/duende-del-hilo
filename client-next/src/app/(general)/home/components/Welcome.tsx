import { CalendarSVG, ClockSVG } from "@/assets/svg";

// const date = new Date();

export function Welcome() {
  return (
    <div className='flex flex-col gap-5 my-5'>
      <h1 className=' tracking-wider text-3xl flex gap-2'>
        <span>Bienvenida</span>
        <span className='font-bold capitalize'>Marcela</span>
      </h1>
    </div>
  );
}
