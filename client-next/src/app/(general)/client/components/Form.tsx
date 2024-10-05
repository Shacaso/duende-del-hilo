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
        invalid_type_error: "El nombre debe ser una cadena de texto",
        required_error: "El nombre es obligatorio",
      })
      .min(1, { message: "El nombre debe tener por lo menos una letra" }),

    surname: z
      .string({
        invalid_type_error: "El apellido debe ser una cadena de texto",
        required_error: "El apellido es obligatorio",
      })
      .min(1, { message: "El apellido debe tener por lo menos una letra" }),

    dni: z
      .number({
        invalid_type_error: "El DNI debe ser un número de 10 dígitos",
        required_error: "El DNI es obligatorio",
      })
      .int()
      .min(10000000, {
        message: "El DNI debe tener al menos 8 dígitos",
      })
      .max(99999999, {
        message: "El DNI no puede tener más de 8 dígitos",
      })

      .refine((value) => data?.dni === value || !dniClients.includes(value), {
        message: "El DNI ya está registrado",
      }),
    phoneNumber: z
      .number({
        invalid_type_error: "El teléfono debe ser un número de 10 dígitos",
        required_error: "El teléfono es obligatorio",
      })
      .int()
      .min(1000000000, {
        message: "El teléfono debe tener al menos 10 dígitos",
      })
      .max(99999999999, {
        message: "El teléfono no debe tener más de 11 dígitos",
      }),
    phoneNumberAlt: z
      .union([
        z
          .number()
          .int()
          .min(1000000000, {
            message: "El teléfono debe tener al menos 10 dígitos",
          })
          .max(99999999999, {
            message: "El teléfono no puede tener más de 11 dígitos",
          }),
        z.string(),
      ])
      .optional(),
    email: z.string().email("Correo electrónico inválido"),

    direction: z
      .string({
        invalid_type_error: "La dirección debe ser una cadena de texto",
        required_error: "La dirección es obligatoria",
      })
      .min(3, { message: "La dirección debe de tener por lo menos 3 letras" }),

    departament: z
      .string()
      .refine((value) => nameDepartaments.includes(value), {
        message: "El departamento no se encuentra en la base de datos",
      }),

    postalCode: z
      .number({
        invalid_type_error: "El código postal debe ser un número de 5 dígitos",
        required_error: "El código postal es obligatorio",
      })
      .int()
      .min(1000, {
        message: "El código postal debe  tener por lo menos 4 digitos",
      })
      .max(99999, {
        message: "El código postal no debe tener  mas de 5 digitos",
      }),

    blacklist: z
      .boolean({
        invalid_type_error: "La lista negra debe ser un valor booleano",
        required_error: "La lista negra es obligatoria",
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
      // console.log(values);

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
      <button className='btn btn-primary col-span-2 text-lg' type='submit'>
        GUARDAR
      </button>
    </form>
  );
}
