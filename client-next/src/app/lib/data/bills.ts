import { randomUUID } from "crypto"
import { Bill } from "../definitions"
import { allEntities, saveAllEntities } from "./GetAndSaveJson"
import { billsPath } from "./paths"


export const getAll = async () => {
    const response = await allEntities(billsPath)
    if (response.errorGet) return { error: true, message: response.messageGet, codigo: 500 }
    return response
}

export const getById = async (id: string) => {
    const response = await allEntities(billsPath)
    if (response.errorGet) return { error: true, message: response.messageGet, codigo: 500 }

    const bills: Bill[] = response

    const bill: Bill | undefined = bills.find(bill => bill.id == id)
    if (bill) return bill

    return { error: true, message: 'Id no encontrado', codigo: 404 }
}

export const create = async (input: Bill) => {
    
    const newBill: Bill = {
        id: randomUUID(),
        ...input,
        dischargeDate:'',
    }
    
    const response = await allEntities(billsPath)
    if (response.errorGet) return { error: true, message: response.messageGet, codigo: 500 }
    let bills: Bill[] = response

    if (bills) {
        bills.push(newBill)
    } else {
        bills = [newBill]
    }

    const { errorSave, messageSave } = await saveAllEntities(bills, billsPath)
    if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

    return newBill

}

export const update = async (id: string, input: Bill) => {
    const response = await allEntities(billsPath)
    if (response.errorGet) return { error: true, message: response.messageGet, codigo: 500 }
    const bills: Bill[] = response

    const billIndex = bills.findIndex(bill => bill.id === id)
    if (billIndex === -1) return { error: true, message: "Id no encontrado", codigo: 404 }

    bills[billIndex] = {
        ...bills[billIndex],
        ...input
    }

    const { errorSave, messageSave } = await saveAllEntities(bills, billsPath)
    if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

    return bills[billIndex]
}

export const hardDelete = async (id: string) => {
    const response = await allEntities(billsPath)
    if (response.errorGet) return { error: true, message: response.message, codigo: 500 }
    const bills: Bill[] = response

    const billAEliminar = bills.filter(bill => bill.id === id)

    if (billAEliminar.length === 0) {
        return { error: true, message: "Id no encontrado", codigo: 404 }
    } else {
        const newBills = bills.filter(bill => bill.id !== id)
        const { errorSave, messageSave } = await saveAllEntities(newBills, billsPath)
        if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }
        return billAEliminar[0]
    }
}

export const logicDelete = async (id: string) => {
    const response = await allEntities(billsPath)
    if (response.errorGet) return { error: true, message: response.messageGet, codigo: 500 }
    const bills: Bill[] = response

    const billIndex = bills.findIndex(bill => bill.id === id)
    if (billIndex === -1) return { error: true, message: "Id no encontrado", codigo: 404 }

    const dischargeDate = {
        dischargeDate: new Date().toISOString()
    }

    bills[billIndex] = {
        ...bills[billIndex],
        ...dischargeDate
    }

    const { errorSave, messageSave } = await saveAllEntities(bills, billsPath)
    if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

    return bills[billIndex]
}

