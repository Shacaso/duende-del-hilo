import { z } from "zod";
import { Category } from "../definitions";

const categorySchema = z.object({
	id: z.string().optional(),

	name: z.string({
		invalid_type_error: "La categoria debe ser un string",
		required_error: "La categoria es requerido",
	}),

	price: z
		.number({
			invalid_type_error: "El precio debe ser un numero mayor que 0",
			required_error: "El precio es requerido",
		})
		.nonnegative({
			message: "El precio debe ser positivo",
		}),

	dischargeDate: z.string().default(""),
});

export function validateCategory(object: Category) {
	return categorySchema.safeParse(object);
}

export function validateParcialCategory(object: Category) {
	return categorySchema.partial().safeParse(object);
}
