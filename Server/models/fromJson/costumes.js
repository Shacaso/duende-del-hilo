import { randomUUID } from 'node:crypto'
import { allEntities, saveAllEntities } from './funcionesGETSAVE.js'

export class CostumeModel {
    constructor ({ jsonPath }) {
        this.jsonPath = jsonPath
    }

    getAll = async () => {
        const { errorGet, messageGet } = await allEntities(this.jsonPath)
        if (errorGet) return { error: true, message: messageGet, codigo: 500 }
        return { error: false, message: messageGet }
    }

    getById = async ({ id }) => {
        const { errorGet, messageGet } = await allEntities(this.jsonPath)
        if (errorGet) return { error: true, message: message, codigo: 500 }
        const costumes = messageGet

        const costume = costumes.find(costume => costume.id == id)
        if (costume) return { error: false, message: costume }

        return { error: true, message: 'Disfraz no encontrado', codigo: 404 }
    }

    create = async ({ input }) => {
        const newCostume = {
            id: randomUUID(),
            ...input
        }

        const { errorGet, messageGet } = await allEntities(this.jsonPath)
        if (errorGet) return { error: true, message: message, codigo: 500 }
        const costumes = messageGet

        if (costumes) {
            costumes.push(newCostume)
        } else {
            costumes = [newCostume]
        }

        const { errorSave, messageSave } = await saveAllEntities(costumes, this.jsonPath)
        if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

        return { error: false, message: newCostume }

    }
    
    update = async ({ id, input }) => {
        const { errorGet, messageGet } = await allEntities(this.jsonPath)
        if (errorGet) return { error: true, message: message, codigo: 500 }
        const costumes = messageGet

        const costumeIndex = costumes.findIndex(costume => costume.id === id)
        if (costumeIndex === -1) return { error: true, message: "Id no encontrado", codigo: 404 }

        costumes[costumeIndex] = {
            ...costumes[costumeIndex],
            ...input
        }

        const { errorSave, messageSave } = await saveAllEntities(costumes, this.jsonPath)
        if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

        return { error: false, message: costumes[costumeIndex] }
    }

    delete = async ({ id }) => {
        const { errorGet, messageGet } = await allEntities(this.jsonPath)
        if (errorGet) return { error: true, message: message, codigo: 500 }
        const costumes = messageGet

        const costumeAEliminar = costumes.filter(costume => costume.id === id)

        if (costumeAEliminar.length === 0) {
            return { error: true, message: "Id no encontrado", codigo: 404 }
        } else {
            const newCostumes = costumes.filter(costume => costume.id !== id)
            const { errorSave, messageSave } = await saveAllEntities(newCostumes, this.jsonPath)
            if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }
            return { error: false, message: costumeAEliminar[0] }
        }
    }

    logicDelete = async ({ id }) => {
        const { errorGet, messageGet } = await allEntities(this.jsonPath)
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

        const { errorSave, messageSave } = await saveAllEntities(costumes, this.jsonPath)
        if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

        return { error: false, message: costumes[costumeIndex] }
    }
}
