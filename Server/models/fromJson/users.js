import { randomUUID } from 'node:crypto'
import { allEntities, saveAllEntities } from './funcionesGETSAVE.js'

export class UserModel {
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

        if (errorGet) return { error: true, message: messageGet, codigo: 500 }
        const users = messageGet
        const user = users.find(user => user.id == id)
        if (user) return { error: false, message: user }

        return { error: true, message: 'Usuario no encontrado', codigo: 404 }
    }

    create = async ({ input }) => {
        const newUser = {
            id: randomUUID(),
            ...input
        }

        const { errorGet, messageGet } = await allEntities(this.jsonPath)
        if (errorGet) return { error: true, message: messageGet, codigo: 500 }
        const users = messageGet

        if (users) {
            users.push(newUser)
        } else {
            users = [newUser]
        }


        const { errorSave, messageSave } = saveAllEntities(users, this.jsonPath)
        if (errorSave === true) return { error: true, message: messageSave }

        return { error: false, message: newUser }

    }

    update = async ({ id, input }) => {
        const { errorGet, messageGet } = await allEntities(this.jsonPath)
        if (errorGet) return { error: true, message: messageGet, codigo: 500 }
        const users = messageGet

        const userIndex = users.findIndex(user => user.id === id)
        if (userIndex === -1) return { error: true, message: "Id no encontrado", codigo: 404 }

        users[userIndex] = {
            ...users[userIndex],
            ...input
        }

        const { errorSave, messageSave } = await saveAllEntities(users, this.jsonPath)
        if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

        return { error: false, message: users[userIndex] }
    }

    delete = async ({ id }) => {
        const { errorGet, messageGet } = await allEntities(this.jsonPath)
        if (errorGet) return { error: true, message: messageGet, codigo: 500 }
        const users = messageGet

        const userAEliminar = users.filter(user => user.id === id)

        if (userAEliminar.length === 0) {
            return { error: true, message: "Id no encontrado", codigo: 404 }
        } else {
            const newUsers = users.filter(user => user.id !== id)
            const { errorSave, messageSave } = await saveAllEntities(newUsers, this.jsonPath)
            if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }
            return { error: false, message: userAEliminar[0] }
        }
    }

    logicDelete = async ({ id }) => {
        const { errorGet, messageGet } = await allEntities(this.jsonPath)
        if (errorGet) return { error: true, message: messageGet, codigo: 500 }
        const users = messageGet

        const userIndex = users.findIndex(user => user.id === id)
        if (userIndex === -1) return { error: true, message: "Id no encontrado", codigo: 404 }

        const dischargeDate = {
            dischargeDate: new Date().toISOString()
        }

        users[userIndex] = {
            ...users[userIndex],
            ...dischargeDate
        }

        const { errorSave, messageSave } = await saveAllEntities(users, this.jsonPath)
        if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

        return { error: false, message: users[userIndex] }
    }
}
