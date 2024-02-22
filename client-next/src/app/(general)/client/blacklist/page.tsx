"use client";

import { PlusIcon } from "@/assets/svg";
import { DataList, Search } from "@/components";
import Button from "@/components/button-cmp/Button";
import { Table } from "./components/Table";
import { useEffect, useState } from "react";
import { Client } from "@/app/lib/definitions";
import { SearchInputIcon } from "@/assets/svg";
import { fetchGetAllActives, fetchGetAllBlacklist } from "@/app/lib/fetching";
import { deleteAction } from "@/app/lib/data/funciones";
import { clientsPath } from "@/app/lib/data/paths";

export default function ClientBlacklistPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");

  const result = !clients
    ? clients
    : clients.filter((client) =>
        client.name.toLowerCase().includes(search.toLowerCase())
      );

  const handleChange = (e: { target: { value: any } }) => {
    setSearch(e.target.value);
  };

  const getClients = async () => {
    const data: Client[] = await fetchGetAllBlacklist();
    setClients(data);
  };

  const deleteClient = (id: string) => {
    deleteAction(id, "clients")
  }

  useEffect(() => {
    getClients();
  }, []);

  return (
    <div className='w-full px-5 mt-10'>
        <div>Hola</div>
      <DataList
        title='Cliente'
        // setViewMode={viewModeType.TABLE}
        element={<Table data={result} deleteClient={deleteClient}/>}
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
                // onClick={() =>
                //   openModal(<FormProduct />, {
                //     title: "Nuevo Cliente",
                //     className: "modal-provider",
                //   })
                // }
              >
                <div className='flex items-center gap-5'>
                  <PlusIcon />
                  Nuevo Cliente
                </div>
              </Button>
            </div>
          </DataList.Header>
          {/* <DataList.Filters>
            <h1>filters group</h1>
          </DataList.Filters> */}
          <h1 className='mt-10 text-center'>
            ORDENAR ALFABETICAMENTE POR COLUMNA
          </h1>
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
  );
}
