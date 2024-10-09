import { useCategory } from "@/hook/useCategory";

import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";

interface Props {
  setFilters: Dispatch<
    SetStateAction<{ active: string; start: string; end: string }>
  >;
}

export function Filters({ setFilters }: Props) {
  // const { categories, getAllCategories } = useCategory();

  const handleEmptied = () => {
    console.log("it's empty");
  };
  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;

    if (!value) return;

    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    // console.log(value);

    // if (!value) return;

    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className='grid    gap-3 my-5'>
      <div className='grid grid-cols-3 gap-3'>
        <select
          className='w-full h-12   min-[1150px]:text-base bg-base-200 input input-bordered'
          name='asd'
          onChange={handleFilterChange}
        >
          <option value='active'>Fecha de devolución</option>
          <option value='disabled'>Fecha de entrega</option>
          <option value='all'>Emision</option>
          {/* <option value='filed'>Archivados</option> */}
        </select>

        <input
          className='w-full h-12   min-[1150px]:text-base bg-base-200 input input-bordered'
          type='date'
          name='start'
          onChange={handleDateFilterChange}
        />
        <input
          className='w-full h-12   min-[1150px]:text-base bg-base-200 input input-bordered'
          type='date'
          name='end'
          onChange={handleDateFilterChange}
        />
      </div>

      <select
        className='w-full h-12   min-[1150px]:text-base bg-base-200 input input-bordered'
        name='active'
        onChange={handleFilterChange}
      >
        <option value='active'>No devuelto</option>
        <option value='disabled'>Devuelto</option>
        <option value='all'>Todos</option>
        <option value='filed'>Archivados</option>
      </select>
    </div>
  );
}
