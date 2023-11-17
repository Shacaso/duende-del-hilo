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
        
    } catch (error) {
        return { message: error.message }
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
        if (costume) return costume

        return { message: 'Disfraz no encontrado' }
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


        const bool = saveAllCostumes(costumes)
        //if (bool) console.log("Guardado")

        return newCostume

    }

    static async delete({ id }) {
        const costumes = await allCostumes()

        const costumeAEliminar = costumes.filter(costume => costume.id === id)
        
        if(costumeAEliminar.length===0) {
            return {error: true, message:"Id no encontrado"}
        } else {
            const newCostumes = costumes.filter(costume => costume.id !== id)
            await saveAllCostumes(newCostumes)
            return {error: false, message:costumeAEliminar}
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

        await saveAllCostumes(costumes)

        return {error: false, message:costumes[costumeIndex]}
    }
}
