export interface Entity {
  id: string;
  dischargeDate?: string;
}

export interface Costume extends Entity {
  name: string;
  category: Category;
  details: string;
  price: number;
}

export interface CostumeDTO extends Entity {
  name: string;
  category: string;
  details: string;
  price: number;
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

export interface Others {
  name: string;
  price: number;
}

export interface CountCostume {
  costumeName: string;
  cant: number;
}

export interface BillDto extends Entity {
  advancement: number;
  amountTotal: number;
  billNumber: number;
  costumes: CountCostume[] | null;
  date: string;
  dniClient: number;
  note: string;
  others: Others[] | null;
  remainingBalance: number;
  retirementDate: string;
  returned: boolean;
  returnedDate: string;
}

export interface Bill extends Entity {
  advancement: number;
  amountTotal: number;
  billNumber: number;
  client: Client;
  costumes: Costume[];
  date: string;
  note: string;
  others: Others[] | null;
  remainingBalance: number;
  retirementDate: string;
  returned: boolean;
  returnedDate: string;
}

export interface Category extends Entity {
  name: string;
  price: number;
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
