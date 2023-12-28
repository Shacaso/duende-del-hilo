
export interface Costume {
    id: string;
    name: string;
    price: number,
    category: string;
    details: string;
    discharge: string;
}

export interface User {
    id: string;
    name: string;
    surname: string;
    dni: number;
    phoneNumber: number;
    email: string;
    address: string;
    departament: string;
    postalCode: number;
    blacklist: boolean;
    dischargeDate: string;
}

export interface Departament {
    id: string;
    name: string;
    dischargeDate: string;
}

export interface Bill {
    id: string;
    billnumber: number; 
    returned: boolean;
    amount: number;
    idUser: string;
    note: string; 
    dischargeDate: string;
}

export interface Category {
    id: string;
    name: string;
    dischargeDate: string;
}
