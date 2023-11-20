import { randomUUID } from 'node:crypto'
import { allEntities, saveAllEntities } from './funcionesGETSAVE.js'

const path = './dbs/costumes.json'

export class CostumeModel {
    static async getAll() {
        const { errorGet, messageGet } = await allEntities(path)
        if (errorGet) return { error: true, message: messageGet, codigo: 500 }
        return { error: false, message: messageGet }
    }

    static async getById({ id }) {
        const { errorGet, messageGet } = await allEntities(path)
        if (errorGet) return { error: true, message: message, codigo: 500 }
        const costumes = messageGet

        const costume = costumes.find(costume => costume.id == id)
        if (costume) return { error: false, message: costume }

        return { error: true, message: 'Disfraz no encontrado', codigo: 404 }
    }

    static async create({ input }) {
        const newCostume = {
            id: randomUUID(),
            ...input
        }

        const { errorGet, messageGet } = await allEntities(path)
        if (errorGet) return { error: true, message: message, codigo: 500 }
        const costumes = messageGet

        if (costumes) {
            costumes.push(newCostume)
        } else {
            costumes = [newCostume]
        }

        const { errorSave, messageSave } = await saveAllEntities(costumes, path)
        if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

        return { error: false, message: newCostume }

    }

    static async delete({ id }) {
        const { errorGet, messageGet } = await allEntities(path)
        if (errorGet) return { error: true, message: message, codigo: 500 }
        const costumes = messageGet

        const costumeAEliminar = costumes.filter(costume => costume.id === id)

        if (costumeAEliminar.length === 0) {
            return { error: true, message: "Id no encontrado", codigo: 404 }
        } else {
            const newCostumes = costumes.filter(costume => costume.id !== id)
            const { errorSave, messageSave } = await saveAllEntities(newCostumes, path)
            if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }
            return { error: false, message: costumeAEliminar[0] }
        }
    }

    static async update({ id, input }) {
        const { errorGet, messageGet } = await allEntities(path)
        if (errorGet) return { error: true, message: message, codigo: 500 }
        const costumes = messageGet

        const costumeIndex = costumes.findIndex(costume => costume.id === id)
        if (costumeIndex === -1) return { error: true, message: "Id no encontrado", codigo: 404 }

        costumes[costumeIndex] = {
            ...costumes[costumeIndex],
            ...input
        }

        const { errorSave, messageSave } = await saveAllEntities(costumes, path)
        if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

        return { error: false, message: costumes[costumeIndex] }
    }

    static async logicDelete({ id }) {
        const { errorGet, messageGet } = await allEntities(path)
        if (errorGet) return { error: true, message: messageGet, codigo: 500 }
        const costumes = messageGet

        const costumeIndex = costumes.findIndex(costume => costume.id === id)
        if (costumeIndex === -1) return { error: true, message: "Id no encontrado", codigo: 404 }

        const dischargeDate = {
            dischargeDate: new Date().toISOString()
        }

        costumes[costumeIndex] = {
            ...costumes[costumeIndex],
            ...dischargeDate
        }

        const { errorSave, messageSave } = await saveAllEntities(costumes, path)
        if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

        return { error: false, message: costumes[costumeIndex] }
    }
}
