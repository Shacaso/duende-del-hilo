import { randomUUID } from "crypto"
import { Client } from "../definitions"
import { allEntities, saveAllEntities } from "./GetAndSaveJson"
import { clientsPath } from "./paths"


export const getAll = async () => {
    const response = await allEntities(clientsPath)
    if (response.errorGet) return { error: true, message: response.messageGet, codigo: 500 }
    return response
}

export const getById = async (id: string) => {
    const response = await allEntities(clientsPath)
    if (response.errorGet) return { error: true, message: response.messageGet, codigo: 500 }

    const clients: Client[] = response

    const client: Client | undefined = clients.find(client => client.id == id)
    if (client) return client

    return { error: true, message: 'Id no encontrado', codigo: 404 }
}

export const create = async (input: Client) => {
    
    const newClient: Client = {
        id: randomUUID(),
        ...input,
        dischargeDate:'',
    }
    
    const response = await allEntities(clientsPath)
    if (response.errorGet) return { error: true, message: response.messageGet, codigo: 500 }
    let clients: Client[] = response

    if (clients) {
        clients.push(newClient)
    } else {
        clients = [newClient]
    }

    const { errorSave, messageSave } = await saveAllEntities(clients, clientsPath)
    if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

    return newClient

}

export const update = async (id: string, input: Client) => {
    const response = await allEntities(clientsPath)
    if (response.errorGet) return { error: true, message: response.messageGet, codigo: 500 }
    const clients: Client[] = response

    const clientIndex = clients.findIndex(client => client.id === id)
    if (clientIndex === -1) return { error: true, message: "Id no encontrado", codigo: 404 }

    clients[clientIndex] = {
        ...clients[clientIndex],
        ...input
    }

    const { errorSave, messageSave } = await saveAllEntities(clients, clientsPath)
    if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

    return clients[clientIndex]
}

export const hardDelete = async (id: string) => {
    const response = await allEntities(clientsPath)
    if (response.errorGet) return { error: true, message: response.message, codigo: 500 }
    const clients: Client[] = response

    const clientAEliminar = clients.filter(client => client.id === id)

    if (clientAEliminar.length === 0) {
        return { error: true, message: "Id no encontrado", codigo: 404 }
    } else {
        const newClients = clients.filter(client => client.id !== id)
        const { errorSave, messageSave } = await saveAllEntities(newClients, clientsPath)
        if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }
        return clientAEliminar[0]
    }
}

export const logicDelete = async (id: string) => {
    const response = await allEntities(clientsPath)
    if (response.errorGet) return { error: true, message: response.messageGet, codigo: 500 }
    const clients: Client[] = response

    const clientIndex = clients.findIndex(client => client.id === id)
    if (clientIndex === -1) return { error: true, message: "Id no encontrado", codigo: 404 }

    const dischargeDate = {
        dischargeDate: new Date().toISOString()
    }

    clients[clientIndex] = {
        ...clients[clientIndex],
        ...dischargeDate
    }

    const { errorSave, messageSave } = await saveAllEntities(clients, clientsPath)
    if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

    return clients[clientIndex]
}

