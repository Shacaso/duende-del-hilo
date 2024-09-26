import { randomUUID } from "crypto";
import {
	Costume,
	Category,
	CustomError,
	CostumeDTO,
	InputArray,
	CostumeCant,
} from "../definitions";
import { allEntities, saveAllEntities } from "./GetAndSaveJson";
import { getCategoryByName } from "./categoriesRepository";
import { costumesPath } from "./paths";

export const create = async (input: CostumeDTO, path: string) => {
	const entitiesCostumes = await allEntities<Costume>(path);

	if (entitiesCostumes instanceof CustomError) return entitiesCostumes;
	let costumes: Costume[] = entitiesCostumes;

	const categoryFound: Category | CustomError = await getCategoryByName(
		input.category
	);

	if (categoryFound instanceof CustomError) return categoryFound;

	const newCostume: Costume = {
		id: randomUUID(),
		name: input.name,
		category: categoryFound,
		details: input.details,
		dischargeDate: "",
	};

	if (costumes.length === 0) {
		costumes = [newCostume];
	} else {
		costumes.push(newCostume);
	}

	const responseSave = await saveAllEntities<Costume>(costumes, path);
	if (responseSave instanceof CustomError) return responseSave;

	return newCostume;
};

export async function getCostumeArray(
	data: InputArray[]
): Promise<CustomError | CostumeCant[]> {
	const response = await allEntities<Costume>(costumesPath);
	if (response instanceof CustomError) return response;

	const costumes: Costume[] = response;
	const costumesFound: CostumeCant[] = [];

	data.forEach((input: InputArray) => {
		const costumeFound: Costume | undefined = costumes.find(
			(entity) => entity.name === input.costumeName
		);
		if (costumeFound)
			costumesFound.push({ costume: costumeFound, cant: input.cant });
	});

	return costumesFound;
}

export async function updateCostumesByCategory(category: Category) {
	const response = await allEntities<Costume>(costumesPath);
	if (response instanceof CustomError) return response;

	const costumes: Costume[] = response;

	costumes.forEach((costume: Costume) => {
		if (costume.category.id === category.id) {
			costume.category = category;
		}
	});

	const responseSave = await saveAllEntities<Costume>(costumes, costumesPath);
	if (responseSave instanceof CustomError) return responseSave;
}

export async function getCostumesByCategory(idCategory: string) {
	const response = await allEntities<Costume>(costumesPath);
	if (response instanceof CustomError) return response;

	const costumes: Costume[] = response;
	const costumesFound: Costume[] = [];

	costumes.forEach((costume: Costume) => {
		if (costume.category.id === idCategory) {
			costumesFound.push(costume);
		}
	});

	if (costumesFound.length === 0)
		return new CustomError(true, "No existen Disfraces en esa categoria", 404);

	return costumesFound;
}
