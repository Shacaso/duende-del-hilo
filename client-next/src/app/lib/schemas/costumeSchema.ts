import { z } from "zod";
import { getAll } from "../data/entityRepository";
import { Category, Costume, CostumeDTO, CustomError } from "../definitions";
import { categoriesPath, costumesPath } from "../data/paths";

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

export const costumeSchema = z.object({
	id: z.string().optional(),

	name: z.string({
		invalid_type_error: "El nombre debe ser un string",
		required_error: "El nombre es requerido",
	}),

	category: z
		.string({
			invalid_type_error: "La categoria debe ser un string",
			required_error: "La categoria es requerido",
		})
		.refine((value) => categories.includes(value), {
			message: "No se encuenta la categoria en la base de datos",
		}),

	details: z.string({
		invalid_type_error: "Los detalles debe ser un string",
		required_error: "Los detalles son requeridos",
	}),
});

export const costumeSchemaPartial = z.object({
	id: z.string().optional(),

	name: z.string({
		invalid_type_error: "El nombre debe ser un string",
		required_error: "El nombre es requerido",
	}),

	category: z
		.string({
			invalid_type_error: "La categoria debe ser un string",
			required_error: "La categoria es requerido",
		})
		.refine((value) => categories.includes(value), {
			message: "No se encuenta la categoria en la base de datos",
		}),

	details: z.string({
		invalid_type_error: "Los detalles debe ser un string",
		required_error: "Los detalles son requeridos",
	}),
});

export function validateCostume(object: CostumeDTO) {
	return costumeSchema.safeParse(object);
}

export function validateParcialCostume(object: CostumeDTO) {
	return costumeSchemaPartial.partial().safeParse(object);
}

export const allCostumes = async () => {
	const data = await getAll<Costume>(costumesPath);

	if (data) {
		if (data instanceof CustomError) return [];

		const costumes: Costume[] = data;
		return costumes;
	} else {
		return [];
	}
};

export const validarDuplicado = async (body: CostumeDTO) => {
	let result = false;
	const costumes: Costume[] = await allCostumes();

	const foundCostumes = costumes.filter(
		(costume) => costume.name === body.name
	);

	foundCostumes.forEach((costume: Costume) => {
		if (costume.category.name === body.category) {
			result = true;
		}
	});

	return result;
};
