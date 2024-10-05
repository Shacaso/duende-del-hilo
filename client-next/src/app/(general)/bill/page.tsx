"use client";

import { DataList } from "@/components";
import Button from "@/components/button-cmp/Button";
import { Table } from "./components/Table";

import { useEffect, useState } from "react";
import { SearchInputIcon } from "@/assets/svg";
import { useBill } from "@/hook/useBill";
import { Filters } from "./components/Filters";
import { type Bill } from "@/app/lib/definitions";

export default function Bill() {
  const [filters, setFilters] = useState({
    active: "active",
    start: "",
    end: "",
  });

  const { getAllBills, bills } = useBill();

  const [search, setSearch] = useState("");

  const initial = bills.filter((bill) =>
    filters.active === "active" ? bill.returned === false : bill.returned
  );

  // TODO filter for date $start and $end
  // const parseDate = (dateStr: string) => {
  //   const [month, day, year] = dateStr.split("/").map(Number);
  //   return new Date(year, month - 1, day); // El mes en Date empieza en 0 (enero)
  // };

  // const filterByDateRange = (data: Bill[]) => {
  //   const start = filters.start ? new Date(filters.start) : null;
  //   const end = filters.end ? new Date(filters.end) : null;

  //   return data.filter((item) => {
  //     const itemDate = parseDate(item.date);

  //     return (!start || itemDate >= start) && (!end || itemDate <= end);
  //   });
  // };

  // if (filters.end !== "" || filters.start !== "") {
  //   filterByDateRange(initial);
  // }
  const result = !bills
    ? initial
    : initial.filter((bill: Bill) => {
        const billsFiltered =
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
            .includes(search.toLowerCase());

        return billsFiltered;
      });
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
            data={result}
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
    </div>
  );
}
