import { randomUUID } from 'node:crypto'
import fs from 'node:fs'

async function allUsers() {
    try {
        const data = await fs.readFileSync('./dbs/users.json', 'utf-8')

        const users = JSON.parse(data)
        return users

    } catch (error) {
        return { message: error.message }
    }
}

async function saveAllUsers(data) {
    try {
        const jsonData = JSON.stringify(data, null, 2)

        await fs.writeFileSync('./dbs/users.json', jsonData, 'utf-8')
        
    } catch (error) {
        return { message: error.message }
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
        if (user) return user

        return { message: 'Usuario no encontrado' }
    }

    static async create({ input }) {
        const newUser = {
            id: randomUUID(),
            ...input
        }

        const users = await allUsers()

        users.push(newUser)

        const bool = saveAllUsers(users)
        //if (bool) console.log("Guardado")

        return newUser

    }

    static async delete({ id }) {
        const users = await allUsers()

        const userAEliminar = users.filter(user => user.id === id)
        
        if(userAEliminar.length===0) {
            return {error: true, message:"Id no encontrado"}
        } else {
            const newUsers = users.filter(user => user.id !== id)
            await saveAllUsers(newUsers)
            return {error: false, message:"Usuario Eliminado"}
        }
    }

    static async update({ id, input }) {
        const users = await allUsers()

        const userIndex = users.findIndex(user => user.id === id)
        if (userIndex === -1) return {error: true, message:"Id no encontrado"}

        users[userIndex] = {
            ...users[userIndex],
            ...input
        }

        await saveAllUsers(users)

        return {error: false, message:users[userIndex]}
    }
}
