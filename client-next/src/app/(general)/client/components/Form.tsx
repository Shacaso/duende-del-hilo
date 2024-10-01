import { Client, Departament } from "@/app/lib/definitions";
import { fetchGetAll, fetchPatch, fetchPost } from "@/app/lib/fetching";
import { InputDataList, Input } from "@/components";
import { useClient } from "@/hook/useClient";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
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
    name: z
      .string({
        invalid_type_error: "El nombre debe ser un string",
        required_error: "El nombre es requerido",
      })
      .min(1),

    surname: z
      .string({
        invalid_type_error: "El apellido debe ser un string",
        required_error: "El apellido es requerido",
      })
      .min(1),

    dni: z
      .number({
        invalid_type_error: " El dni debe ser un numero de 10 digitos ",
        required_error: " El dni es requerido ",
      })
      .int()
      .min(1000000)
      .max(99999999)
      .refine((value) => data?.dni === value || !dniClients.includes(value), {
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
    phoneNumberAlt: z
      .number({
        invalid_type_error: "El telefono debe ser un numero de 10 digitos",
      })
      .int()
      .min(1000000000)
      .max(9999999999)
      .optional(),
    email: z.string().email("Email inválido"),

    direction: z
      .string({
        invalid_type_error: "La direccion debe ser un string",
        required_error: "La direccion es requerido",
      })
      .min(3),

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
    handleSubmit,
    values,
    handleChange,
    errors,
    touched,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: {
      blacklist: data?.blacklist ?? false,
      departament: data?.departament ?? "",
      direction: data?.direction ?? "",
      dni: data?.dni ?? 0,
      email: data?.email ?? "",
      id: data?.id ?? "",
      name: data?.name ?? "",
      phoneNumber: data?.phoneNumber ?? 0,
      phoneNumberAlt: data?.phoneNumberAlt ?? 0,
      postalCode: data?.postalCode ?? 0,
      surname: data?.surname ?? "",
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
        Swal.showLoading();
        createClient(values);
      } else {
        Swal.showLoading();
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
    <form className='grid grid-cols-2 gap-5' onSubmit={handleSubmit}>
      <Input
        validate={touched.name && errors.name ? true : false}
        errors={errors.name || ""}
        title='Nombre'
        placeholder='Ingrese nombre'
        type='text'
        name='name'
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        errors={errors.surname || ""}
        validate={touched.surname && errors.surname ? true : false}
        title='Apellido'
        placeholder='Ingrese apellido'
        type='text'
        name='surname'
        value={values.surname}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <div className='col-span-2 grid gap-5'>
        <Input
          validate={touched.dni && errors.dni ? true : false}
          errors={errors.dni || ""}
          title='DNI'
          placeholder='Ingrese DNI'
          type='number'
          name='dni'
          value={values.dni}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Input
          errors={errors.direction || ""}
          validate={touched.direction && errors.direction ? true : false}
          title='Dirección'
          placeholder='Ingrese la dirección'
          type='text'
          name='direction'
          value={values.direction}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      <InputDataList
        data={departaments}
        list='departaments'
        validate={touched.departament && errors.departament ? true : false}
        title='Departamento'
        placeholder='Ingrese departamento'
        type='text'
        name='departament'
        value={values.departament}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <Input
        validate={touched.postalCode && errors.postalCode ? true : false}
        errors={errors.postalCode || ""}
        title='Código postal'
        placeholder='Ingrese código postal'
        type='number'
        name='postalCode'
        value={values.postalCode}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <Input
        validate={touched.phoneNumber && errors.phoneNumber ? true : false}
        errors={errors.phoneNumber || ""}
        title='Número de celular 1'
        placeholder='Ingrese nro de celular'
        type='number'
        name='phoneNumber'
        value={values.phoneNumber}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        validate={
          touched.phoneNumberAlt && errors.phoneNumberAlt ? true : false
        }
        title='Número de celular 2'
        errors={errors.phoneNumberAlt || ""}
        placeholder='Ingrese nro de celular'
        type='number'
        name='phoneNumberAlt'
        value={values.phoneNumberAlt}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <div className='col-span-2'>
        <Input
          validate={touched.email && errors.email ? true : false}
          errors={errors.email || ""}
          title='Correo electrónico'
          placeholder='Ingrese correo electrónico'
          type='text'
          name='email'
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <button className='btn btn-primary col-span-2' type='submit'>
        GUARDAR
      </button>
    </form>
  );
}
