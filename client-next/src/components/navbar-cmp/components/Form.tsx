import { Bill, BillDto, Client, Departament } from "@/app/lib/definitions";
import { fetchGetAll, fetchPatch, fetchPost } from "@/app/lib/fetching";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { z, ZodError } from "zod";

interface Props {
	data?: BillDto;
}

export default function Form({ data }: Props) {
	const [clients, setClients] = useState<Client[]>([]);
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
			dniClient: data?.dniClient ?? "",
			note: data?.note ?? "",
			dischargeDate: data?.dischargeDate ?? "",
		},
		validate: (values) => {
			try {
				billSchema.parse(values);
			} catch (error) {
				if (error instanceof ZodError) return error.formErrors.fieldErrors;
			}
		},
		onSubmit: (values) => {
			alert("hola");
			console.log(values);

			if (!data) {
				fetchPost(values, "bills").then((res) => {
					if (res) {
						alert("El cliente se ha guardado");
					}
				});
			} else {
				fetchPatch(data.id, values, "bills").then((res) => {
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

	useEffect(() => {
		getClients();
	}, []);

	return (
		<form
			className="flex flex-col gap-5 w-full h-full p-5"
			onSubmit={handleSubmit}
		>
			{touched.billNumber && errors.billNumber && <p>{errors.billNumber}</p>}
			<input
				className="w-full input input-bordered h-full"
				placeholder="billNumber"
				type="number"
				name="billNumber"
				value={values.billNumber}
				onChange={handleChange}
				onBlur={handleBlur}
				disabled
			/>

			{touched.date && errors.date && <p>{errors.date}</p>}
			<input
				className="w-full input input-bordered h-full"
				placeholder="date"
				type="string"
				name="date"
				value={values.date}
				onBlur={handleBlur}
				onChange={handleChange}
				disabled
			/>

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
				className="w-full input input-bordered h-full"
				placeholder="amount"
				type="number"
				name="amount"
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
					list="users"
					name="dniClient"
					className="w-full input input-bordered "
					placeholder="dniClient"
					value={values.dniClient}
					onBlur={handleBlur}
					onChange={handleChange}
				/>
			</label>
			<datalist id="users">
				{clients.map((item) => (
					<option key={item.dni} value={item.dni}></option>
				))}
			</datalist>

			{touched.note && errors.note && <p>{errors.note}</p>}
			<input
				className="w-full input input-bordered h-full"
				placeholder="note"
				type="text"
				name="note"
				value={values.note}
				onBlur={handleBlur}
				onChange={handleChange}
			/>

			{touched.dischargeDate && errors.dischargeDate && (
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
			/>
			<button className="btn btn-primary" type="submit">
				SAVE!
			</button>
		</form>
	);
}
