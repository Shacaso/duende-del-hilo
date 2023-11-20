import { randomUUID } from 'node:crypto'
import { allEntities, saveAllEntities } from './funcionesGETSAVE.js'

const path = './dbs/categories.json'

export class CategoryModel {
    static async getAll() {
        const { errorGet, messageGet } = await allEntities(path)
        if (errorGet) return { error: true, message: messageGet, codigo: 500 }
        return { error: false, message: messageGet }
    }

    static async getById({ id }) {
        const { errorGet, messageGet } = await allEntities(path)
        if (errorGet) return { error: true, message: messageGet, codigo: 500 }
        const categories = messageGet

        const category = categories.find(category => category.id == id)
        if (category) return { error: false, message: category }

        return { error: true, message: 'Categoria no encontrado', codigo: 404 }
    }

    static async create({ input }) {
        const newCategory = {
            id: randomUUID(),
            ...input
        }

        const { errorGet, messageGet } = await allEntities(path)
        if (errorGet) return { error: true, message: messageGet, codigo: 500 }
        const categories = messageGet

        if (categories) {
            categories.push(newCategory)
        } else {
            categories = [newCategory]
        }

        const { errorSave, messageSave } = await saveAllEntities(categories, path)
        if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

        return { error: false, message: newCategory }

    }

    static async delete({ id }) {
        const { errorGet, messageGet } = await allEntities(path)
        if (errorGet) return { error: true, message: messageGet, codigo: 500 }
        const categories = messageGet

        const categoryAEliminar = categories.filter(category => category.id === id)

        if (categoryAEliminar.length === 0) {
            return { error: true, message: "Id no encontrado", codigo: 404 }
        } else {
            const newCategories = categories.filter(category => category.id !== id)
            const { errorSave, messageSave } = await saveAllEntities(newCategories, path)
            if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }
            return { error: false, message: categoryAEliminar[0] }
        }
    }

    static async update({ id, input }) {
        const { errorGet, messageGet } = await allEntities(path)
        if (errorGet) return { error: true, message: messageGet, codigo: 500 }
        const categories = messageGet

        const categoryIndex = categories.findIndex(category => category.id === id)
        if (categoryIndex === -1) return { error: true, message: "Id no encontrado", codigo: 404 }

        categories[categoryIndex] = {
            ...categories[categoryIndex],
            ...input
        }

        const { errorSave, messageSave } = await saveAllEntities(categories, path)
        if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

        return { error: false, message: categories[categoryIndex] }
    }

    static async logicDelete({ id }) {
        const { errorGet, messageGet } = await allEntities(path)
        if (errorGet) return { error: true, message: messageGet, codigo: 500 }
        const categories = messageGet

        const categoryIndex = categories.findIndex(category => category.id === id)
        if (categoryIndex === -1) return { error: true, message: "Id no encontrado", codigo: 404 }

        const dischargeDate = {
            dischargeDate: new Date().toISOString()
        }

        categories[categoryIndex] = {
            ...categories[categoryIndex],
            ...dischargeDate
        }

        const { errorSave, messageSave } = await saveAllEntities(categories, path)
        if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

        return { error: false, message: categories[categoryIndex] }
    }
}
