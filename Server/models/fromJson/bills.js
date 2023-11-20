import { randomUUID } from 'node:crypto'
import { allEntities, saveAllEntities } from './funcionesGETSAVE.js'

const path = './dbs/bills.json'

export class BillModel {
    static async getAll() {
        const { errorGet, messageGet } = await allEntities(path)
        if (errorGet) return { error: true, message: messageGet, codigo: 500 }
        return { error: false, message: messageGet }
    }

    static async getById({ id }) {
        const { errorGet, messageGet } = await allEntities(path)
        if (errorGet) return { error: true, message: messageGet, codigo: 500 }
        const bills = messageGet

        const bill = bills.find(bill => bill.id == id)
        if (bill) return { error: false, message: bill }

        return { error: true, message: 'Factura no encontrado', codigo: 404 }

    }

    static async create({ input }) {
        const { errorGet, messageGet } = await allEntities(path)
        if (errorGet) return { error: true, message: messageGet, codigo: 500 }
        const bills = messageGet

        let lastBill = 1

        if (bills.length !== 0) {
            lastBill = bills[bills.length - 1].billNumber + 1
        }

        const newBill = {
            id: randomUUID(),
            billNumber: lastBill,
            date: Date.now(),
            ...input
        }

        if (bills) {
            bills.push(newBill)
        } else {
            bills = [newBill]
        }

        const { errorSave, messageSave } = await saveAllEntities(bills, path)
        if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

        return { error: false, message: newBill }

    }

    static async delete({ id }) {
        const { errorGet, messageGet } = await allEntities(path)
        if (errorGet) return { error: true, message: messageGet, codigo: 500 }
        const bills = messageGet

        const billAEliminar = bills.filter(bill => bill.id === id)

        if (billAEliminar.length === 0) {
            return { error: true, message: "Id no encontrado", codigo: 404 }
        } else {
            const newBills = bills.filter(bill => bill.id !== id)
            const { errorSave, messageSave } = await saveAllEntities(newBills, path)
            if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }
            return { error: false, message: billAEliminar[0] }
        }
    }

    static async update({ id, input }) {
        const { errorGet, messageGet } = await allEntities(path)
        if (errorGet) return { error: true, message: messageGet, codigo: 500 }
        const bills = messageGet

        const billIndex = bills.findIndex(bill => bill.id === id)
        if (billIndex === -1) return { error: true, message: "Id no encontrado", codigo: 404 }

        bills[billIndex] = {
            ...bills[billIndex],
            ...input
        }

        const { errorSave, messageSave } = await saveAllEntities(bills, path)
        if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

        return { error: false, message: bills[billIndex] }
    }

    static async logicDelete({ id }) {
        const { errorGet, messageGet } = await allEntities(path)
        if (errorGet) return { error: true, message: messageGet, codigo: 500 }
        const bills = messageGet

        const billIndex = bills.findIndex(bill => bill.id === id)
        if (billIndex === -1) return { error: true, message: "Id no encontrado", codigo: 404 }

        const dischargeDate = {
            dischargeDate: new Date().toISOString()
        }

        bills[billIndex] = {
            ...bills[billIndex],
            ...dischargeDate
        }

        const { errorSave, messageSave } = await saveAllEntities(bills, path)
        if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

        return { error: false, message: bills[billIndex] }
    }
}
