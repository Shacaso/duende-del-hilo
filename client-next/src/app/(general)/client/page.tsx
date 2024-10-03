"use client";

import { PlusIcon } from "@/assets/svg";
import { DataList } from "@/components";
import Button from "@/components/button-cmp/Button";
import { Table } from "./components/Table";
import { useEffect, useMemo, useState } from "react";
import { SearchInputIcon } from "@/assets/svg";
import ConfirmationModal from "@/components/modal-cmp/ConfirmationModal";
import Form from "./components/Form";
import { useClient } from "@/hook/useClient";
import { Client } from "@/app/lib/definitions";
import React from "react";
import { Filters } from "./components/Filters";

export default function ClientPage() {
  const { getAllClients, clients } = useClient();

  const [confirmationModalOpen, setConfirmationModalOpen] =
    useState<boolean>(false);

  const [filters, setFilters] = useState({ active: "active" });
  const [search, setSearch] = useState("");

  const result = useMemo(() => {
    if (!clients) return [];

    const initialClients = clients.filter((client: Client) =>
      filters.active === "active" ? !client.blacklist : client.blacklist
    );

    const normalizedSearch = search.toLowerCase();

    return initialClients.filter((client: Client) =>
      [
        client.name,
        client.surname,
        client.dni.toString(),
        client.departament,
        client.email,
      ].some((field) => field.toLowerCase().includes(normalizedSearch))
    );
  }, [clients, filters.active, search]);

  const handleChange = (e: { target: { value: any } }) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getAllClients();
  });

  return (
    <>
      <div className='w-full px-5 mt-10'>
        <DataList
          title='Cliente'
          // setViewMode={viewModeType.TABLE}
          element={<Table data={result} />}
        >
          <div>
            <DataList.Header>
              <div className='flex gap-5 my-2'>
                <div className='flex-1'>
                  {/* <Search
                  placeholder='Buscar cliente'
                  onNewValue={handleFilters}
                /> */}
                  <div className='flex items-center justify-between p-2 rounded-md  bg-base-200'>
                    <form className='w-full'>
                      <input
                        autoComplete='false'
                        className='w-full flex-grow p-1 outline-none text-secondary bg-base-200 text-md'
                        placeholder='Buscar cliente'
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
                </div>
                <Button
                  className='gap-3 lg:w-52 btn btn-primary md:w-80'
                  onClick={() =>
                    setConfirmationModalOpen(!confirmationModalOpen)
                  }
                >
                  <div className='flex items-center gap-5'>
                    <PlusIcon />
                    Nuevo Cliente
                  </div>
                </Button>
              </div>
            </DataList.Header>
            <DataList.Filters>
              <Filters setFilters={setFilters} />
            </DataList.Filters>
          </div>
        </DataList>
        {/* {totalPages > 1 && (
        <Paginated
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )} */}
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
