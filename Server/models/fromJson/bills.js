import { randomUUID } from 'node:crypto'
import fs from 'node:fs'

async function allBills() {
    try {
        const data = await fs.readFileSync('./dbs/bills.json', 'utf-8')

        if (data) {
            const bills = JSON.parse(data)
            return bills
        } else {
            return []
        }

    } catch (error) {
        return { message: error.message }
    }
}

async function saveAllBills(data) {
    try {
        const jsonData = JSON.stringify(data, null, 2)

        await fs.writeFileSync('./dbs/bills.json', jsonData, 'utf-8')

        return { error: false, messageSave: null }
    } catch (error) {
        return { error: true, messageSave: error.message }
    }
}

export class BillModel {
    static async getAll() {
        const bills = await allBills()
        return bills
    }

    static async getById({ id }) {
        const bills = await allBills()

        const bill = bills.find(bill => bill.id == id)
        if (bill) return { error: false, message: bill }

        return { error: true, message: 'Factura no encontrado' }

    }

    static async create({ input }) {
        const bills = await allBills()

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

        const { error, messageSave } = await saveAllBills(bills)

        if (error === true) return { error: true, message: messageSave }

        return { error: false, message: newBill }

    }

    static async delete({ id }) {
        const bills = await allBills()

        const billAEliminar = bills.filter(bill => bill.id === id)

        if (billAEliminar.length === 0) {
            return { error: true, message: "Id no encontrado" }
        } else {
            const newBills = bills.filter(bill => bill.id !== id)
            const { error, messageSave } = await saveAllBills(newBills)
            if (error === true) return { error: true, message: messageSave }
            return { error: false, message: billAEliminar[0] }
        }
    }

    static async update({ id, input }) {
        const bills = await allBills()

        const billIndex = bills.findIndex(bill => bill.id === id)
        if (billIndex === -1) return { error: true, message: "Id no encontrado" }

        bills[billIndex] = {
            ...bills[billIndex],
            ...input
        }

        const { error, messageSave } = await saveAllBills(bills)
        if (error === true) return { error: true, message: messageSave }

        return { error: false, message: bills[billIndex] }
    }
}
