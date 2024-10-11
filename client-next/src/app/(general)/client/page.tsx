"use client";

import { PlusIcon } from "@/assets/svg";
import { DataList } from "@/components";
import Button from "@/components/button-cmp/Button";
import { Table } from "./components/Table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SearchInputIcon } from "@/assets/svg";
import ConfirmationModal from "@/components/modal-cmp/ConfirmationModal";
import Form from "./components/Form";
import { useClient } from "@/hook/useClient";
import { Client } from "@/app/lib/definitions";
import React from "react";
import { Filters } from "./components/Filters";
import { Paginated } from "@/components/ui/component/Paginated";

export default function ClientPage() {
  const { getAllClients, clients } = useClient();

  const [confirmationModalOpen, setConfirmationModalOpen] =
    useState<boolean>(false);

  const [filters, setFilters] = useState({ active: "active" });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 5,
    totalPage: 0,
  });
  const [search, setSearch] = useState("");

  const filterdClients = useMemo(() => {
    if (!clients) return [];
    // console.log("clients", clients);

    const filtered = clients
      .filter((client: Client) =>
        filters.active === "active" ? !client.blacklist : client.blacklist
      )
      .filter((client: Client) =>
        [
          client.name,
          client.surname,
          client.dni.toString(),
          client.departament,
          client.email,
        ].some((field) => field.toLowerCase().includes(search.toLowerCase()))
      );

    // console.log(filtered);
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
    clients,
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
    getAllClients();
  });

  return (
    <>
      <div className='w-full px-5 mt-10'>
        <DataList
          title='Cliente'
          // setViewMode={viewModeType.TABLE}
          element={<Table data={filterdClients} />}
        >
          <div>
            <DataList.Header>
              <div className='  grid grid-cols-[1fr_288px]  gap-5 my-2'>
                <form className=' flex items-center justify-between p-2 rounded-md  bg-base-200'>
                  <input
                    autoComplete='false'
                    className='w-full flex-grow p-1 outline-none text-secondary bg-base-200 text-md'
                    placeholder='Buscar cliente'
                    type='text'
                    name='search'
                    value={search}
                    onChange={handleChange}
                  />
                  <span>
                    <SearchInputIcon className='w-6 h-6 cursor-pointer [&>path]:hover:stroke-primary-focus ' />
                  </span>
                </form>

                <Button
                  className='gap-3 w-72 btn btn-primary '
                  onClick={() =>
                    setConfirmationModalOpen(!confirmationModalOpen)
                  }
                >
                  <div className='flex items-center gap-5 text-lg'>
                    <PlusIcon />
                    Nuevo Cliente
                  </div>
                </Button>
              </div>
            </DataList.Header>
            <DataList.Filters>
              <Filters setFilters={setFilters} onPageChange={setPagination} />
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
      {confirmationModalOpen && (
        <ConfirmationModal
          title='CREAR CLIENTE'
          isOpen={confirmationModalOpen}
          handleClose={() => setConfirmationModalOpen(!confirmationModalOpen)}
        >
          <div className='overflow-auto h-[462px]'>
            <Form />
          </div>
        </ConfirmationModal>
      )}
    </>
  );
}
