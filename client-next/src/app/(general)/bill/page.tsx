"use client";

import { DataList, Search } from "@/components";
import Button from "@/components/button-cmp/Button";
import { Table } from "./components/Table";
import Filters from "./components/Filters";
import { Bill } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import { fetchGetAll } from "@/app/lib/fetching";
// import { viewModeType } from '@/components/datalist-cmp/constants';
// import { Table, Filters } from './components';
// import { useMovements } from '@/hooks';
// import { useEffect, useState } from 'react';
// import { FilterDate } from './components/FilterDate';
// import {Button} from '@/components'

export default function History() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [filters, setFilters] = useState<Bill[]>([]);

  const handleFilters = (query: string) => {
    const filtered = bills.filter((client) =>
      client.idUser.toLowerCase().includes(query.toLowerCase())
    );
    setFilters(filtered);
  };

  const getBills = async () => {
    const data: Bill[] = await fetchGetAll("bills");
    setBills(data);
  };

  useEffect(() => {
    getBills();
  }, []);
  //   const { movements, getAllMovements } = useMovements();
  //   const [searchQuery, setSearchQuery] = useState('');
  //   const [filterType, setFilterType] = useState('');
  //   const [filteredMovements, setFilteredMovements] = useState([]);
  //   const [startDate, setStartDate] = useState(new Date('01/01/2023'));
  //   const [endDate, setEndDate] = useState(new Date());

  //   useEffect(() => {
  //     getAllMovements();
  //   }, []);

  //   useEffect(() => {
  //     const descriptionFiltered = movements.filter(movement =>
  //       movement.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
  //     );

  //     const typeFiltered = filterType
  //       ? descriptionFiltered.filter(movement => movement.tipo === filterType)
  //       : descriptionFiltered;

  //     const dateFiltered = typeFiltered.filter(movement => {
  //       const movementDate = new Date(movement.fecha_asiento);
  //       return movementDate >= startDate && movementDate <= endDate;
  //     });

  //     setFilteredMovements(dateFiltered);
  //   }, [searchQuery, movements, filterType, startDate, endDate]);

  //   const handleSearch = query => {
  //     setSearchQuery(query);
  //   };

  //   const handleFilterType = selectedType => {
  //     setFilterType(selectedType);
  //   };

  //   const handleDateChange = (start, end) => {
  //       setStartDate(start);
  //       setEndDate(end);
  //   };

  return (
    <div className='w-full px-5 mt-10'>
      <DataList
        title='Facturas'
        //   setViewMode={viewModeType.TABLE}
        element={<Table data={filters} />}
      >
        <div>
          <Button
            className='w-full btn btn-primary my-5'
            //   onClick={() =>
            //     openModal(<FormProduct />, {
            //       title: 'Nuevo Disfraz',
            //       className: 'modal-product',
            //     })
            //   }
          >
            <h1>Generar Reporte</h1>
          </Button>
          <DataList.Header>
            <Search
              onNewValue={handleFilters}
              placeholder='Buscar Facturas' /* onNewValue={handleSearch} */
            />
          </DataList.Header>
          <DataList.Filters>
            <div className=''>
              <Filters />
              {/* <Filters onFilterType={handleFilterType}>
                <FilterDate onDateChange={handleDateChange} />
              </Filters> */}
            </div>
          </DataList.Filters>
        </div>
      </DataList>
    </div>
  );
}
