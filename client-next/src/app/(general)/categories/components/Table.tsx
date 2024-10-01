import { deleteAction } from "@/app/lib/data/funciones";
import type { Category } from "@/app/lib/definitions";
import { TrashIcon, PencilAltIcon } from "@/assets/svg";
import ConfirmationModal from "@/components/modal-cmp/ConfirmationModal";
import { useState } from "react";
import Form from "./Form";
import { useCategory } from "@/hook/useCategory";
import React from "react";
import Swal from "sweetalert2";

interface Props {
  data: Category[];
  type: string;
}

const headers = ["Categoria", "Precio", "Acciones"];

export function Table({ data, type }: Props) {
  const { deleteCategory } = useCategory();
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category>();

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
        deleteCategory(id);
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
        <tbody className='overflow-auto'>
          {data.map((category) => {
            return (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>{category.price}</td>
                <td className='flex gap-2'>
                  <button
                    className='btn btn-circle btn-ghost'
                    onClick={() => handleDelete(category.id, "categoria")}
                  >
                    <TrashIcon />
                  </button>
                  <button
                    className='btn btn-circle btn-ghost'
                    onClick={() => {
                      setCategories(category),
                        setUpdateModalOpen(!updateModalOpen);
                    }}
                  >
                    <PencilAltIcon />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {updateModalOpen && (
        <ConfirmationModal
          title='UPDATE CLIENT'
          isOpen={updateModalOpen}
          handleClose={() => setUpdateModalOpen(!updateModalOpen)}
        >
          <div className='overflow-auto h-[462px]'>
            <Form data={categories} />
          </div>
        </ConfirmationModal>
      )}
    </>
  );
}
