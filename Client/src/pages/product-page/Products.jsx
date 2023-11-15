import React, { useEffect, useState } from 'react';
import { DataList, Container, Search, Paginated, Button } from '@/components';
import { viewModeType } from '@/components/datalist-cmp/constants';
import { PlusIcon } from '@/assets/svg';
import { Table, Grid, Filters, FormProduct } from './components';
import { useProducts, usePaginated, useModal } from '@/hooks';
import './product-page.scss';

export default function Product() {
  const { products, getAllProducts } = useProducts();
  const { openModal } = useModal();
  const { setFiltered, displayed, currentPage, totalPages, setCurrentPage } =
    usePaginated({ data: products, numItems: 9 });



  const [filters, setFilters] = useState({
    marca: 'all',
    categoria: 'all',
    proveedor: 'all',
  });

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product => {
      const marcaMatch =
        filters.marca === 'all' || product.marca.nombre === filters.marca;
      const categoriaMatch =
        filters.categoria === 'all' ||
        product.categoria.nombre === filters.categoria;
      const proveedorMatch =
        filters.proveedor === 'all' ||
        product.proveedor.nombre === filters.proveedor;
      return marcaMatch && categoriaMatch && proveedorMatch;
    });

    setFiltered(filtered);
  }, [products, filters]);

  const handleSearch = query => {
    const filtered = products.filter(product =>
      product.nombre.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(filtered);
  };

  const test = {}

  return (
    <div className='product-page'>
      <Container>
        <DataList
          title='Disfraces'
          setViewMode={viewModeType.TABLE}
          element={<Table data={displayed} />}
          // grid={<Grid data={displayed} />}
        >
          <DataList.Header>
            <Search placeholder='Buscar disfraces' onNewValue={handleSearch} />
            <Button
              className='gap-3 lg:w-52 btn btn-primary md:w-80'
              onClick={() =>
                openModal(<FormProduct />, {
                  title: 'Nuevo Disfraz',
                  className: 'modal-product',
                })
              }
            >
              <PlusIcon width='15' />
              Nuevo Disfraz
            </Button>
          </DataList.Header>
          <DataList.Filters>
            <Filters filters={/*filters*/ test} setFilters={setFilters} />
          </DataList.Filters>
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
