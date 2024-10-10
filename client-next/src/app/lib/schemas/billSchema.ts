import { z } from "zod";
import { clientsPath, costumesPath } from "../data/paths";
import { getAll } from "../data/entityRepository";
import {
	Bill,
	BillDto,
	Client,
	Costume,
	CustomError,
	CostumeCant,
	RETURNTYPES,
} from "../definitions";

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

export const allCostumesNames = async () => {
	const data = await getAll<Costume>(costumesPath);

	if (data) {
		if (data instanceof CustomError) return [];

		const costumes: Costume[] = data;
		const costumesNames = costumes.map((costume) => costume.name);
		return costumesNames;
	} else {
		return [];
	}
};

const costumesNames: string[] = await allCostumesNames();

export const billSchema = z.object({
	id: z.string().optional(),

	billNumber: z.number().optional(),

	date: z.string().optional(),

	returnedDate: z.string(),

	retirementDate: z.string(),

	returned: z.nativeEnum(RETURNTYPES, {
		errorMap(issue, ctx) {
			switch (issue.code) {
				case "invalid_type": {
					if (ctx.data === undefined)
						return { message: "El valor de devolucion es requerido" };
					return {
						message: "El valor de devolucion debe ser un Enum String valido",
					};
				}

				case "invalid_enum_value":
					return {
						message:
							"El valor de returned no es válido, debe proporcionarse active, disabled o filed",
					};
			}
			return { message: ctx.defaultError };
		},
	}),

	precioTotal: z
		.number({
			invalid_type_error: "El precio total debe ser un numero mayor que 0",
			required_error: "El precio total es requerido",
		})
		.nonnegative({
			message: "El adelanto debe ser positivo",
		}),

	precioACuenta: z
		.number({
			invalid_type_error: "El precio a cuenta debe ser un numero mayor que 0",
			required_error: "El precio a cuenta es requerido",
		})
		.nonnegative({
			message: "El precio a cuenta debe ser positivo",
		})
		.optional(),

	precioDescuento: z
		.number({
			invalid_type_error:
				"El descuento al precio debe ser un numero mayor que 0",
			required_error: "El descuento al precio es requerido",
		})
		.nonnegative({
			message: "El descuento al precio debe ser positivo",
		})
		.optional(),

	precioSaldo: z.number().optional(),

	depositoTotal: z
		.number({
			invalid_type_error: "El deposito total debe ser un numero mayor que 0",
			required_error: "El deposito total  es requerido",
		})
		.nonnegative({
			message: "El deposito total debe ser positivo",
		}),

	depositoACuenta: z
		.number({
			invalid_type_error: "El deposito a cuenta debe ser un numero mayor que 0",
			required_error: "El deposito a cuenta es requerido",
		})
		.nonnegative({
			message: "El deposito a cuenta debe ser positivo",
		})
		.optional(),

	depositoDescuento: z
		.number({
			invalid_type_error:
				"El descuento del deposito debe ser un numero mayor que 0",
			required_error: "El descuento del deposito es requerido",
		})
		.nonnegative({
			message: "El descuento del deposito debe ser positivo",
		})
		.optional(),

	depositoSaldo: z.number().optional(),

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

	costumes: z
		.array(
			z.object({
				costumeName: z.string(),
				cant: z.number().positive(),
			})
		)
		.nonempty({
			message: "La factura debe contener al menos un disfraz comprado",
		})
		.refine(
			(costumes) => {
				let bandera = true;
				for (let index = 0; index < costumes.length; index++) {
					if (!costumesNames.includes(costumes[index].costumeName)) {
						bandera = false;
						break;
					}
				}
				return bandera;
			},
			{
				message: "No se encuenta ese disfraz en la base de datos",
			}
		),
	others: z
		.array(
			z.object({
				name: z.string(),
				price: z
					.number({
						invalid_type_error: "El precio debe ser un numero mayor que 0",
						required_error: "El precio es requerido",
					})
					.positive(),
			})
		)
		.nullable()
		.optional(),
});

export function validateBill(object: BillDto) {
	return billSchema.safeParse(object);
}

export function validateParcialBill(object: Bill) {
	return billSchema.partial().safeParse(object);
}
