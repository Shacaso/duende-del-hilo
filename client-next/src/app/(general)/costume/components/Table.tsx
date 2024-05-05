// import PropTypes from 'prop-types';
import { deleteAction } from "@/app/lib/data/funciones";
import { Costume } from "@/app/lib/definitions";
import { TrashIcon, PencilAltIcon, ViewIcon } from "@/assets/svg";
import ConfirmationModal from "@/components/modal-cmp/ConfirmationModal";
import { useState } from "react";
import FormNewCostume from "./FormNewCostume";
import View from "./View";
import { useCostume } from "@/hook/useCostume";
// import { useProviders, useModal } from '@/hooks';
// import { TableSkeleton } from '@/components';
// import swal from 'sweetalert';
// import { UpdateProvider } from './UpdateProvider';

interface Props {
  data: Costume[];
}

const headers = ["Nombre", "Categoria", "Precio", "Detalles", "Acciones"];

export function Table({ data }: Props) {
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [viewModalOpen, setViewModalOpen] = useState<boolean>(false);
  const [costume, setCostume] = useState<Costume>();
  const { deleteCostume } = useCostume();

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
      <table className='table table-lg bg-base-200 [&>thead>tr]:text-lg '>
        <thead>
          <tr>
            {headers.map((headerItem: string, index: number) => (
              <th key={index}>{headerItem}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((costume: Costume) => (
            <tr key={costume.id}>
              <td>{costume.name}</td>
              <td>{costume.category}</td>
              <td>{costume.price}</td>
              <td>{costume.details}</td>
              <td className='flex gap-2'>
                <button
                  className='btn btn-circle btn-ghost'
                  onClick={() => {
                    window.confirm("¿Seguro que desea eliminar el registro?") &&
                      deleteCostume(costume.id);
                  }}
                >
                  <TrashIcon />
                </button>
                <button
                  className='btn btn-circle btn-ghost'
                  onClick={() => {
                    setCostume(costume), setUpdateModalOpen(!updateModalOpen);
                  }}
                >
                  <PencilAltIcon />
                </button>
                <button
                  className='btn btn-circle btn-ghost'
                  onClick={() => {
                    setCostume(costume), setViewModalOpen(!viewModalOpen);
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
          title='ACTUALIZAR DISFRAZ'
          isOpen={updateModalOpen}
          handleClose={() => setUpdateModalOpen(!updateModalOpen)}
        >
          <div className='overflow-auto h-[462px]'>
            <FormNewCostume data={costume} />
          </div>
        </ConfirmationModal>
      )}
      {viewModalOpen && (
        <ConfirmationModal
          title='VER DISFRAZ'
          isOpen={viewModalOpen}
          handleClose={() => setViewModalOpen(!viewModalOpen)}
        >
          <div className='overflow-auto h-[462px]'>
            <View data={costume} />
          </div>
        </ConfirmationModal>
      )}
    </>
  );
}
