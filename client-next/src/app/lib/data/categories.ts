import { randomUUID } from "crypto"
import { Category } from "../definitions"
import { allEntities, saveAllEntities } from "./GetAndSaveJson"
import { categoriesPath } from "./paths"


export const getAll = async () => {
    const response = await allEntities(categoriesPath)
    if (response.errorGet) return { error: true, message: response.messageGet, codigo: 500 }
    return response
}

export const getById = async (id: string) => {
    const response = await allEntities(categoriesPath)
    if (response.errorGet) return { error: true, message: response.messageGet, codigo: 500 }

    const categories: Category[] = response

    const category: Category | undefined = categories.find(category => category.id == id)
    if (category) return category

    return { error: true, message: 'Id no encontrado', codigo: 404 }
}

export const create = async (input: Category) => {
    
    const newCategory: Category = {
        id: randomUUID(),
        ...input,
        dischargeDate:'',
    }
    
    const response = await allEntities(categoriesPath)
    if (response.errorGet) return { error: true, message: response.messageGet, codigo: 500 }
    let categories: Category[] = response

    if (categories) {
        categories.push(newCategory)
    } else {
        categories = [newCategory]
    }

    const { errorSave, messageSave } = await saveAllEntities(categories, categoriesPath)
    if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

    return newCategory

}

export const update = async (id: string, input: Category) => {
    const response = await allEntities(categoriesPath)
    if (response.errorGet) return { error: true, message: response.messageGet, codigo: 500 }
    const categories: Category[] = response

    const categoryIndex = categories.findIndex(category => category.id === id)
    if (categoryIndex === -1) return { error: true, message: "Id no encontrado", codigo: 404 }

    categories[categoryIndex] = {
        ...categories[categoryIndex],
        ...input
    }

    const { errorSave, messageSave } = await saveAllEntities(categories, categoriesPath)
    if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

    return categories[categoryIndex]
}

export const hardDelete = async (id: string) => {
    const response = await allEntities(categoriesPath)
    if (response.errorGet) return { error: true, message: response.message, codigo: 500 }
    const categories: Category[] = response

    const categoryAEliminar = categories.filter(category => category.id === id)

    if (categoryAEliminar.length === 0) {
        return { error: true, message: "Id no encontrado", codigo: 404 }
    } else {
        const newCategories = categories.filter(category => category.id !== id)
        const { errorSave, messageSave } = await saveAllEntities(newCategories, categoriesPath)
        if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }
        return categoryAEliminar[0]
    }
}

export const logicDelete = async (id: string) => {
    const response = await allEntities(categoriesPath)
    if (response.errorGet) return { error: true, message: response.messageGet, codigo: 500 }
    const categories: Category[] = response

    const categoryIndex = categories.findIndex(category => category.id === id)
    if (categoryIndex === -1) return { error: true, message: "Id no encontrado", codigo: 404 }

    const dischargeDate = {
        dischargeDate: new Date().toISOString()
    }

    categories[categoryIndex] = {
        ...categories[categoryIndex],
        ...dischargeDate
    }

    const { errorSave, messageSave } = await saveAllEntities(categories, categoriesPath)
    if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

    return categories[categoryIndex]
}

