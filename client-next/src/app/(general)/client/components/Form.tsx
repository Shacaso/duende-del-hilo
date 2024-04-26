import { Client, Departament } from "@/app/lib/definitions";
import { fetchGetAll, fetchPatch, fetchPost } from "@/app/lib/fetching";
import { useClient } from "@/hook/useClient";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { z, ZodError } from "zod";

interface Props {
  data?: Client;
}

export default function Form({ data }: Props) {
  const [departaments, setDepartaments] = useState<Departament[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const dniClients = clients.map((client) => client.dni);
  const nameDepartaments = departaments.map((departament) => departament.name);
  const { createClient, updateClient } = useClient();

  const clientSchema = z.object({
    id: z.string().optional(),
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
        invalid_type_error: " El dni debe ser un numero de 10 digitos ",
        required_error: " El dni es requerido ",
      })
      .int()
      .min(1000000)
      .max(99999999)
      .refine((value) => !dniClients.includes(value), {
        message: " Dni ya esta registrado ",
      }),
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

    departament: z
      .string()
      .refine((value) => nameDepartaments.includes(value), {
        message: "No se encuenta el departamento en la base de datos",
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
    resetForm,
  } = useFormik({
    initialValues: {
      id: data?.id ?? "",
      name: data?.name ?? "",
      surname: data?.surname ?? "",
      dni: data?.dni ?? 0,
      phoneNumber: data?.phoneNumber ?? 0,
      email: data?.email ?? "",
      direction: data?.direction ?? "",
      departament: data?.departament ?? "",
      postalCode: data?.postalCode ?? 0,
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
        createClient(values);
      } else {
        updateClient(values);
      }
      resetForm();
    },
  });

  const getClients = async () => {
    const data: Client[] = await fetchGetAll("clients");
    setClients(data);
  };

  const getDepartaments = async () => {
    const data: Departament[] = await fetchGetAll("departaments");
    setDepartaments(data);
  };

  useEffect(() => {
    getClients();
    getDepartaments();
  }, []);

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
        placeholder='dni look at me'
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
      <label>
        <input
          list='departaments'
          name='departament'
          className='w-full input input-bordered '
          placeholder='departament'
          value={values.departament}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </label>
      <datalist id='departaments'>
        {departaments.map((item) => (
          <option key={item.id} value={item.name}></option>
        ))}
      </datalist>

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
