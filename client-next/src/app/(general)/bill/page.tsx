"use client";

import { DataList } from "@/components";
import Button from "@/components/button-cmp/Button";
import { Table } from "./components/Table";

import { useEffect, useState } from "react";
import { SearchInputIcon } from "@/assets/svg";
import { useBill } from "@/hook/useBill";
import { Filters } from "./components/Filters";
import { type Bill } from "@/app/lib/definitions";
import { Paginated } from "@/components/ui/component/Paginated";

export default function Bill() {
  const [filters, setFilters] = useState({
    active: "active",
    start: "",
    end: "",
  });

  const { getAllBills, bills } = useBill();

  const [search, setSearch] = useState("");

  // Helper para parsear las fechas
  const parseDate = (item: Bill) => {
    const [yearRetirementDate, monthRetirementDate, dayRetirementDate] =
      item.retirementDate.split("-").map(Number);

    const [yearReturnedDate, monthReturnedDate, dayReturnedDate] =
      item.returnedDate.split("-").map(Number);

    return [
      new Date(yearRetirementDate, monthRetirementDate - 1, dayRetirementDate),
      new Date(yearReturnedDate, monthReturnedDate - 1, dayReturnedDate),
    ];
  };

  // Filtro por estado
  const filterByState = (bill: Bill) => {
    switch (filters.active) {
      case "active":
        return !bill.returned;
      case "disabled":
        return bill.returned;
      case "filed":
        return bill.returned;
      default:
        return true; // Sin filtro si no hay estado activo
    }
  };

  // Filtro por rango de fechas
  const filterByDateRange = (bill: Bill) => {
    const start = filters.start ? new Date(filters.start) : null;
    const end = filters.end ? new Date(filters.end) : null;

    const [retirementDate, returnedDate] = parseDate(bill);

    return (!start || retirementDate >= start) && (!end || returnedDate <= end);
  };

  const [currentPage, setCurrentPage] = useState(0);
  // Filtro por búsqueda de texto
  const filterBySearch = (bill: Bill) => {
    const searchLower = search.toLowerCase();
    return (
      bill.client.name.toLowerCase().includes(searchLower) ||
      bill.client.surname.toLowerCase().includes(searchLower) ||
      bill.date.toLowerCase().includes(searchLower) ||
      bill.billNumber.toString().toLowerCase().includes(searchLower) ||
      bill.precioTotal.toString().toLowerCase().includes(searchLower) ||
      bill.client.dni.toString().toLowerCase().includes(searchLower)
    );
  };

  // Aplicación de todos los filtros
  const filteredBills = bills.filter((bill: Bill) => {
    return (
      filterByState(bill) && filterByDateRange(bill) && filterBySearch(bill)
    );
  });

  // console.log(filters);
  // console.log(filters.start);
  // console.log(filters.end);

  const handleChange = (e: { target: { value: any } }) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getAllBills();
  });

  return (
    <div className='w-full px-5 mt-10'>
      <DataList
        title='Facturas'
        element={
          <Table
            data={filteredBills.splice(currentPage * 5, 5)}
            showTotal={filters.start !== "" && filters.end !== ""}
          />
        }
      >
        <div>
          {/* <Button className='w-full btn btn-warning my-5 btn-disabled'>
            <h1>Generar Reporte</h1>
          </Button> */}
          <DataList.Header>
            <div className='flex items-center justify-between p-2 rounded-md  bg-base-200'>
              <form className='w-full'>
                <input
                  autoComplete='false'
                  className='w-full flex-grow p-1 outline-none text-secondary bg-base-200 text-md'
                  placeholder='Buscar factura'
                  type='text'
                  name='search'
                  value={search}
                  onChange={handleChange}
                />
              </form>
              <span>
                <SearchInputIcon className='w-6 h-6 cursor-pointer [&>path]:hover:stroke-primary-focus ' />
              </span>
            </div>
          </DataList.Header>
          <DataList.Filters>
            <div className=''>
              <Filters setFilters={setFilters} />
              {/* <Filters onFilterType={handleFilterType}>
                <FilterDate onDateChange={handleDateChange} />
              </Filters> */}
            </div>
          </DataList.Filters>
        </div>
      </DataList>
      <div className='flex m-5 justify-end '>
        <Paginated
          currentPage={currentPage}
          totalPages={Math.floor(bills.length / 5)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
