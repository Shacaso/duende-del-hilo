import { randomUUID } from "crypto";
import { Bill, BillDto, Client, Costume, CustomError } from "../definitions";
import { allEntities, saveAllEntities } from "./GetAndSaveJson";
import { getClientByDNI, getCostumeArray, getDateAndHour } from "./funciones";

export const create = async (input: BillDto, path: string) => {
	const entities = await allEntities<Bill>(path);

	if (entities instanceof CustomError) return entities;
	let bills: Bill[] = entities;

	let lastBill = 1;

	if (entities.length !== 0) {
		lastBill = entities[entities.length - 1].billNumber + 1;
	}

	const { date, hour } = getDateAndHour();

	const clientFound: Client | CustomError = await getClientByDNI(
		input.dniClient
	);
	if (clientFound instanceof CustomError) return clientFound;

	const costumesFound: Costume[] | CustomError = await getCostumeArray(
		input.costumes
	);
	if (costumesFound instanceof CustomError) return costumesFound;

	const priceReal = () => {
		let result = 0;
		for (let index = 0; index < costumesFound.length; index++) {
			result += costumesFound[index].price;
		}
		if (input.others && input.others?.length !== 0) {
			for (let index = 0; index < input.others.length; index++) {
				result += input.others[index].price;
			}
		}
		return result;
	};

	if (priceReal() !== input.amountTotal) {
		return new CustomError(
			true,
			"El precio total no corresponde con la sumatoria de los productos",
			400
		);
	}

	const newBill: Bill = {
		id: randomUUID(),
		billNumber: lastBill,
		date: date + " " + hour,
		returnedDate: input.returnedDate,
		retirementDate: input.retirementDate,
		returned: input.returned,
		amountTotal: input.amountTotal,
		advancement: input.advancement,
		remainingBalance: input.amountTotal - input.advancement,
		client: clientFound,
		costumes: costumesFound,
		others: input.others,
		note: input.note,
		dischargeDate: "",
	};

	if (bills) {
		bills.push(newBill);
	} else {
		bills = [newBill];
	}

	const responseSave = await saveAllEntities<Bill>(bills, path);
	if (responseSave instanceof CustomError) return responseSave;

	return newBill;
};
