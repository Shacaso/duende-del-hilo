export interface Entity {
	id: string;
	dischargeDate?: string;
}

export interface Costume extends Entity {
	name: string;
	price: number;
	category: string;
	details: string;
}

export interface Client extends Entity {
	name: string;
	surname: string;
	dni: number;
	phoneNumber: number;
	email: string;
	direction: string;
	departament: string;
	postalCode: number;
	blacklist: boolean;
}

export interface Departament extends Entity {
	name: string;
}

export interface BillDto extends Entity {
	billNumber: number;
	date: string;
	returned: boolean;
	amount: number;
	costumes: string[];
	dniClient: number;
	note: string;
}

export interface Bill extends Entity {
	billNumber: number;
	date: string;
	returned: boolean;
	amount: number;
	client: Client;
	costumes: Costume[];
	note: string;
}

export interface Category extends Entity {
	name: string;
}

export interface Filter {
	keyword: string;
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

export interface UserLogin {
	user: string;
	password: string;
}
