import { deleteAction } from "@/app/lib/data/funciones";
import { Client } from "@/app/lib/definitions";
import ConfirmationModal from "@/components/modal-cmp/ConfirmationModal";
import React, { useState } from "react";
import Form from "./Form";

interface Props {
  data?: Client;
}

export default function View({ data }: Props) {
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className='flex flex-col h-full'>
        <div className='flex-1 flex flex-col gap-3  h-full'>
          {/* <p className='text-lg'>{data?.id}</p> */}
          <p className='text-xl'>
            <span className='font-bold'>Nombre:</span> {data?.name}
          </p>
          <p className='text-xl'>
            <span className='font-bold'>Apellido:</span> {data?.surname}
          </p>
          <p className='text-xl'>
            <span className='font-bold'>DNI:</span> {data?.dni}
          </p>
          <p className='text-xl'>
            <span className='font-bold'>Número de celular 1:</span>{" "}
            {data?.phoneNumber}
          </p>
          <p className='text-xl'>
            <span className='font-bold'>Número de celular 2:</span>{" "}
            {data?.phoneNumberAlt}
          </p>
          <p className='text-xl'>
            <span className='font-bold'>Email:</span> {data?.email}
          </p>
          <p className='text-xl'>
            <span className='font-bold'>Dirección:</span> {data?.direction}
          </p>
          <p className='text-xl'>
            <span className='font-bold'>Departamento:</span> {data?.departament}
          </p>
          <p className='text-xl'>
            <span className='font-bold'>Código postal:</span> {data?.postalCode}
          </p>
          {/* <p className='text-xl'>Lista negra: {data?.blacklist}</p> */}
        </div>
        <div className='grid grid-cols-2 gap-5 '>
          <button
            onClick={() => deleteAction(data?.id ?? "", "clients")}
            className='btn btn-primary  text-lg'
          >
            ELIMINAR
          </button>
          <button
            onClick={() => {
              setUpdateModalOpen(!updateModalOpen);
            }}
            className='btn btn-warning  text-lg'
          >
            ACTUALIZAR
          </button>
        </div>
      </div>
      {updateModalOpen && (
        <ConfirmationModal
          title='ACTUALIZAR CLIENTE'
          isOpen={updateModalOpen}
          handleClose={() => setUpdateModalOpen(!updateModalOpen)}
        >
          <div className='overflow-auto h-[462px]'>
            <Form data={data} />
          </div>
        </ConfirmationModal>
      )}
    </>
  );
}
