export interface Entity {
	id: string;
}

export interface Costume extends Entity {
	name: string;
	category: Category;
	details: string;
}

export interface CostumeDTO extends Entity {
	name: string;
	category: string;
	details: string;
}

export interface Client extends Entity {
	name: string;
	surname: string;
	dni: number;
	phoneNumber: number;
	phoneNumberAlt: number | null;
	email: string;
	direction: string;
	departament: string;
	postalCode: number;
	blacklist: boolean;
}

export interface BillDto extends Entity {
	billNumber: number;
	date: string;
	returnedDate: string;
	retirementDate: string;
	returned: boolean;
	precioTotal: number;
	precioACuenta: number | null;
	precioDescuento: number | null;
	precioSaldo: number;
	depositoTotal: number;
	depositoACuenta: number | null;
	depositoDescuento: number;
	depositoSaldo: number;
	costumes: InputArray[];
	others: Others[] | null;
	dniClient: number;
	note: string;
}

export interface Bill extends Entity {
	billNumber: number;
	date: string;
	returnedDate: string;
	retirementDate: string;
	returned: boolean;
	precioTotal: number;
	precioACuenta: number;
	precioDescuento: number;
	precioSaldo: number;
	depositoTotal: number;
	depositoACuenta: number;
	depositoDescuento: number;
	depositoSaldo: number;
	client: Client;
	costumes: CostumeCant[];
	others: Others[] | null;
	note: string;
}

export interface Departament extends Entity {
	name: string;
}

export interface Category extends Entity {
	name: string;
	price: number;
}

export interface UserLogin {
	user: string;
	password: string;
}

export interface Others {
	name: string;
	price: number;
	cant: number;
}

export interface Filter {
	keyword: string;
}

export interface CostumeCant {
	costume: Costume;
	cant: number;
}

export interface InputArray {
	costumeName: string;
	cant: number;
}

export interface CountCostume {
	costumeName: string;
	cant: number;
}

export class CustomError {
	error: boolean;
	message: string;
	codigo?: number;

	constructor(error: boolean, message: string, codigo?: number) {
		this.error = error;
		this.message = message;
		this.codigo = codigo;
	}
}
