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

const headers = ["Categoría", "Precio", "Acciones"];

export function Table({ data, type }: Props) {
  const { deleteCategory } = useCategory();
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category>();

  const handleDelete = (id: string, type: string) => {
    Swal.fire({
      title: `¿Seguro que quieres eliminar esta ${type}?`,
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
        deleteCategory(id);
      } else {
        Swal.fire({
          title: `La ${type} no fue eliminada`,
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
        <table className='table  table-lg bg-base-200 [&>thead>tr]:text-lg '>
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
            {data.map((category) => (
              <tr className='hover:bg-base-300 text-lg' key={category.id}>
                <td>{category.name}</td>
                <td>{category.price}</td>
                <td className='flex gap-2'>
                  <button
                    className='btn btn-circle btn-ghost'
                    onClick={() => handleDelete(category.id, "categoría")}
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
            ))}
          </tbody>
        </table>
      </div>
      {updateModalOpen && (
        <ConfirmationModal
          title='ACTUALIZAR CATEGORÍA'
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
