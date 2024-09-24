import { z } from "zod";
import { getAll } from "../data/entityRepository";
import { Client, CustomError, Departament } from "../definitions";
import { clientsPath, departamentsPath } from "../data/paths";

const allDepartaments = async () => {
	const data = await getAll<Departament>(departamentsPath);

	if (data) {
		if (data instanceof CustomError) return [];

		const departaments: Departament[] = data;
		const nameDepartaments = departaments.map(
			(departament) => departament.name
		);
		return nameDepartaments;
	} else {
		return [];
	}
};

const allDni = async () => {
	const data = await getAll<Client>(clientsPath);

	if (data) {
		if (data instanceof CustomError) return [];

		const clients: Client[] = data;
		const dnis: number[] = clients.map((client) => client.dni);
		return dnis;
	} else {
		return [];
	}
};

const departaments: string[] = await allDepartaments();

const dnis: number[] = await allDni();

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
			invalid_type_error: "El dni debe ser un numero de 10 digitos",
			required_error: "El dni es requerido",
		})
		.int()
		.min(1000000)
		.max(99999999)
		.refine((value) => !dnis.includes(value), {
			message: "Dni ya esta registrado",
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
			required_error: "El telefono es requerido",
		})
		.int()
		.min(1000000000)
		.max(9999999999)
		.optional(),

	email: z.string().email("Email inválido"),

	direction: z.string({
		invalid_type_error: "La direccion debe ser un string",
		required_error: "La direccion es requerido",
	}),

	departament: z.string().refine((value) => departaments.includes(value), {
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

const clientSchemaPartial = z.object({
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
			invalid_type_error: "El dni debe ser un numero de 10 digitos",
			required_error: "El dni es requerido",
		})
		.int()
		.min(1000000)
		.max(99999999)
		.refine(
			(dni) => {
				let bandera = 0;
				for (let index = 0; index < dnis.length; index++) {
					if (dnis[index] === dni) {
						bandera++;
						break;
					}
				}
				if (bandera === 0 || bandera === 1) return true;
				return false;
			},
			{
				message: "Dni ya esta registrado",
			}
		),

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

	departament: z.string().refine((value) => departaments.includes(value), {
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

export function validateClient(object: Client) {
	return clientSchema.safeParse(object);
}

export function validateParcialClient(object: Client) {
	return clientSchemaPartial.partial().safeParse(object);
}
