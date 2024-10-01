// import { useEffect } from "react";
// import { useCategories, useBrands, useProviders } from "@/hooks";

import { useCategory } from "@/hook/useCategory";

import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";

interface Props {
  // filters: Object;
  setFilters: Dispatch<SetStateAction<{ category: string; active: string }>>;
}

export function Filters({ setFilters }: Props) {
  const { categories, getAllCategories } = useCategory();

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;

    if (!value) return;

    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  return (
    <div className='flex flex-col gap-3 my-5 sm:flex-row'>
      {/* <select
        className='w-full h-10 text-sm lg:text-[12px] min-[1150px]:text-base bg-base-200 input input-bordered'
        name='marca'
        // value={filters.marca}
        // onChange={handleFilterChange}
      >
        <option value='all'>Filtrar por Marca</option>
        {brands.map(brands => (
          <option key={brands.id} value={brands.name}>
            {brands.name}
          </option>
        ))}
      </select> */}
      <select
        className='w-full h-10 text-sm lg:text-[12px] min-[1150px]:text-base bg-base-200 input input-bordered'
        name='category'
        // value={filters.categoria}
        onChange={handleFilterChange}
      >
        <option value='all'>Mostrar todos los disfraces</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <select
        className='w-full h-10 text-sm lg:text-[12px] min-[1150px]:text-base bg-base-200 input input-bordered'
        name='active'
        onChange={handleFilterChange}
      >
        <option value='active'>Activados</option>
        <option value='disabled'>Desactivados</option>
      </select>
      {/* <select
        className='w-full h-10 text-sm lg:text-[12px] min-[1150px]:text-base bg-base-200 input input-bordered'
        name='proveedor'
        // value={filters.proveedor}
        // onChange={handleFilterChange}
      >
        <option value='all'>Filtrar por Proveedor</option>
        {providers.map(providers => (
          <option key={providers.id} value={providers.name}>
            {providers.name}
          </option>
        ))}
      </select> */}
    </div>
  );
}
