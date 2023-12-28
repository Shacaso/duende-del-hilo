import Link from "next/link";

interface Props {
  title: string;
  description1: string;
  description2: string;
}

export const AccordionItem = ({
  title = "Click to open this one and close others",
  description1,
  description2,
}: Props) => (
  <div className='collapse collapse-arrow bg-base-200 min-w-[26rem] max-w-[45rem]  w-full focus-within:bg-primary focus-within:text-white [&>div>a]:focus-within:text-white'>
    <input type='radio' name='my-accordion-2' />
    <div className='text-xl font-medium collapse-title'>{title}</div>
    <div className='flex items-center justify-between px-8 collapse-content'>
      <div className='flex flex-col'>
        <p>{description1}</p>
        <p>{description2}</p>
      </div>
      {/* <Link className='btn btn-primary btn-sm' href={"/product/addProducts"}>
        Agregar Productos
      </Link> */}
    </div>
  </div>
);
