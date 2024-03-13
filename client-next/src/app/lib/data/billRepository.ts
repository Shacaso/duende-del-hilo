import { randomUUID } from "crypto";
import { Bill, BillDto, Client, CustomError } from "../definitions";
import { allEntities, saveAllEntities } from "./GetAndSaveJson";
import { clientsPath } from "./paths";

export const create = async (input: BillDto, path: string) => {
	const response = await allEntities<Bill>(path);

	if (response instanceof CustomError) return response;
	let entities: Bill[] = response;

	let lastBill = 1;

	if (entities.length !== 0) {
		lastBill = entities[entities.length - 1].billNumber + 1;
	}

	const fechaHora: Date = new Date();
	fechaHora.setHours(fechaHora.getHours() - 3);
	const [date, time] = fechaHora.toISOString().split("T");
	const [a, b] = time.split(".");

	const responseClient: Client[] | CustomError = await allEntities<Client>(
		clientsPath
	);

	if (responseClient instanceof CustomError) return response;
	let client: Client = responseClient.filter((client: Client) => {
		return client.dni === input.dniClient;
	})[0];

	const newBill: Bill = {
		id: randomUUID(),
		billNumber: lastBill,
		date: date + " " + a,
		returned: input.returned,
		amount: input.amount,
		client: client,
		costumes: input.costumes,
		note: input.note,
		dischargeDate: "",
	};

	if (entities) {
		entities.push(newBill);
	} else {
		entities = [newBill];
	}

	const responseSave = await saveAllEntities<Bill>(entities, path);
	if (responseSave instanceof CustomError) return responseSave;

	return newBill;
};
