import {
  Bill,
  BillDto,
  Client,
  Costume,
  Departament,
} from "@/app/lib/definitions";
import { fetchGetAll, fetchPatch, fetchPost } from "@/app/lib/fetching";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { z, ZodError } from "zod";

interface Props {
  data?: BillDto;
}

export default function Form({ data }: Props) {
  const [clients, setClients] = useState<Client[]>([]);
  const [costumesList, setCostumes] = useState<Costume[]>([]);
  const [costumeSelected, setCostumeSelected] = useState<string[]>([]);
  const idClients = clients.map((client: Client) => client.dni);

  const billSchema = z.object({
    id: z.string().optional(),

    billNumber: z.number().optional(),

    date: z.string().optional(),

    returned: z
      .boolean({
        invalid_type_error:
          "El valor del atributo devuelto debe ser un booleano",
      })
      .default(false),

    amount: z
      .number({
        invalid_type_error: "El monto debe ser un numero mayor que 0",
        required_error: "El monto  es requerido",
      })
      .positive(),

    dniClient: z.coerce
      .number({
        invalid_type_error: "El dni debe ser un numero mayor que 0",
        required_error: "El dni es requerido",
      })
      .refine((value) => idClients.includes(value), {
        message: "No se encuenta ese id de Usuario en la base de datos",
      }),

    note: z.string({
      invalid_type_error: "La nota debe ser un string",
      required_error: "La nota es requerido",
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
      billNumber: data?.billNumber ?? 0,
      date: data?.date ?? "",
      returned: data?.returned ?? "",
      amount: data?.amount ?? 0,
      costumes: data?.costumes ?? costumeSelected,
      dniClient: data?.dniClient ?? "",
      note: data?.note ?? "",
      dischargeDate: data?.dischargeDate ?? "",
    },
    // validate: (values) => {
    //   try {
    //     billSchema.parse(values);
    //   } catch (error) {
    //     if (error instanceof ZodError) return error.formErrors.fieldErrors;
    //   }
    // },
    onSubmit: (values) => {
      console.log(values);

      // if (!data) {
      //   fetchPost(values, "bills").then((res) => {
      //     if (res) {
      //       alert("La factura se ha guardado");
      //     }
      //   });
      // } else {
      //   fetchPatch(data.id, values, "bills").then((res) => {
      //     if (res) {
      //       alert("La factura se ha actualizado");
      //     }
      //   });
      // }
    },
  });

  const handleChangeData = (e: { target: { value: any } }) => {
    const costume = e.target.value;
    const updateCostume = [...costumeSelected, costume];
    setCostumeSelected(updateCostume);
    console.log(updateCostume);
  };
  const handleDelete = (index: number) => {
    const updateCostume = costumeSelected;
    updateCostume.splice(index, 1);
    setCostumeSelected(updateCostume);
    console.log(updateCostume);
  };

  const getClients = async () => {
    const data: Client[] = await fetchGetAll("clients");
    setClients(data);
  };

  const getCostumes = async () => {
    const data: Costume[] = await fetchGetAll("costumes");
    setCostumes(data);
  };

  useEffect(() => {
    getClients();
    getCostumes();
  }, []);

  return (
    <form
      className='flex flex-col gap-5 w-full h-full p-5'
      onSubmit={handleSubmit}
    >
      <div className='h-52 w-full bg-base-100 flex gap-2 py-2 px-1'>
        {costumeSelected.map((item, index) => (
          <div key={index} className='badge badge-primary gap-2 p-4'>
            {item}
            <svg
              onClick={() => handleDelete(index)}
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='inline-block w-4 h-4 stroke-current'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              ></path>
            </svg>
          </div>
        ))}
      </div>
      {touched.costumes && errors.costumes && <p>{errors.costumes}</p>}
      <label>
        <input
          list='costumes'
          name='costumes'
          className='w-full input input-bordered '
          placeholder='Elegir disfraces'
          value={values.costumes}
          onBlur={handleBlur}
          onChange={handleChangeData}
        />
      </label>
      <datalist id='costumes'>
        {costumesList.map((item) => (
          <option key={item.id} value={item.name}></option>
        ))}
      </datalist>
      {/* {touched.billNumber && errors.billNumber && <p>{errors.billNumber}</p>}
			<input
				className="w-full input input-bordered h-full"
				placeholder="billNumber"
				type="number"
				name="billNumber"
				value={values.billNumber}
				onChange={handleChange}
				onBlur={handleBlur}
				disabled
			/> */}

      {/* {touched.date && errors.date && <p>{errors.date}</p>}
			<input
				className="w-full input input-bordered h-full"
				placeholder="date"
				type="string"
				name="date"
				value={values.date}
				onBlur={handleBlur}
				onChange={handleChange}
				disabled
			/> */}

      {/* {touched.returned && errors.returned && <p>{errors.returned}</p>}
      <input
        className='w-full input input-bordered h-full'
        placeholder='returned look at me'
        type='number'
        name='returned'
        value={values.returned}
        onBlur={handleBlur}
        onChange={handleChange}
      /> */}

      {touched.amount && errors.amount && <p>{errors.amount}</p>}
      <input
        className='w-full input input-bordered h-full'
        placeholder='amount'
        type='number'
        name='amount'
        value={values.amount}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      {/* {touched.idUser && errors.idUser && <p>{errors.idUser}</p>}
      <input
        className='w-full input input-bordered h-full'
        placeholder='idUser'
        type='text'
        name='idUser'
        value={values.idUser}
        onBlur={handleBlur}
        onChange={handleChange}
      /> */}

      {touched.dniClient && errors.dniClient && <p>{errors.dniClient}</p>}
      <label>
        <input
          list='users'
          name='dniClient'
          className='w-full input input-bordered '
          placeholder='dniClient'
          value={values.dniClient}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </label>
      <datalist id='users'>
        {clients.map((item) => (
          <option key={item.dni} value={item.dni}></option>
        ))}
      </datalist>

      {touched.note && errors.note && <p>{errors.note}</p>}
      <input
        className='w-full input input-bordered h-full'
        placeholder='note'
        type='text'
        name='note'
        value={values.note}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      {/* {touched.dischargeDate && errors.dischargeDate && (
				<p>{errors.dischargeDate}</p>
			)}
			<input
				className="w-full input input-bordered h-full"
				placeholder="dischargeDate"
				type="text"
				name="dischargeDate"
				value={values.dischargeDate}
				onBlur={handleBlur}
				onChange={handleChange}
				disabled
			/> */}
      <button className='btn btn-primary' type='submit'>
        SAVE!
      </button>
    </form>
  );
}
