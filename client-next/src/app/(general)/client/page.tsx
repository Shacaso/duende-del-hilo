"use client";

import { PlusIcon } from "@/assets/svg";
import { DataList } from "@/components";
import Button from "@/components/button-cmp/Button";
import { Table } from "./components/Table";
import { useEffect, useState } from "react";
import { SearchInputIcon } from "@/assets/svg";
import ConfirmationModal from "@/components/modal-cmp/ConfirmationModal";
import Form from "./components/Form";
import { useClient } from "@/hook/useClient";
import { Client } from "@/app/lib/definitions";

export default function ClientPage() {
  const { getAllClients, clients } = useClient();
  // const clients: Client[] = useAppSelector((state) => state.clients.clients);

  const [confirmationModalOpen, setConfirmationModalOpen] =
    useState<boolean>(false);

  // const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");

  const initial = clients.filter(
    (client) => client.dischargeDate?.length === 0
  );
  const result = !clients
    ? initial
    : initial.filter(
        (client: Client) =>
          client.name.toLowerCase().includes(search.toLowerCase()) ||
          client.surname.toLowerCase().includes(search.toLowerCase()) ||
          client.dni.toString().toLowerCase().includes(search.toLowerCase()) ||
          client.departament.toLowerCase().includes(search.toLowerCase()) ||
          client.email.toLowerCase().includes(search.toLowerCase())
      );

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
      {confirmationModalOpen && (
        <ConfirmationModal
          title='Formulario de cliente'
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
