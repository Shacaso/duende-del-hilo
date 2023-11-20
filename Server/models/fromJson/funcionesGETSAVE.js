import fs from 'node:fs'

export async function allEntities(path) {
    try {
        const data = await fs.readFileSync(path, 'utf-8')

        if (data) {
            const entities = JSON.parse(data)
            return { errorGet: false, messageGet: entities }
        } else {
            const entities = []
            return { errorGet: false, messageGet: entities }
        }

    } catch (error) {
        return { errorGet: true, messageGet: error.message }
    }
}

export async function saveAllEntities(data, path) {
    try {
        const jsonData = JSON.stringify(data, null, 2)

        await fs.writeFileSync(path, jsonData, 'utf-8')

        return { errorSave: false, messageSave: null }
    } catch (error) {
        return { errorSave: true, message: error.message }
    }
}