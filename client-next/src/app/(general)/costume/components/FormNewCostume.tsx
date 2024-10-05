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
import Swal from "sweetalert2";

interface Props {
  data?: Costume;
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
    name: z
      .string({
        invalid_type_error: "El nombre debe ser un string",
        required_error: "El nombre es requerido",
      })
      .min(1, { message: "Tiene que tener por lo menos una letra" }),
    category: z
      .string({ required_error: "La categoría es requerida" })
      .refine((value) => nameCategories.includes(value), {
        message: "No se encuentra la categoría en la base de datos",
      }),
    details: z
      .string({
        invalid_type_error: "Los detalles debe ser un string",
        required_error: "Los detalles son requeridos",
      })
      .min(1, { message: "Tiene que tener por lo menos una letra" }),
  });

  const initialValues = {
    id: data?.id ?? "",
    name: data?.name ?? "",
    category: data?.category.name ?? "",
    details: data?.details ?? "",
  };
  const {
    handleSubmit,
    values,
    handleChange,
    errors,
    touched,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues,
    validate: (values) => {
      try {
        costumeSchema.parse(values);
      } catch (error) {
        if (error instanceof ZodError) return error.formErrors.fieldErrors;
      }
    },
    onSubmit: (values) => {
      // values.category = categories.find(u => u.name === values.category.name)

      // console.log("data submit:", values);

      if (!data) {
        Swal.showLoading();
        createCostume(values);
      } else {
        Swal.showLoading();
        updateCostume(values);
      }
      resetForm();

      // if (category) {
      //   values.category = category;
      //   values.price = category.price;
      // }
      // console.log(values);

      // if (!data) {
      //   // createCostume(values)
      //   fetchPost(values, "costumes").then((res) => {
      //     if (res) {
      //       alert("El disfraz se ha guardado");
      //     }
      //   });
      // } else {
      //   fetchPatch(data.id, values, "costumes").then((res) => {
      //     if (res) {
      //       alert("El disfraz se ha actualizado");
      //     }
      //   });
      // }
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
            errors={errors.name || ""}
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
            title='Categoría'
            placeholder='Buscar categorías'
            type='text'
            name='category'
            value={values.category}
            onBlur={handleBlur}
            onChange={handleChange}
          />

          <Input
            errors={errors.details || ""}
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
        <button className='btn btn-primary text-lg' type='submit'>
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
