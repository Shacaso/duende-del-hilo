import { Category, Costume } from "@/app/lib/definitions";
import { fetchGetAll, fetchPatch, fetchPost } from "@/app/lib/fetching";
import ConfirmationModal from "@/components/modal-cmp/ConfirmationModal";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { z, ZodError } from "zod";
import FormCategory from "./category/FormCategory";
import { useCategory } from "@/hook/useCategory";
import { useCostume } from "@/hook/useCostume";
import Form from "../../categories/components/Form";
import { Input } from "@/components";

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

  const {
    initialValues,
    handleSubmit,
    values,
    handleChange,
    errors,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      id: data?.id ?? "",
      name: data?.name ?? "",
      price: data?.price ?? 0,
      category: data?.category ?? "",
      details: data?.details ?? "",
    },
    validate: (values) => {
      try {
        costumeSchema.parse(values);
      } catch (error) {
        if (error instanceof ZodError) return error.formErrors.fieldErrors;
      }
    },
    onSubmit: (values) => {
      if (!data) {
        createCostume(values);
      } else {
        updateCostume(values);
      }
    },
  });

  return (
    <>
      <form
        className='flex flex-col gap-5 w-full h-full justify-between p-5'
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col gap-5'>
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

          <div className='flex flex-col '>
            <label>Categoria</label>
            <div className='flex gap-5 items-center justify-center'>
              <div className='w-full'>
                <label>
                  <input
                    list='categories'
                    name='category'
                    className={`input input-bordered border w-full ${
                      touched.category &&
                      errors.category &&
                      "border-primary border-2"
                    }`}
                    placeholder='Buscar categorias'
                    value={values.category}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </label>
                <datalist id='categories'>
                  {categories
                    .filter((item) => item.dischargeDate === "")
                    .map((item) => (
                      <option key={item.id} value={item.name}></option>
                    ))}
                </datalist>
              </div>
              <button
                type='button'
                onClick={() => setConfirmationModalOpen(!confirmationModalOpen)}
                className='btn  btn-primary  btn-xs h-full'
              >
                +
              </button>
            </div>
          </div>
          {touched.details && errors.details && <p>{errors.details}</p>}
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
          SAVE!
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
