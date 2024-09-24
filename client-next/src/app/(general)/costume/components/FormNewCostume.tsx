import { Category, Costume, CostumeDTO } from "@/app/lib/definitions";
import { fetchGetAll, fetchPatch, fetchPost } from "@/app/lib/fetching";
import ConfirmationModal from "@/components/modal-cmp/ConfirmationModal";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { z, ZodError } from "zod";
import FormCategory from "./category/FormCategory";
import { useCategory } from "@/hook/useCategory";
import { useCostume } from "@/hook/useCostume";
import Form from "../../categories/components/Form";
import { Input, InputDataList } from "@/components";

interface Props {
  data?: CostumeDTO;
}

export default function FormNewCostume({ data }: Props) {
  const [confirmationModalOpen, setConfirmationModalOpen] =
    useState<boolean>(false);
  const { getAllCategories, categories } = useCategory();
  const { createCostume, updateCostume, created, updated } = useCostume();
  const nameCategories = categories.map((category) => category.name);

  useEffect(() => {
    getAllCategories();
  });

  const costumeSchema = z.object({
    name: z.string({
      invalid_type_error: "El nombre debe ser un string",
      required_error: "El nombre es requerido",
    }),

    price: z.coerce
      .number({
        invalid_type_error: "El precio debe ser un numero mayor que 0",
        required_error: "El precio es requerido",
      })
      .positive({
        message: "El precio debe ser mayor que 0",
      }),

    category: z.string().refine((value) => nameCategories.includes(value), {
      message: "No se encuenta la categoria en la base de datos",
    }),

    details: z.string({
      invalid_type_error: "Los detalles debe ser un string",
      required_error: "Los detalles son requeridos",
    }),

    dischargeDate: z.string().default(""),
  });

  const initialValues = {
    id: data?.id ?? "",
    name: data?.name ?? "",
    price: data?.price ?? 0,
    category: data?.category ?? "",
    details: data?.details ?? "",
  };
  const { handleSubmit, values, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues,
      validate: (values) => {
        // try {
        //   costumeSchema.parse(values);
        // } catch (error) {
        //   if (error instanceof ZodError) return error.formErrors.fieldErrors;
        // }
      },
      onSubmit: (values) => {
        // if (category) {
        //   values.category = category;
        //   values.price = category.price;
        // }
        // console.log(values);

        if (!data) {
          // createCostume(values)
          fetchPost(values, "costumes").then((res) => {
            if (res) {
              alert("El disfraz se ha guardado");
            }
          });
        } else {
          fetchPatch(data.id, values, "costumes").then((res) => {
            if (res) {
              alert("El disfraz se ha actualizado");
            }
          });
        }
      },
    });

  return (
    <>
      <form
        className='flex flex-col gap-5 w-full h-full justify-between p-5'
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col gap-5 w-full'>
          <Input
            placeholder='Ingrese disfraz'
            validate={touched.name && errors.name ? true : false}
            title='Nombre del disfraz'
            type='text'
            name='name'
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <InputDataList
            data={categories}
            list='categories'
            validate={touched.category && errors.category ? true : false}
            title='Categoria'
            placeholder='Buscar categorias'
            type='text'
            name='category'
            value={values.category}
            onBlur={handleBlur}
            onChange={handleChange}
          />

          <Input
            placeholder='Ingrese detalles'
            validate={touched.details && errors.details ? true : false}
            title='Detalles'
            type='text'
            name='details'
            value={values.details}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
        <button className='btn btn-primary' type='submit'>
          GUARDAR
        </button>
      </form>
      {confirmationModalOpen && (
        <ConfirmationModal
          title='CREAR CATEGORIA'
          isOpen={confirmationModalOpen}
          handleClose={() => setConfirmationModalOpen(!confirmationModalOpen)}
        >
          <div className='overflow-auto h-[462px]'>
            <Form />
          </div>
        </ConfirmationModal>
      )}
    </>
  );
}
