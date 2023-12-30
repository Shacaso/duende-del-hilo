import { randomUUID } from "crypto"
import { Departament } from "../definitions"
import { allEntities, saveAllEntities } from "./GetAndSaveJson"
import { departamentsPath } from "./paths"


export const getAll = async () => {
    const response = await allEntities(departamentsPath)
    if (response.errorGet) return { error: true, message: response.messageGet, codigo: 500 }
    return response
}

export const getById = async (id: string) => {
    const response = await allEntities(departamentsPath)
    if (response.errorGet) return { error: true, message: response.messageGet, codigo: 500 }

    const departaments: Departament[] = response

    const departament: Departament | undefined = departaments.find(departament => departament.id == id)
    if (departament) return departament

    return { error: true, message: 'Id no encontrado', codigo: 404 }
}

export const create = async (input: Departament) => {
    
    const newDepartament: Departament = {
        id: randomUUID(),
        ...input,
        dischargeDate:'',
    }
    
    const response = await allEntities(departamentsPath)
    if (response.errorGet) return { error: true, message: response.messageGet, codigo: 500 }
    let departaments: Departament[] = response

    if (departaments) {
        departaments.push(newDepartament)
    } else {
        departaments = [newDepartament]
    }

    const { errorSave, messageSave } = await saveAllEntities(departaments, departamentsPath)
    if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

    return newDepartament

}

export const update = async (id: string, input: Departament) => {
    const response = await allEntities(departamentsPath)
    if (response.errorGet) return { error: true, message: response.messageGet, codigo: 500 }
    const departaments: Departament[] = response

    const departamentIndex = departaments.findIndex(departament => departament.id === id)
    if (departamentIndex === -1) return { error: true, message: "Id no encontrado", codigo: 404 }

    departaments[departamentIndex] = {
        ...departaments[departamentIndex],
        ...input
    }

    const { errorSave, messageSave } = await saveAllEntities(departaments, departamentsPath)
    if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

    return departaments[departamentIndex]
}

export const hardDelete = async (id: string) => {
    const response = await allEntities(departamentsPath)
    if (response.errorGet) return { error: true, message: response.message, codigo: 500 }
    const departaments: Departament[] = response

    const departamentAEliminar = departaments.filter(departament => departament.id === id)

    if (departamentAEliminar.length === 0) {
        return { error: true, message: "Id no encontrado", codigo: 404 }
    } else {
        const newDepartaments = departaments.filter(departament => departament.id !== id)
        const { errorSave, messageSave } = await saveAllEntities(newDepartaments, departamentsPath)
        if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }
        return departamentAEliminar[0]
    }
}

export const logicDelete = async (id: string) => {
    const response = await allEntities(departamentsPath)
    if (response.errorGet) return { error: true, message: response.messageGet, codigo: 500 }
    const departaments: Departament[] = response

    const departamentIndex = departaments.findIndex(departament => departament.id === id)
    if (departamentIndex === -1) return { error: true, message: "Id no encontrado", codigo: 404 }

    const dischargeDate = {
        dischargeDate: new Date().toISOString()
    }

    departaments[departamentIndex] = {
        ...departaments[departamentIndex],
        ...dischargeDate
    }

    const { errorSave, messageSave } = await saveAllEntities(departaments, departamentsPath)
    if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

    return departaments[departamentIndex]
}

