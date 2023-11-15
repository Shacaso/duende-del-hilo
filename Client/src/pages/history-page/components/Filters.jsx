import PropTypes from 'prop-types';

export function Filters({ onFilterType, children }) {
  const handleTypeChange = e => {
    const selectedType = e.target.value;
    onFilterType(selectedType);
  };

  return (
    <div className='flex flex-col flex-1 gap-3 px-2 py-3 shadow lg:px-0 sm:flex-row bg-base-200 sm:bg-inherit sm:rounded-none rounded-box'>
      <select
        className='w-full h-10 text-sm lg:text-[12px] min-[1150px]:text-base bg-base-200 input input-bordered'
        onChange={handleTypeChange}
      >
        <option value=''>Filtrar por devuelto</option>
        <option value='ENTRADA'>Devueltos</option>
        <option value='SALIDA'>Pendientes</option>
      </select>
      <select
        className='w-full h-10 text-sm lg:text-[12px] min-[1150px]:text-base bg-base-200 input input-bordered'
        onChange={handleTypeChange}
      >
        <option value=''>Filtrar por monto</option>
        <option value='ENTRADA'>{'$0 - $5000'}</option>
        <option value='SALIDA'>{'$5000 - $10000'}</option>
        <option value='SALIDA'>{'$10000 - +'}</option>
      </select>

      <div>{children}</div>
    </div>
  );
}

Filters.propTypes = {
  children: PropTypes.node,
  onFilterType: PropTypes.func,
};
