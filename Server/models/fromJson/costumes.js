import { randomUUID } from 'node:crypto'
import fs from 'node:fs'

async function allCostumes() {
    try {
        const data = await fs.readFileSync('./dbs/costumes.json', 'utf-8')

        if(data){
            const costumes = JSON.parse(data)
            return costumes
        } else {
            return []
        }

    } catch (error) {
        return { message: error.message }
    }
}

async function saveAllCostumes(data) {
    try {
        const jsonData = JSON.stringify(data, null, 2)

        await fs.writeFileSync('./dbs/costumes.json', jsonData, 'utf-8')
        
        return { error: false, messageSave: null }
    } catch (error) {
        return { error: true, message: error.message }
    }
}

export class CostumeModel {
    static async getAll() {
        const costumes = await allCostumes()
        return costumes
    }

    static async getById({ id }) {
        const costumes = await allCostumes()

        const costume = costumes.find(costume => costume.id == id)
        if (costume) return { error: false, message: costume}

        return { error: true, message: 'Disfraz no encontrado' }
    }

    static async create({ input }) {
        const newCostume = {
            id: randomUUID(),
            ...input
        }

        const costumes = await allCostumes()

        if(costumes){
            costumes.push(newCostume)
        } else {
            costumes = [newCostume]
        }


        const { error, messageSave } = await saveAllCostumes(costumes)

        if (error === true) return { error: true, message: messageSave }

        return { error: false, message: newCostume }

    }

    static async delete({ id }) {
        const costumes = await allCostumes()

        const costumeAEliminar = costumes.filter(costume => costume.id === id)
        
        if(costumeAEliminar.length===0) {
            return {error: true, message:"Id no encontrado"}
        } else {
            const newCostumes = costumes.filter(costume => costume.id !== id)
            const { error, messageSave } = await saveAllCostumes(newCostumes)
            if (error === true) return { error: true, message: messageSave }
            return {error: false, message:costumeAEliminar[0]}
        }
    }

    static async update({ id, input }) {
        const costumes = await allCostumes()

        const costumeIndex = costumes.findIndex(costume => costume.id === id)
        if (costumeIndex === -1) return {error: true, message:"Id no encontrado"}

        costumes[costumeIndex] = {
            ...costumes[costumeIndex],
            ...input
        }

        const { error, messageSave } = await saveAllCostumes(costumes)
        if (error === true) return { error: true, message: messageSave }

        return {error: false, message:costumes[costumeIndex]}
    }
}
