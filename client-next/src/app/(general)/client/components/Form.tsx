import { Client } from "@/app/lib/definitions";
import { fetchPatch, fetchPost } from "@/app/lib/fetching";
import { useFormik } from "formik";
import React, { useState } from "react";
import { z, ZodError } from "zod";

interface Props {
  data?: Client;
}

export default function Form({ data }: Props) {
  const clientSchema = z.object({
    name: z.string({
      invalid_type_error: "El nombre debe ser un string",
      required_error: "El nombre es requerido",
    }),

    surname: z.string({
      invalid_type_error: "El apellido debe ser un string",
      required_error: "El apellido es requerido",
    }),

    dni: z
      .number({
        invalid_type_error: "El dni debe ser un numero de 10 digitos",
        required_error: "El dni es requerido",
      })
      .int()
      .min(1000000)
      .max(99999999),
    phoneNumber: z
      .number({
        invalid_type_error: "El telefono debe ser un numero de 10 digitos",
        required_error: "El telefono es requerido",
      })
      .int()
      .min(1000000000)
      .max(9999999999),

    email: z.string().email("Email inválido"),

    direction: z.string({
      invalid_type_error: "La direccion debe ser un string",
      required_error: "La direccion es requerido",
    }),

    postalCode: z
      .number({
        invalid_type_error: "El codigo postal debe ser un numero de 10 digitos",
        required_error: "El codigo postal es requerido",
      })
      .int()
      .min(1000)
      .max(99999),

    blacklist: z
      .boolean({
        invalid_type_error: "El blacklist debe ser un boolean",
        required_error: "El blacklist es requerido",
      })
      .default(false),
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
      surname: data?.surname ?? "",
      dni: data?.dni ?? undefined,
      phoneNumber: data?.phoneNumber ?? undefined,
      email: data?.email ?? "",
      direction: data?.address ?? "",
      departament: data?.departament ?? "",
      postalCode: data?.postalCode ?? undefined,
      blacklist: data?.blacklist ?? false,
    },
    validate: (values) => {
      try {
        clientSchema.parse(values);
      } catch (error) {
        if (error instanceof ZodError) return error.formErrors.fieldErrors;
      }
    },
    onSubmit: (values) => {
      if (!data) {
        fetchPost(values, "clients").then((res) => {
          if (res) {
            alert("El cliente se ha guardado");
          }
        });
      } else {
        fetchPatch(data.id, values, "clients").then((res) => {
          if (res) {
            alert("El cliente se ha actualizado");
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

      {touched.surname && errors.surname && <p>{errors.surname}</p>}
      <input
        className='w-full input input-bordered h-full'
        placeholder='surname'
        type='text'
        name='surname'
        value={values.surname}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      {touched.dni && errors.dni && <p>{errors.dni}</p>}
      <input
        className='w-full input input-bordered h-full'
        placeholder='dni'
        type='number'
        name='dni'
        value={values.dni}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      {touched.phoneNumber && errors.phoneNumber && <p>{errors.phoneNumber}</p>}
      <input
        className='w-full input input-bordered h-full'
        placeholder='phoneNumber'
        type='number'
        name='phoneNumber'
        value={values.phoneNumber}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      {touched.direction && errors.direction && <p>{errors.direction}</p>}
      <input
        className='w-full input input-bordered h-full'
        placeholder='direction'
        type='text'
        name='direction'
        value={values.direction}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      {touched.departament && errors.departament && <p>{errors.departament}</p>}
      <input
        className='w-full input input-bordered h-full'
        placeholder='departament'
        type='text'
        name='departament'
        value={values.departament}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      {touched.postalCode && errors.postalCode && <p>{errors.postalCode}</p>}
      <input
        className='w-full input input-bordered h-full'
        placeholder='postalCode'
        type='number'
        name='postalCode'
        value={values.postalCode}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      {touched.email && errors.email && <p>{errors.email}</p>}
      <input
        className='w-full input input-bordered h-full'
        placeholder='email'
        type='email'
        name='email'
        value={values.email}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <button className='btn btn-primary' type='submit'>
        SAVE!
      </button>
    </form>
  );
}
