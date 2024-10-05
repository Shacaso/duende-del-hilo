import { useCategory } from "@/hook/useCategory";

import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";

interface Props {
  setFilters: Dispatch<
    SetStateAction<{ active: string; start: string; end: string }>
  >;
}

export function Filters({ setFilters }: Props) {
  // const { categories, getAllCategories } = useCategory();

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

    if (!value) return;

    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className='flex flex-col gap-3 my-5 sm:flex-row'>
      <select
        className='w-full h-12 text-sm lg:text-[12px] min-[1150px]:text-base bg-base-200 input input-bordered'
        name='active'
        onChange={handleFilterChange}
      >
        <option value='active'>No devuelto</option>
        <option value='disabled'>Devuelto</option>
      </select>

      <input
        className='w-full h-12 text-sm lg:text-[12px] min-[1150px]:text-base bg-base-200 input input-bordered'
        type='date'
        name='start'
        onChange={handleDateFilterChange}
      />
      <input
        className='w-full h-12 text-sm lg:text-[12px] min-[1150px]:text-base bg-base-200 input input-bordered'
        type='date'
        name='end'
        onChange={handleDateFilterChange}
      />
    </div>
  );
}
