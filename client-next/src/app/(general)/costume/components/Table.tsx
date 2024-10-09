import { Costume } from "@/app/lib/definitions";
import { PencilAltIcon, TrashIcon, ViewIcon } from "@/assets/svg";
import ConfirmationModal from "@/components/modal-cmp/ConfirmationModal";
import { useCostume } from "@/hook/useCostume";
import { useState } from "react";
import FormNewCostume from "./FormNewCostume";
import View from "./View";
import React from "react";
import Swal from "sweetalert2";
import Button from "@/components/button-cmp/Button";
import { title } from "process";
interface Props {
  data: Costume[];
}

const headers = ["Nombre", "Categoría", "Detalles", "Acciones"];

export function Table({ data }: Props) {
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [viewModalOpen, setViewModalOpen] = useState<boolean>(false);
  const [costume, setCostume] = useState<Costume>();
  const { deleteCostume } = useCostume();

  const handleDelete = (id: string, type: string) => {
    Swal.fire({
      title: `¿Seguro que quieres eliminar este ${type}?`,
      text: "",
      icon: "warning",
      showCancelButton: true,
      focusConfirm: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: "btn btn-primary text-lg",
        cancelButton: "btn bg-slate-200 text-lg",
      },
    }).then((values) => {
      if (values.isConfirmed) {
        Swal.showLoading();
        deleteCostume(id);
      } else {
        Swal.fire({
          title: `El ${type} no fue eliminado`,
          icon: "info",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <>
      {/* {loading ? (
        <TableSkeleton rows={5} headers={headers} />
      ) : ( */}
      <div className='overflow-x-auto'>
        <table className='table table-lg bg-base-200 [&>thead>tr]:text-lg '>
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
            {data.map((costume: Costume) => (
              <tr className='hover:bg-base-300 text-lg' key={costume.id}>
                <td>{costume.name}</td>
                <td>{costume.category.name}</td>
                <td>{costume.details}</td>
                <td className='flex gap-2'>
                  <button
                    className='btn btn-circle btn-ghost '
                    onClick={() => handleDelete(costume.id, "disfraz")}
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
      </div>
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
