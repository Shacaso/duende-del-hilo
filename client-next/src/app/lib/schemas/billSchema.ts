import { z } from "zod";
import { clientsPath } from "../data/paths";
import { getAll } from "../data/entityRepository";
import { Bill, BillDto, Client, CustomError } from "../definitions";

const allUsers = async () => {
	const data = await getAll<Client>(clientsPath);

	if (data) {
		if (data instanceof CustomError) return [];

		const clients: Client[] = data;
		const idsClients = clients.map((client) => client.dni);
		return idsClients;
	} else {
		return [];
	}
};

const idsUsers: number[] = await allUsers();

export const billSchema = z.object({
	id: z.string().optional(),

	billNumber: z.number().optional(),

	date: z.string().optional(),

	returned: z
		.boolean({
			invalid_type_error: "El valor del atributo devuelto debe ser un booleano",
		})
		.default(false),

	amount: z
		.number({
			invalid_type_error: "El monto debe ser un numero mayor que 0",
			required_error: "El monto  es requerido",
		})
		.positive(),

	dniClient: z
		.number({
			invalid_type_error: "El dni debe ser un numero mayor que 0",
			required_error: "El dni es requerido",
		})
		.refine((value) => idsUsers.includes(value), {
			message: "No se encuenta ese id de Usuario en la base de datos",
		}),

	note: z.string({
		invalid_type_error: "La nota debe ser un string",
		required_error: "La nota es requerido",
	}),

	dischargeDate: z.string().default(""),
});

export function validateBill(object: BillDto) {
	return billSchema.safeParse(object);
}

export function validateParcialBill(object: Bill) {
	return billSchema.partial().safeParse(object);
}
