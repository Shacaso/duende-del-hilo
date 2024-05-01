import type { Client } from "@/app/lib/definitions";
import { TrashIcon, PencilAltIcon, ViewIcon } from "@/assets/svg";
import ConfirmationModal from "@/components/modal-cmp/ConfirmationModal";
import { useState } from "react";
import Form from "./Form";
import View from "./View";
import { useClient } from "@/hook/useClient";
// import { TableSkeleton } from '@/components';
// import swal from 'sweetalert';

interface Props {
  data: Client[];
}

const headers = [
  "Nombre",
  "Apellido",
  "DNI",
  "Telefono",
  "Mail",
  // 'Direccion',
  "Departamento",
  // 'Codigo postal',
  "Acciones",
];

export function Table({ data }: Props) {
  const { deleteClient } = useClient();

  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [viewModalOpen, setViewModalOpen] = useState<boolean>(false);
  const [client, setClient] = useState<Client>();

  // const DNIs = data.map((item) => item.dni);

  // const { loading, deleteProvider } = useProviders();
  // const { openModal } = useModal();

  // const deleteProviderAlert = (id: number) => {
  //   swal({
  //     title: "Desea eliminar el proveedor",
  //     icon: "warning",
  //     buttons: {
  //       catch: {
  //         text: "Cancelar",
  //         value: null,
  //         className: "btn btn-accent",
  //       },
  //       default: {
  //         text: "Eliminar",
  //         value: true,
  //         className: "btn btn-primary",
  //       },
  //     },
  //   }).then((valueButtoms) => {
  //     if (valueButtoms) {
  //       deleteProvider(id);
  //       swal({
  //         title: "El proveedor fue eliminado",
  //         icon: "success",
  //       });
  //     }
  //   });
  // };

  return (
    <>
      {/* {loading ? (
        <TableSkeleton rows={5} headers={headers} />
      ) : ( */}
      <div className='overflow-x-auto '>
        <table className='table  table-lg bg-base-200 [&>thead>tr]:text-lg my-5'>
          <thead>
            <tr>
              {headers.map((headerItem: string, index: number) => (
                <th key={index}>{headerItem}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((client) => (
              <tr className='hover:bg-base-300' key={client.id}>
                <td>{client.name}</td>
                <td>{client.surname}</td>
                <td>{client.dni}</td>
                <td>{client.phoneNumber}</td>
                <td>{client.email}</td>
                <td>{client.departament}</td>
                <td className='flex gap-2'>
                  <button
                    className='btn btn-circle btn-ghost'
                    onClick={() => deleteClient(client.id)}
                  >
                    <TrashIcon />
                  </button>
                  <button
                    className='btn btn-circle btn-ghost'
                    onClick={() => {
                      setClient(client), setUpdateModalOpen(!updateModalOpen);
                    }}
                  >
                    <PencilAltIcon />
                  </button>
                  <button
                    className='btn btn-circle btn-ghost'
                    onClick={() => {
                      setClient(client), setViewModalOpen(!viewModalOpen);
                    }}
                  >
                    <ViewIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {updateModalOpen && (
        <ConfirmationModal
          title='UPDATE CLIENT'
          isOpen={updateModalOpen}
          handleClose={() => setUpdateModalOpen(!updateModalOpen)}
        >
          <div className='overflow-auto h-[462px]'>
            <Form data={client} />
          </div>
        </ConfirmationModal>
      )}
      {viewModalOpen && (
        <ConfirmationModal
          title='VIEW CLIENT'
          isOpen={viewModalOpen}
          handleClose={() => setViewModalOpen(!viewModalOpen)}
        >
          <div className='overflow-auto h-[462px]'>
            <View data={client} />
          </div>
        </ConfirmationModal>
      )}
    </>
  );
}
