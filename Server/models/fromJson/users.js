import { randomUUID } from 'node:crypto'
import fs from 'node:fs'

async function allUsers() {
    try {
        const data = await fs.readFileSync('./dbs/users.json', 'utf-8')

        if (data) {
            const users = JSON.parse(data)
            return users
        } else {
            return []
        }

    } catch (error) {
        return { message: error.message }
    }
}

async function saveAllUsers(data) {
    try {
        const jsonData = JSON.stringify(data, null, 2)

        await fs.writeFileSync('./dbs/users.json', jsonData, 'utf-8')

        return { error: false, messageSave: null }
    } catch (error) {
        return { error: true, message: error.message }
    }
}

export class UserModel {
    static async getAll() {
        const users = await allUsers()
        return users
    }

    static async getById({ id }) {
        const users = await allUsers()

        const user = users.find(user => user.id == id)
        if (user) return { error: false, message: user}

        return { error: true, message: 'Usuario no encontrado' }
    }

    static async create({ input }) {
        const newUser = {
            id: randomUUID(),
            ...input
        }

        const users = await allUsers()

        if (users) {
            users.push(newUser)
        } else {
            users = [newUser]
        }


        const { error, messageSave } = saveAllUsers(users)
        if (error === true) return { error: true, message: messageSave }

        return { error: false, message: newUser}

    }

    static async delete({ id }) {
        const users = await allUsers()

        const userAEliminar = users.filter(user => user.id === id)

        if (userAEliminar.length === 0) {
            return { error: true, message: "Id no encontrado" }
        } else {
            const newUsers = users.filter(user => user.id !== id)
            const { error, messageSave } = await saveAllUsers(newUsers)
            if (error === true) return { error: true, message: messageSave }
            return { error: false, message: userAEliminar[0] }
        }
    }

    static async update({ id, input }) {
        const users = await allUsers()

        const userIndex = users.findIndex(user => user.id === id)
        if (userIndex === -1) return { error: true, message: "Id no encontrado" }

        users[userIndex] = {
            ...users[userIndex],
            ...input
        }

        const { error, messageSave } = await saveAllUsers(users)
        if (error === true) return { error: true, message: messageSave }
        
        return { error: false, message: users[userIndex] }
    }
}
