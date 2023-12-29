"use client";

import { PlusIcon } from "@/assets/svg";
import { DataList, Search } from "@/components";
import Button from "@/components/button-cmp/Button";
import { Table } from "./components/Table";
import { useEffect, useState } from "react";
import type { User } from "@/app/lib/definitions";
import { getAllClients } from "@/app/lib/data/clients";

export default function ClientPage() {
  const [clients, setClients] = useState<User[]>([]);
  const [filters, setFilters] = useState<User[]>([]);

  const handleFilters = (query: string) => {
    const filtered = clients.filter((client) =>
      client.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilters(filtered);
  };

  const getClients = async () => {
    const data: User[] = await getAllClients();
    setClients(data);
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <div className='w-full px-5 mt-10'>
      <DataList
        title='Cliente'
        // setViewMode={viewModeType.TABLE}
        element={<Table data={filters} />}
      >
        <div>
          <DataList.Header>
            <div className='flex gap-5 my-2'>
              <div className='flex-1'>
                <Search
                  placeholder='Buscar cliente'
                  onNewValue={handleFilters}
                />
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
