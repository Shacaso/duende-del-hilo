export default function Filters() {
  return (
    <div className='flex flex-col gap-3 my-5 sm:flex-row'>
      <select
        className='w-full h-10 text-sm lg:text-[12px] min-[1150px]:text-base bg-base-200 input input-bordered'
        name='marca'
        // value={filters.marca}
        // onChange={handleFilterChange}
      >
        <option value='all'>Filtrar por devuleto</option>
        {/* {brands.map(brands => (
        <option key={brands.id} value={brands.name}>
          {brands.name}
        </option>
      ))} */}
      </select>
      <select
        className='w-full h-10 text-sm lg:text-[12px] min-[1150px]:text-base bg-base-200 input input-bordered'
        name='categoria'
        // value={filters.categoria}
        // onChange={handleFilterChange}
      >
        <option value='all'>Filtrar por monto</option>
        {/* {categories.map(category => (
        <option key={category.id} value={category.name}>
          {category.name}
        </option>
      ))} */}
      </select>
      <input
        className='w-full h-10 text-sm lg:text-[12px] min-[1150px]:text-base bg-base-200 input input-bordered'
        type='date'
      />
      <input
        className='w-full h-10 text-sm lg:text-[12px] min-[1150px]:text-base bg-base-200 input input-bordered'
        type='date'
      />
    </div>
  );
}
