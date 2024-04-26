import FormNewCostume from "@/app/(general)/costume/components/FormNewCostume";
import {
	Bill,
	BillDto,
	Client,
	Costume,
	Departament,
} from "@/app/lib/definitions";
import { fetchGetAll, fetchPatch, fetchPost } from "@/app/lib/fetching";
import ConfirmationModal from "@/components/modal-cmp/ConfirmationModal";
import ReactPDF from "@react-pdf/renderer";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { z, ZodError } from "zod";

interface Props {
	data?: BillDto;
}

export default function FormCreateNewBill({ data }: Props) {
	const [clients, setClients] = useState<Client[]>([]);
	const [costumesList, setCostumes] = useState<Costume[]>([]);
	const [costumeSelected, setCostumeSelected] = useState<string[]>([]);
	const idClients = clients.map((client: Client) => client.dni);
	const [confirmationModalOpen, setConfirmationModalOpen] =
		useState<boolean>(false);

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

		amountTotal: z
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
			amountTotal: data?.amountTotal ?? 0,
			costumes: data?.costumes ?? costumeSelected,
			dniClient: data?.dniClient ?? "",
			note: data?.note ?? "",
			dischargeDate: data?.dischargeDate ?? "",
			returnedDate: data?.returnedDate ?? "",
			retirementDate: data?.retirementDate ?? "",
			advancement: data?.advancement ?? 0,
			remainingBalance: data?.remainingBalance ?? 0,
		},
		// validate: (values) => {
		//   try {
		//     billSchema.parse(values);
		//   } catch (error) {
		//     if (error instanceof ZodError) return error.formErrors.fieldErrors;
		//   }
		// },
		onSubmit: (values) => {
			values.dniClient = Number(values.dniClient.toString().split(" ")[0]);
			// console.log(values);

			if (!data) {
				fetchPost(values, "bills").then((res) => {
					if (res) {
						alert("La factura se ha guardado");
					}
				});
			} else {
				fetchPatch(data.id, values, "bills").then((res) => {
					if (res) {
						alert("La factura se ha actualizado");
					}
				});
			}
		},
	});

	const handleChangeData = (e: { target: { value: any } }) => {
		let costume = e.target.value;
		// document.addEventListener("keydown", ({ key }) => {
		//   if (key === "Backspace") {
		//     e.target.value = "";
		//     return;
		//   }
		// });
		costume = costume.split(" ");
		if (costume[1] !== "-") {
			return;
		}
		if (costume[0] !== "") {
			values.costumes.push(costume[0]);
			values.amountTotal += Number(costume[2].substr(1));
			setCostumeSelected(costume[0]);
			e.target.value = "";
		}
	};

	const handleDelete = (index: number, value: string) => {
		const costumeUpdate = values.costumes.splice(index, 1);
		const costume = costumesList.filter(
			(item: Costume) => item.name === value
		)[0];
		values.amountTotal -= costume.price;
		setCostumeSelected(costumeUpdate);
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
		<>
			<form className="flex flex-col gap-5 w-full  p-5" onSubmit={handleSubmit}>
				<label>Listado de disfraces</label>
				<div className="h-52 w-full bg-base-100 flex flex-wrap gap-2 py-2 px-1">
					{values.costumes.map((item, index) => (
						<div key={index} className="badge badge-primary gap-2 p-4">
							{item}
							<svg
								onClick={() => handleDelete(index, item)}
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								className="inline-block w-4 h-4 stroke-current"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								></path>
							</svg>
						</div>
					))}
				</div>

				{touched.costumes && errors.costumes && <p>{errors.costumes}</p>}
				<div className="flex gap-5 items-center justify-center">
					<div className="flex-1">
						<label>
							<input
								list="costumes"
								name="costumes"
								className="w-full input input-bordered "
								placeholder="Elegir disfraces"
								onBlur={handleBlur}
								onChange={handleChangeData}
								// onSelect={() => handleSelect}
							/>
						</label>
						<datalist id="costumes">
							{costumesList.map((item: Costume) => (
								<option
									key={item.id}
									value={`${item.name} - $${item.price}`}
								></option>
							))}
						</datalist>
					</div>
					<button
						type="button"
						onClick={() => setConfirmationModalOpen(!confirmationModalOpen)}
						className="btn h-full btn-primary  btn-xs"
					>
						+
					</button>
				</div>

				{touched.amountTotal && errors.amountTotal && (
					<p>{errors.amountTotal}</p>
				)}
				<label>Precio total</label>
				<input
					className="w-full input input-bordered h-full"
					placeholder="amountTotal"
					type="number"
					name="amountTotal"
					value={values.amountTotal}
					onBlur={handleBlur}
					onChange={handleChange}
				/>

				{touched.advancement && errors.advancement && (
					<p>{errors.advancement}</p>
				)}
				<label>Adelanto</label>
				<input
					className="w-full input input-bordered h-full"
					placeholder="advancement"
					type="number"
					name="advancement"
					value={values.advancement}
					onBlur={handleBlur}
					onChange={handleChange}
				/>

				{touched.dniClient && errors.dniClient && <p>{errors.dniClient}</p>}
				<label>Cliente</label>
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
						<option
							key={item.dni}
							value={`${item.dni} - ${item.name} ${item.surname}`}
						></option>
					))}
				</datalist>

				{touched.note && errors.note && <p>{errors.note}</p>}
				<label>Nota</label>
				<input
					className="w-full input input-bordered h-full"
					placeholder="note"
					type="text"
					name="note"
					value={values.note}
					onBlur={handleBlur}
					onChange={handleChange}
				/>

				<label>Fecha de devolucion</label>
				<input
					type="date"
					name="returnedDate"
					value={values.returnedDate}
					className="w-full h-10 input input-bordered "
					onBlur={handleBlur}
					onChange={handleChange}
					// onSelect={() => handleSelect}
				/>

				<label>Fecha de retiro</label>
				<input
					type="date"
					name="retirementDate"
					value={values.retirementDate}
					className="w-full h-10 input input-bordered "
					onBlur={handleBlur}
					onChange={handleChange}
					// onSelect={() => handleSelect}
				/>

				<button className="btn btn-primary" type="submit">
					SAVE!
				</button>
			</form>
			{confirmationModalOpen && (
				<ConfirmationModal
					title="Form Costume"
					isOpen={confirmationModalOpen}
					handleClose={() => setConfirmationModalOpen(!confirmationModalOpen)}
				>
					<div className="overflow-auto h-[462px]">
						<FormNewCostume />
					</div>
				</ConfirmationModal>
			)}
		</>
	);
}
