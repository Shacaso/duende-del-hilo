import { randomUUID } from "crypto";
import { Costume, Category, CustomError, CostumeDTO } from "../definitions";
import { allEntities, saveAllEntities } from "./GetAndSaveJson";
import { getCategoryByName } from "./funciones";

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
		price: categoryFound.price,
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
