import type { Client } from "@/app/lib/definitions";
import {
  TrashIcon,
  PencilAltIcon,
  ViewIcon,
  BlacklistIcon,
  GoodlistIcon,
} from "@/assets/svg";
import ConfirmationModal from "@/components/modal-cmp/ConfirmationModal";
import { useState } from "react";
import Form from "./Form";
import View from "./View";
import { useClient } from "@/hook/useClient";
import Swal from "sweetalert2";
import React from "react";
// import { TableSkeleton } from '@/components';
// import swal from 'sweetalert';

interface Props {
  data: Client[];
}

const headers = [
  "",
  "Nombre completo",
  "Teléfono/s",
  "Mail",
  "Departamento",
  "Acciones",
];

export function Table({ data }: Props) {
  const { blackListClient } = useClient();

  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [viewModalOpen, setViewModalOpen] = useState<boolean>(false);
  const [client, setClient] = useState<Client>();

  // const DNIs = data.map((item) => item.dni);

  // const { loading, deleteProvider } = useProviders();
  // const { openModal } = useModal();

  const handleDelete = (
    { id, dischargeDate = "", blacklist }: Client,
    type: string
  ) => {
    Swal.fire({
      title: `${
        blacklist
          ? `¿Seguro que quieres remover de la lista negra a este ${type}?`
          : `¿Seguro que quieres guardar a este ${type} en la lista negra?`
      }`,

      text: "",
      icon: "warning",
      showCancelButton: true,
      focusConfirm: true,
      confirmButtonText: `${blacklist ? "Remover" : "Lista negra"}`,
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: "btn btn-primary text-lg",
        cancelButton: "btn bg-slate-200 text-lg",
      },
    }).then((values) => {
      if (values.isConfirmed) {
        Swal.showLoading();
        blackListClient({ id, dischargeDate, blacklist });
      } else {
        Swal.fire({
          title: `${
            blacklist
              ? `El ${type} no fue removido de la lista negra`
              : `El ${type} no fue agregado a la lista negra`
          }`,
          icon: "info",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  const fixEmail = (clientEmail: string) => {
    const length = 22;
    if (clientEmail.length > length) {
      return clientEmail.substring(0, length) + "...";
    }
    return clientEmail;
  };

  return (
    <>
      {/* {loading ? (
        <TableSkeleton rows={5} headers={headers} />
      ) : ( */}

      <table className='table table-lg bg-base-200 [&>thead>tr]:text-lg mb-5'>
        <thead>
          <tr className=' border-slate-100 border-b-4 '>
            {headers.map((headerItem: string, index: number) => (
              <th className='text-xl font-bold' key={index}>
                {headerItem}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='overflow-auto [&>tr>td]:text-xl'>
          {data.map((client) => (
            <tr className='hover:bg-base-300 text-lg' key={client.id}>
              <td>
                <div
                  className={`${
                    client.blacklist
                      ? "badge badge-primary"
                      : "badge badge-success"
                  }`}
                ></div>
              </td>
              <td>
                <p>
                  <span className='font-bold'>{client.surname}</span>,{" "}
                  {client.name}
                </p>
              </td>

              <td className='flex flex-col gap-1'>
                <p className='font-bold'>{client.phoneNumber}</p>
                <p>{client.phoneNumberAlt}</p>
              </td>
              {/* <td></td> */}
              <td>{fixEmail(client.email)}</td>
              <td>{client.departament}</td>
              <td className='flex gap-2'>
                <button
                  className='btn btn-circle btn-ghost'
                  onClick={() => handleDelete(client, "cliente")}
                >
                  {!client.blacklist ? <BlacklistIcon /> : <GoodlistIcon />}
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

      {updateModalOpen && (
        <ConfirmationModal
          title='ACTUALIZAR CLIENTE'
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
          title='DETALLE CLIENTE'
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
