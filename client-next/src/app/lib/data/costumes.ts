import { randomUUID } from "crypto"
import { Costume } from "../definitions"
import { allEntities, saveAllEntities } from "./GetAndSaveJson"
import { costumesPath } from "./paths"


export const getAll = async () => {
    const response = await allEntities(costumesPath)
    if (response.errorGet) return { error: true, message: response.messageGet, codigo: 500 }
    return response
}

export const getById = async (id: string) => {
    const response = await allEntities(costumesPath)
    if (response.errorGet) return { error: true, message: response.messageGet, codigo: 500 }

    const costumes: Costume[] = response

    const costume: Costume | undefined = costumes.find(costume => costume.id == id)
    if (costume) return costume

    return { error: true, message: 'Id no encontrado', codigo: 404 }
}

export const create = async (input: Costume) => {
    
    const newCostume: Costume = {
        id: randomUUID(),
        ...input,
        dischargeDate:'',
    }
    
    const response = await allEntities(costumesPath)
    if (response.errorGet) return { error: true, message: response.messageGet, codigo: 500 }
    let costumes: Costume[] = response

    if (costumes) {
        costumes.push(newCostume)
    } else {
        costumes = [newCostume]
    }

    const { errorSave, messageSave } = await saveAllEntities(costumes, costumesPath)
    if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

    return newCostume

}

export const update = async (id: string, input: Costume) => {
    const response = await allEntities(costumesPath)
    if (response.errorGet) return { error: true, message: response.messageGet, codigo: 500 }
    const costumes: Costume[] = response

    const costumeIndex = costumes.findIndex(costume => costume.id === id)
    if (costumeIndex === -1) return { error: true, message: "Id no encontrado", codigo: 404 }

    costumes[costumeIndex] = {
        ...costumes[costumeIndex],
        ...input
    }

    const { errorSave, messageSave } = await saveAllEntities(costumes, costumesPath)
    if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

    return costumes[costumeIndex]
}

export const hardDelete = async (id: string) => {
    const response = await allEntities(costumesPath)
    if (response.errorGet) return { error: true, message: response.message, codigo: 500 }
    const costumes: Costume[] = response

    const costumeAEliminar = costumes.filter(costume => costume.id === id)

    if (costumeAEliminar.length === 0) {
        return { error: true, message: "Id no encontrado", codigo: 404 }
    } else {
        const newCostumes = costumes.filter(costume => costume.id !== id)
        const { errorSave, messageSave } = await saveAllEntities(newCostumes, costumesPath)
        if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }
        return costumeAEliminar[0]
    }
}

export const logicDelete = async (id: string) => {
    const response = await allEntities(costumesPath)
    if (response.errorGet) return { error: true, message: response.messageGet, codigo: 500 }
    const costumes: Costume[] = response

    const costumeIndex = costumes.findIndex(costume => costume.id === id)
    if (costumeIndex === -1) return { error: true, message: "Id no encontrado", codigo: 404 }

    const dischargeDate = {
        dischargeDate: new Date().toISOString()
    }

    costumes[costumeIndex] = {
        ...costumes[costumeIndex],
        ...dischargeDate
    }

    const { errorSave, messageSave } = await saveAllEntities(costumes, costumesPath)
    if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

    return costumes[costumeIndex]
}

