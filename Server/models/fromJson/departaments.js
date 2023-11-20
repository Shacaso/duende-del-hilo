import { randomUUID } from 'node:crypto'
import fs from 'node:fs'

async function allDepartaments() {
    try {
        const data = await fs.readFileSync('./dbs/departaments.json', 'utf-8')

        if(data){
            const departaments = JSON.parse(data)
            return departaments
        } else {
            return []
        }

    } catch (error) {
        return { message: error.message }
    }
}

async function saveAllDepartaments(data) {
    try {
        const jsonData = JSON.stringify(data, null, 2)

        await fs.writeFileSync('./dbs/departaments.json', jsonData, 'utf-8')
        
        return { error: false, messageSave: null }
    } catch (error) {
        return { error: true, message: error.message }
    }
}

export class DepartamentModel {
    static async getAll() {
        const departaments = await allDepartaments()
        return departaments
    }

    static async getById({ id }) {
        const departaments = await allDepartaments()

        const departament = departaments.find(departament => departament.id == id)
        if (departament) return { error: false, message: departament }

        return { error: true, message: 'Departamento no encontrado' }
    }

    static async create({ input }) {
        const newDepartament = {
            id: randomUUID(),
            ...input
        }

        const departaments = await allDepartaments()

        if(departaments){
            departaments.push(newDepartament)
        } else {
            departaments = [newDepartament]
        }

        const { error, messageSave } = saveAllDepartaments(departaments)
        
        if (error === true) return { error: true, message: messageSave }

        return { error: false, message: newDepartament }

    }

    static async delete({ id }) {
        const departaments = await allDepartaments()

        const departamentAEliminar = departaments.filter(departament => departament.id === id)
        
        if(departamentAEliminar.length===0) {
            return {error: true, message:"Id no encontrado"}
        } else {
            const newDepartaments = departaments.filter(departament => departament.id !== id)
            const { error, messageSave } = await saveAllDepartaments(newDepartaments)
            if (error === true) return { error: true, message: messageSave }
            return {error: false, message: departamentAEliminar[0]}
        }
    }

    static async update({ id, input }) {
        const departaments = await allDepartaments()

        const departamentIndex = departaments.findIndex(departament => departament.id === id)
        if (departamentIndex === -1) return {error: true, message:"Id no encontrado"}

        departaments[departamentIndex] = {
            ...departaments[departamentIndex],
            ...input
        }

        const { error, messageSave } = await saveAllDepartaments(departaments)
        if (error === true) return { error: true, message: messageSave }

        return {error: false, message: departaments[departamentIndex]}
    }
}
