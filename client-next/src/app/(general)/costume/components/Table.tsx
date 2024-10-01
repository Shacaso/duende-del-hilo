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

const headers = ["", "Nombre", "Categoria", "Detalles", "Acciones"];

export function Table({ data }: Props) {
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [viewModalOpen, setViewModalOpen] = useState<boolean>(false);
  const [costume, setCostume] = useState<Costume>();
  const { deleteCostume } = useCostume();

  const handleDelete = (id: string, type: string) => {
    Swal.fire({
      title: `¿ Segura que quiere borrar este ${type} ?`,
      text: "",
      icon: "warning",
      showCancelButton: true,
      focusConfirm: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-warning",
      },
    }).then((values) => {
      if (values.isConfirmed) {
        Swal.showLoading();
        deleteCostume(id);
      } else {
        Swal.fire({
          title: `El ${type} no fue borrado`,
          icon: "info",
          timer: 1500,
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
              <td>
                <div
                  className={`${
                    !costume.dischargeDate
                      ? "badge badge-success"
                      : "badge badge-primary"
                  }`}
                ></div>
              </td>
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
