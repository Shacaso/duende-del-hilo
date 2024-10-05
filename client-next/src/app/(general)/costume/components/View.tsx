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
            <span className='font-bold'>Disfraz:</span> {data?.name}
          </p>

          <p className='text-xl'>
            <span className='font-bold'>Categoría:</span> {data?.category.name}{" "}
            (${data?.category.price})
          </p>
          <p className='text-xl'>
            <span className='font-bold'>Detalle: </span>
            {data?.details}
          </p>
        </div>
        <div className='grid grid-cols-2 gap-5 '>
          <button
            onClick={() => deleteAction(data?.id ?? "", "clients")}
            className='btn btn-primary text-lg '
          >
            ELIMINAR
          </button>
          <button
            onClick={() => {
              setUpdateModalOpen(!updateModalOpen);
            }}
            className='btn btn-warning text-lg '
          >
            ACTUALIZAR
          </button>
        </div>
      </div>
      {updateModalOpen && (
        <ConfirmationModal
          title='ACTUALIZAR DISFRAZ'
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
