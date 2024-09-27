import { randomUUID } from "crypto";
import {
	Bill,
	BillDto,
	Client,
	CostumeCant,
	CustomError,
} from "../definitions";
import { allEntities, saveAllEntities } from "./GetAndSaveJson";
import { getDateAndHour } from "./funciones";
import { getClientByDNI } from "./clientRepository";
import { getCostumeArray } from "./costumeRepository";

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

	const costumesFound: CostumeCant[] | CustomError = await getCostumeArray(
		input.costumes
	);
	if (costumesFound instanceof CustomError) return costumesFound;

	const newBill: Bill = {
		id: randomUUID(),
		billNumber: lastBill,
		date: date + " " + hour,
		returnedDate: input.returnedDate,
		retirementDate: input.retirementDate,
		returned: input.returned,
		precioTotal: input.precioTotal,
		precioACuenta: input.precioACuenta,
		precioDescuento: input.precioDescuento,
		precioSaldo:
			input.precioTotal - input.precioDescuento - input.precioACuenta,
		depositoTotal: input.depositoTotal,
		depositoACuenta: input.depositoACuenta,
		depositoDescuento: input.depositoDescuento,
		depositoSaldo:
			input.depositoTotal - input.depositoDescuento - input.depositoACuenta,
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
