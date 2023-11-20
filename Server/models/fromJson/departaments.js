import { randomUUID } from 'node:crypto'
import { allEntities, saveAllEntities } from './funcionesGETSAVE.js'

const path = './dbs/departaments.json'

export class DepartamentModel {
    static async getAll() {
        const { errorGet, messageGet } = await allEntities(path)
        if (errorGet) return { error: true, message: messageGet, codigo: 500 }
        return { error: false, message: messageGet }
    }

    static async getById({ id }) {
        const { errorGet, messageGet } = await allEntities(path)

        if (errorGet) return { error: true, message: message, codigo: 500 }
        const departaments = messageGet
        const departament = departaments.find(departament => departament.id == id)
        if (departament) return { error: false, message: departament }

        return { error: true, message: 'Departamento no encontrado', codigo: 404 }
    }

    static async create({ input }) {
        const newDepartament = {
            id: randomUUID(),
            ...input
        }

        const { errorGet, messageGet } = await allEntities(path)
        if (errorGet) return { error: true, message: message, codigo: 500 }
        const departaments = messageGet

        if (departaments) {
            departaments.push(newDepartament)
        } else {
            departaments = [newDepartament]
        }

        const { errorSave, messageSave } = saveAllEntities(departaments)
        if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

        return { error: false, message: newDepartament }

    }

    static async delete({ id }) {
        const { errorGet, messageGet } = await allEntities(path)
        if (errorGet) return { error: true, message: message, codigo: 500 }
        const departaments = messageGet

        const departamentAEliminar = departaments.filter(departament => departament.id === id)

        if (departamentAEliminar.length === 0) {
            return { error: true, message: "Id no encontrado", codigo: 404 }
        } else {
            const newDepartaments = departaments.filter(departament => departament.id !== id)
            const { errorSave, messageSave } = saveAllEntities(departaments)
            if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }
            return { error: false, message: departamentAEliminar[0] }
        }
    }

    static async update({ id, input }) {
        const { errorGet, messageGet } = await allEntities(path)
        if (errorGet) return { error: true, message: message, codigo: 500 }
        const departaments = messageGet

        const departamentIndex = departaments.findIndex(departament => departament.id === id)
        if (departamentIndex === -1) return { error: true, message: "Id no encontrado", codigo: 404 }

        departaments[departamentIndex] = {
            ...departaments[departamentIndex],
            ...input
        }

        const { errorSave, messageSave } = saveAllEntities(departaments)
        if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

        return { error: false, message: departaments[departamentIndex] }
    }

    static async logicDelete({ id }) {
        const { errorGet, messageGet } = await allEntities(path)
        if (errorGet) return { error: true, message: messageGet, codigo: 500 }
        const departaments = messageGet

        const departamentIndex = departaments.findIndex(departament => departament.id === id)
        if (departamentIndex === -1) return { error: true, message: "Id no encontrado", codigo: 404 }

        const dischargeDate = {
            dischargeDate: new Date().toISOString()
        }

        departaments[departamentIndex] = {
            ...departaments[departamentIndex],
            ...dischargeDate
        }

        const { errorSave, messageSave } = await saveAllEntities(departaments, path)
        if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

        return { error: false, message: departaments[departamentIndex] }
    }
}
