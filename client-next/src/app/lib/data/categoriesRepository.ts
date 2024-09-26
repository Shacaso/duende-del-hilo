import { Category, Costume, CustomError } from "../definitions";
import {
	getCostumesByCategory,
	updateCostumesByCategory,
} from "./costumeRepository";
import { allEntities, saveAllEntities } from "./GetAndSaveJson";
import { categoriesPath } from "./paths";

export const update = async (id: string, input: Category) => {
	const response = await allEntities<Category>(categoriesPath);
	if (response instanceof CustomError) return response;
	const categories: Category[] = response;

	const entityIndex = categories.findIndex((entity) => entity.id === id);

	if (entityIndex === -1) return new CustomError(true, "Id no encontrado", 404);

	categories[entityIndex] = {
		...categories[entityIndex],
		...input,
	};

	const responseSave = await saveAllEntities<Category>(
		categories,
		categoriesPath
	);
	if (responseSave instanceof CustomError) return responseSave;

	updateCostumesByCategory(categories[entityIndex]);

	return categories[entityIndex];
};

export async function getCategoryByName(
	nameCategory: string
): Promise<Category | CustomError> {
	const responseCategory: Category[] | CustomError =
		await allEntities<Category>(categoriesPath);

	if (responseCategory instanceof CustomError) return responseCategory;
	let categoryFound: Category = responseCategory.filter(
		(category: Category) => {
			return category.name === nameCategory;
		}
	)[0];

	return categoryFound;
}

export const logicDelete = async (id: string) => {
	const response = await allEntities<Category>(categoriesPath);
	if (response instanceof CustomError) return response;
	const categories: Category[] = response;

	const categoryIndex = categories.findIndex((category) => category.id === id);
	if (categoryIndex === -1)
		return new CustomError(true, "Id no encontrado", 404);

	const cantCostumeByCategory: Costume[] | CustomError =
		await getCostumesByCategory(categories[categoryIndex].id);
	if (cantCostumeByCategory instanceof CustomError) return response;
	if (cantCostumeByCategory.length !== 0)
		return new CustomError(
			true,
			"La Categoria esta asociada a Disfraces, no se puede eliminar",
			409
		);

	const [date, time] = new Date().toISOString().split("T");
	const [a, b] = time.split(".");

	const dischargeDate = {
		dischargeDate: date + " " + a,
	};

	categories[categoryIndex] = {
		...categories[categoryIndex],
		...dischargeDate,
	};

	const responseSave = await saveAllEntities<Category>(
		categories,
		categoriesPath
	);
	if (responseSave instanceof CustomError) return responseSave;

	return categories[categoryIndex];
};
