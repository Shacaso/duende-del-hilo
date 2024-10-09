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
import { Paginated } from "@/components/ui/component/Paginated";

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

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getAllClients();
  });

  // console.log(result);
  // console.log(Math.floor(result.length / 5));

  return (
    <>
      <div className='w-full px-5 mt-10'>
        <DataList
          title='Cliente'
          // setViewMode={viewModeType.TABLE}
          element={<Table data={result.splice(currentPage * 5, 5)} />}
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
              <Filters setFilters={setFilters} />
            </DataList.Filters>
          </div>
        </DataList>
        <div className='flex m-5 justify-end '>
          <Paginated
            currentPage={currentPage}
            totalPages={Math.floor(clients.length / 5)}
            onPageChange={setCurrentPage}
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
