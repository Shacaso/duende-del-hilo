"use client";

import { DataList } from "@/components";
import Button from "@/components/button-cmp/Button";
import { Table } from "./components/Table";
import Filters from "./components/Filters";
import { type Bill } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import { SearchInputIcon } from "@/assets/svg";
import { useBill } from "@/hook/useBill";

export default function Bill() {
  const { getAllBills, bills } = useBill();

  const [search, setSearch] = useState("");

  const result = !bills
    ? bills
    : bills.filter(
        (bill: Bill) =>
          bill.client.name.toLowerCase().includes(search.toLowerCase()) ||
          bill.client.surname.toLowerCase().includes(search.toLowerCase()) ||
          bill.date.toLowerCase().includes(search.toLowerCase()) ||
          bill.billNumber
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          bill.precioTotal
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          bill.client.dni
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase())
      );
  const handleChange = (e: { target: { value: any } }) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getAllBills();
  });

  return (
    <div className='w-full px-5 mt-10'>
      <DataList title='Facturas' element={<Table data={result} />}>
        <div>
          <Button className='w-full btn btn-warning my-5 btn-disabled'>
            <h1>Generar Reporte</h1>
          </Button>
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
