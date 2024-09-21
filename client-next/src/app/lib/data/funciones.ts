import { Category, Client, Costume, CustomError } from "../definitions";
import { fetchDeleteById } from "../fetching";
import { allEntities } from "./GetAndSaveJson";
import { categoriesPath, clientsPath, costumesPath } from "./paths";

//Funcion que concatena los mesajes de error de las validaciones
export function jsonProcess(data: any[]) {
	let output = "";
	for (let index = 0; index < data.length; index++) {
		output += data[index].message + ". ";
	}
	return output;
}

export const deleteAction = async (id: string, path: string) => {
	const result = window.confirm("¿Seguro que desea eliminar el registro?");

	if (result) {
		await fetchDeleteById(id, path).then((res) => {
			if (res) alert("Registro eliminado");
		});
	}
	location.reload();
};

export async function getCostumeArray(
	data: string[]
): Promise<CustomError | Costume[]> {
	const response = await allEntities<Costume>(costumesPath);
	if (response instanceof CustomError) return response;

	const costumes: Costume[] = response;
	const costumesFound: Costume[] = [];

	data.forEach((costumeName) => {
		const costumeFound: Costume | undefined = costumes.find(
			(entity) => entity.name == costumeName
		);
		if (costumeFound) costumesFound.push(costumeFound);
	});

	return costumesFound;
}

export async function getClientByDNI(
	dniClient: number
): Promise<Client | CustomError> {
	const responseClient: Client[] | CustomError = await allEntities<Client>(
		clientsPath
	);

	if (responseClient instanceof CustomError) return responseClient;
	let clientFound: Client = responseClient.filter((client: Client) => {
		return client.dni === dniClient;
	})[0];

	return clientFound;
}

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

export function getDateAndHour() {
	const fechaHora: Date = new Date();
	fechaHora.setHours(fechaHora.getHours() - 3);
	const [date, time] = fechaHora.toISOString().split("T");
	const [hour, b] = time.split(".");

	return { date, hour };
}
