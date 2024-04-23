import { Category, Costume } from "@/app/lib/definitions";
import { fetchGetAll, fetchPatch, fetchPost } from "@/app/lib/fetching";
import ConfirmationModal from "@/components/modal-cmp/ConfirmationModal";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { z, ZodError } from "zod";
import FormCategory from "./category/FormCategory";
import { useCategory } from "@/hook/useCategory";
import { useCostume } from "@/hook/useCostume";

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
        className='flex flex-col gap-5 w-full h-full p-5'
        onSubmit={handleSubmit}
      >
        {touched.name && errors.name && <p>{errors.name}</p>}
        <input
          className='w-full input input-bordered h-full'
          placeholder='name'
          type='text'
          name='name'
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {touched.price && errors.price && <p>{errors.price}</p>}
        <input
          className='w-full input input-bordered h-full'
          placeholder='price'
          type='number'
          name='price'
          value={values.price}
          onBlur={handleBlur}
          onChange={handleChange}
        />

        {touched.category && errors.category && <p>{errors.category}</p>}
        <div className='flex gap-5 items-center justify-center'>
          <div className='flex-1'>
            <label>
              <input
                list='categories'
                name='category'
                className='w-full input input-bordered '
                placeholder='category'
                value={values.category}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </label>
            <datalist id='categories'>
              {categories.map((item) => (
                <option key={item.id} value={item.name}></option>
              ))}
            </datalist>
          </div>
          <button
            type='button'
            onClick={() => setConfirmationModalOpen(!confirmationModalOpen)}
            className='btn h-full btn-primary  btn-xs'
          >
            +
          </button>
        </div>

        {touched.details && errors.details && <p>{errors.details}</p>}
        <input
          className='w-full input input-bordered h-full'
          placeholder='details'
          type='text'
          name='details'
          value={values.details}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <button className='btn btn-primary' type='submit'>
          SAVE!
        </button>
      </form>
      {confirmationModalOpen && (
        <ConfirmationModal
          title='Form Category'
          isOpen={confirmationModalOpen}
          handleClose={() => setConfirmationModalOpen(!confirmationModalOpen)}
        >
          <div className='overflow-auto h-[462px]'>
            <FormCategory />
          </div>
        </ConfirmationModal>
      )}
    </>
  );
}
