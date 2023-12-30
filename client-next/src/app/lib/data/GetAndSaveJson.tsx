'use server'
import fs from 'fs/promises'

export async function allEntities(path: string) {
    try {
        const data = await fs.readFile(path, 'utf-8')

        if (data) {
            const entities = JSON.parse(data)
            return entities
        } else {
            const entities: any[] = []
            return entities
        }

    } catch (error) {
        return { errorGet: true, messageGet: error }
    }
}

export async function saveAllEntities(data: any, path: string) {
    try {
        const jsonData = JSON.stringify(data, null, 2)

        await fs.writeFile(path, jsonData, 'utf-8')

        return { errorSave: false, messageSave: 'ok' }
    } catch (error) {
        return { errorSave: true, message: error }
    }
}