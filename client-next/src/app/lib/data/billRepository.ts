import { randomUUID } from "crypto";
import {
	Bill,
	BillDto,
	Client,
	Costume,
	CostumeCant,
	CustomError,
	Others,
} from "../definitions";
import { allEntities, saveAllEntities } from "./GetAndSaveJson";
import { getDateAndHour, sacarPrecioTotal } from "./funciones";
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

	if (sacarPrecioTotal(costumesFound, input.others) !== input.precioTotal)
		return new CustomError(
			true,
			"La sumatoria de los productos no es igual al PrecioTotal",
			409
		);

	const variablesPrecio = [
		input.precioTotal,
		input.precioACuenta ? input.precioACuenta : 0,
		input.precioDescuento ? input.precioDescuento : 0,
	];

	const variablesDeposito = [
		input.depositoTotal,
		input.depositoACuenta ? input.depositoACuenta : 0,
		input.depositoDescuento ? input.depositoDescuento : 0,
	];

	const newBill: Bill = {
		id: randomUUID(),
		billNumber: lastBill,
		date: date + " " + hour,
		returnedDate: input.returnedDate,
		retirementDate: input.retirementDate,
		returned: input.returned,
		precioTotal: variablesPrecio[0],
		precioACuenta: variablesPrecio[1],
		precioDescuento: variablesPrecio[2],
		precioSaldo: variablesPrecio[0] - variablesPrecio[1] - variablesPrecio[2],
		depositoTotal: variablesDeposito[0],
		depositoACuenta: variablesDeposito[1],
		depositoDescuento: variablesDeposito[2],
		depositoSaldo:
			variablesDeposito[0] - variablesDeposito[1] - variablesDeposito[2],
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
