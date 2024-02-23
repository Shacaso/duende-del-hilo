import { Costume } from "@/app/lib/definitions";
import { fetchPatch, fetchPost } from "@/app/lib/fetching";
import { useFormik } from "formik";
import React, { useState } from "react";
import { z, ZodError } from "zod";

interface Props {
  data?: Costume;
}

export default function Form({ data }: Props) {
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

    category: z.string(),
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
      price: data?.price ?? undefined,
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
      <input
        className='w-full input input-bordered h-full'
        placeholder='category'
        type='text'
        name='category'
        value={values.category}
        onBlur={handleBlur}
        onChange={handleChange}
      />

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
  );
}
