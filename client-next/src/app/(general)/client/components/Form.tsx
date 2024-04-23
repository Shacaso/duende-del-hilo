import { Client, Departament } from "@/app/lib/definitions";
import { fetchGetAll, fetchPatch, fetchPost } from "@/app/lib/fetching";
import { InputDataList, Input } from "@/components";
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

  const clientSchema = z.object({
    id: z.string().optional(),
    name: z
      .string({
        invalid_type_error: "El nombre debe ser un string",
        required_error: "El nombre es requerido",
      })
      .min(3),

    surname: z
      .string({
        invalid_type_error: "El apellido debe ser un string",
        required_error: "El apellido es requerido",
      })
      .min(2),

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
      // console.log(values);

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
      className='flex flex-col gap-5 p-5 [&>div]:flex [&>div]:justify-between [&>div]:gap-2'
      onSubmit={handleSubmit}
    >
      <div>
        <Input
          validate={touched.name && errors.name ? true : false}
          title='Nombre'
          placeholder='Ingrese nombre'
          type='text'
          name='name'
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <Input
          validate={touched.surname && errors.surname ? true : false}
          title='Apellido'
          placeholder='Ingrese apellido'
          type='text'
          name='surname'
          value={values.surname}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      <div>
        <Input
          validate={touched.dni && errors.dni ? true : false}
          title='DNI'
          placeholder='Ingrese dni'
          type='number'
          name='dni'
          value={values.dni}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <Input
          validate={touched.phoneNumber && errors.phoneNumber ? true : false}
          title='Numero de celular'
          placeholder='Ingrese numero de celular'
          type='number'
          name='phoneNumber'
          value={values.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      <Input
        validate={touched.direction && errors.direction ? true : false}
        title='Direccion'
        placeholder='Ingrese la direccion'
        type='text'
        name='direction'
        value={values.direction}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <div>
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
          title='Codigo postal'
          placeholder='Ingrese codigo postal'
          type='number'
          name='postalCode'
          value={values.postalCode}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      <Input
        validate={touched.email && errors.email ? true : false}
        title='Correo electronico'
        placeholder='Ingrese correo electronico'
        type='text'
        name='email'
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <button className='btn btn-primary' type='submit'>
        SAVE!
      </button>
    </form>
  );
}
