import { deleteAction } from "@/app/lib/data/funciones";
import { Costume } from "@/app/lib/definitions";
import ConfirmationModal from "@/components/modal-cmp/ConfirmationModal";
import React, { useState } from "react";
import FormNewCostume from "./FormNewCostume";

interface Props {
  data?: Costume;
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
            <span className='font-bold'>Apellido:</span> {data?.price}
          </p>
          <p className='text-xl'>
            <span className='font-bold'>Dni:</span> {data?.category}
          </p>
          <p className='text-xl'>
            <span className='font-bold'>Numero de celular:</span>
            {data?.details}
          </p>
        </div>
        <div className='flex p-5 gap-5 justify-end'>
          <button
            onClick={() => deleteAction(data?.id ?? "", "clients")}
            className='btn btn-primary'
          >
            Delete
          </button>
          <button
            onClick={() => {
              setUpdateModalOpen(!updateModalOpen);
            }}
            className='btn btn-secondary'
          >
            Update
          </button>
        </div>
      </div>
      {updateModalOpen && (
        <ConfirmationModal
          title='UPDATE CLIENT'
          isOpen={updateModalOpen}
          handleClose={() => setUpdateModalOpen(!updateModalOpen)}
        >
          <div className='overflow-auto h-[462px]'>
            <FormNewCostume data={data} />
          </div>
        </ConfirmationModal>
      )}
    </>
  );
}
