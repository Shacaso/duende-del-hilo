import { Table, FormProduct } from './components';
import React, { useEffect } from 'react';
import { DataList, Container, Search, Paginated, Button } from '@/components';
import { viewModeType } from '@/components/datalist-cmp/constants';
import { PlusIcon } from '@/assets/svg';
import { useProviders, usePaginated, useModal } from '@/hooks';
import './provider-page.scss';

export default function Provider() {
  const { providers, getAllProviders } = useProviders();
  const { openModal } = useModal();
  const { setFiltered, displayed, currentPage, totalPages, setCurrentPage } =
    usePaginated({ data: providers, numItems: 10 });

  useEffect(() => {
    getAllProviders();
  }, []);

  const handleSearch = query => {
    const filtered = providers.filter(({ name }) =>
      name.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(filtered);
  };

  return (
    <div className='provider-page'>
      <Container>
        <DataList
          title='Cliente'
          setViewMode={viewModeType.TABLE}
          element={<Table data={displayed} />}
        >
          <DataList.Header>
            <Search placeholder='Buscar cliente' onNewValue={handleSearch} />
            <Button
              className='gap-3 lg:w-52 btn btn-primary md:w-80'
              onClick={() =>
                openModal(<FormProduct />, {
                  title: 'Nuevo Cliente',
                  className: 'modal-provider',
                })
              }
            >
              <PlusIcon width='15' />
              Nuevo Cliente
            </Button>
          </DataList.Header>
          {/* <DataList.Filters>filters group</DataList.Filters> */}
          <h1 className='mt-10 text-center'>ORDENAR ALFABETICAMENTE POR COLUMNA</h1>

        </DataList>
        {totalPages > 1 && (
          <Paginated
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </Container>
    </div>
  );
}
