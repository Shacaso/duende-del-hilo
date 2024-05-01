import { CalendarSVG, ClockSVG } from "@/assets/svg";

// const date = new Date();

export function Welcome() {
  return (
    <div className='flex flex-col gap-5 my-5 sm:flex-row sm:items-center sm:justify-between'>
      <h1 className='text-lg tracking-wider lg:text-2xl flex gap-2'>
        <span>Bienvenida</span>
        <span className='font-bold capitalize'>Marcela</span>
      </h1>
      <div className='flex flex-col   justify-between  [&>div]:flex [&>div]:items-center [&>div]:gap-2 [&>div>h3]:text-md'>
        {/* <div>
          <CalendarSVG />
          <h3>26/12/2023</h3>
          <h3>{date}</h3>
        </div>
        <div>
          <ClockSVG />
          <h3>
            10:30
            {
              // tiene que actualizarse la hora
              new Date().toLocaleTimeString("es", {
                hour: "2-digit",
                minute: "2-digit",
              })
            }
          </h3>
        </div> */}
      </div>
    </div>
  );
}
