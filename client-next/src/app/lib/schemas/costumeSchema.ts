import { z } from "zod";
import { getAll } from "../data/entityRepository";
import { Category, Costume, CostumeDTO, CustomError } from "../definitions";
import { categoriesPath } from "../data/paths";
import { allCostumesNames } from "./billSchema";

const allCategories = async () => {
	const data = await getAll<Category>(categoriesPath);

	if (data) {
		if (data instanceof CustomError) return [];

		const categories: Category[] = data;
		const nameCategories = categories.map((category) => category.name);
		return nameCategories;
	} else {
		return [];
	}
};

const categories: string[] = await allCategories();

const costumesNames: string[] = await allCostumesNames();

export const costumeSchema = z.object({
	id: z.string().optional(),

	name: z
		.string({
			invalid_type_error: "El nombre debe ser un string",
			required_error: "El nombre es requerido",
		})
		.refine(
			(name) => {
				let bandera = true;
				for (let index = 0; index < costumesNames.length; index++) {
					if (costumesNames[index] === name) {
						bandera = false;
						break;
					}
				}
				return bandera;
			},
			{
				message: "Ese nombre ya se encuentra en la base de datos",
			}
		),

	category: z.string().refine((value) => categories.includes(value), {
		message: "No se encuenta la categoria en la base de datos",
	}),

	details: z.string({
		invalid_type_error: "Los detalles debe ser un string",
		required_error: "Los detalles son requeridos",
	}),

	dischargeDate: z.string().default(""),
});

export const costumeSchemaPartial = z.object({
	id: z.string().optional(),

	name: z
		.string({
			invalid_type_error: "El nombre debe ser un string",
			required_error: "El nombre es requerido",
		})
		.refine(
			(name) => {
				let bandera = 0;
				for (let index = 0; index < costumesNames.length; index++) {
					if (costumesNames[index] === name) {
						bandera++;
						break;
					}
				}
				if (bandera === 0 || bandera === 1) return true;
				return false;
			},
			{
				message: "Ese nombre ya se encuentra en la base de datos",
			}
		),

	category: z.string().refine((value) => categories.includes(value), {
		message: "No se encuenta la categoria en la base de datos",
	}),

	details: z.string({
		invalid_type_error: "Los detalles debe ser un string",
		required_error: "Los detalles son requeridos",
	}),

	dischargeDate: z.string().default(""),
});

export function validateCostume(object: CostumeDTO) {
	return costumeSchema.safeParse(object);
}

export function validateParcialCostume(object: CostumeDTO) {
	return costumeSchemaPartial.partial().safeParse(object);
}
