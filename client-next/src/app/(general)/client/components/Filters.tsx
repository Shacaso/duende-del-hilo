// import { useEffect } from "react";
// import { useCategories, useBrands, useProviders } from "@/hooks";

import { useCategory } from "@/hook/useCategory";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
} from "react";

interface Props {
  // filters: Object;
  setFilters: Dispatch<SetStateAction<{ active: string }>>;
  onPageChange: Dispatch<
    SetStateAction<{
      currentPage: number;
      rowsPerPage: number;
      totalPage: number;
    }>
  >;
}

export function Filters({ setFilters, onPageChange }: Props) {
  const handleFilterChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const { value, name } = e.target;

      if (!value) return;

      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      onPageChange((prev) => ({ ...prev, currentPage: 1 }));
    },
    [onPageChange, setFilters]
  );

  return (
    <div className='flex flex-col gap-3 my-5 sm:flex-row'>
      <select
        className='w-full h-12 text-sm lg:text-[12px] min-[1150px]:text-base bg-base-200 input input-bordered'
        name='active'
        onChange={handleFilterChange}
      >
        <option value='active'>Seleccionar lista negra</option>
        <option value='disabled'>Lista negra</option>
      </select>
    </div>
  );
}
