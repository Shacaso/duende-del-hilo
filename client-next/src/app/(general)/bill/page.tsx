"use client";

import { DataList } from "@/components";
import { Table } from "./components/Table";

import { SearchInputIcon } from "@/assets/svg";
import { Paginated } from "@/components/ui/component/Paginated";
import { useBill } from "@/hook/useBill";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Filters } from "./components/Filters";

export default function Bill() {
  const [filters, setFilters] = useState({
    active: "active",
    start: "",
    end: "",
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 5,
    totalPage: 0,
  });

  const { getAllBills, bills } = useBill();

  const [search, setSearch] = useState("");

  // const parseDate = (item: Bill) => {
  //   const [yearRetirementDate, monthRetirementDate, dayRetirementDate] =
  //     item.retirementDate.split("-").map(Number);

  //   const [yearReturnedDate, monthReturnedDate, dayReturnedDate] =
  //     item.returnedDate.split("-").map(Number);

  //   return [
  //     new Date(yearRetirementDate, monthRetirementDate - 1, dayRetirementDate),
  //     new Date(yearReturnedDate, monthReturnedDate - 1, dayReturnedDate),
  //   ];
  // };

  // const filterByDateRange = (bill: Bill) => {
  //   const start = filters.start ? new Date(filters.start) : null;
  //   const end = filters.end ? new Date(filters.end) : null;

  //   const [retirementDate, returnedDate] = parseDate(bill);

  //   return (!start || retirementDate >= start) && (!end || returnedDate <= end);
  // };

  const filteredBills = useMemo(() => {
    if (!bills) return [];

    const filtered = bills
      .filter((bill) => {
        switch (filters.active) {
          case "active":
            return !bill.returned;
          case "disabled":
            return bill.returned;
          case "filed":
            return bill.returned;
          default:
            return true;
        }
      })
      .filter((bill) =>
        [
          bill.client.name,
          bill.client.surname,
          bill.date,
          bill.billNumber.toString(),
          bill.precioTotal.toString(),
          bill.client.dni.toString(),
        ].some((field) => field.toLowerCase().includes(search.toLowerCase()))
      );
    // .filter((bill) => filterByDateRange(bill));

    setPagination((prev) => ({
      ...prev,
      totalPage: Math.ceil(filtered.length / pagination.rowsPerPage),
    }));
    const startIndex = (pagination.currentPage - 1) * pagination.rowsPerPage;
    const paginated = filtered.slice(
      startIndex,
      startIndex + pagination.rowsPerPage
    );
    // console.log(paginated);

    return paginated;
  }, [
    bills,
    filters.active,
    pagination.currentPage,
    pagination.rowsPerPage,
    search,
  ]);

  const handleChange = useCallback((e: { target: { value: any } }) => {
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    setSearch(e.target.value);
  }, []);

  useEffect(() => {
    getAllBills();
  });

  return (
    <div className='w-full px-5 mt-10'>
      <DataList
        title='Facturas'
        element={
          <Table
            data={filteredBills}
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
            </div>
          </DataList.Filters>
        </div>
      </DataList>
      <div className='flex m-5 justify-end '>
        <Paginated
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPage}
          onPageChange={setPagination}
        />
      </div>
    </div>
  );
}
