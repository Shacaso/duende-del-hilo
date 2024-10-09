interface Props {
  title?: string;
  children?: JSX.Element;
  element?: JSX.Element;
}
function DataListFilters({ children }: Props) {
  return <div>{children}</div>;
}

function DataListHeader({ children }: Props) {
  return <div className='datalist-component-header-middle'>{children}</div>;
}

export function DataList({ children, title, element }: Props) {
  return (
    <section className='grid grid-cols-1 auto-rows-auto gap-5 mb-5'>
      <header className='flex flex-col gap-5'>
        <div>
          <h1 className='text-5xl font-semibold text-secondary'>{title}</h1>
        </div>
        {children}
      </header>
      <div>{element}</div>
    </section>
  );
}

DataList.Header = DataListHeader;
DataList.Filters = DataListFilters;
