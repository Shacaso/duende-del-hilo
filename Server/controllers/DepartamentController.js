import { DepartamentModel } from "../models/fromJson/departaments.js"
import { validateDepartament, validateParcialDepartament } from '../schemas/departamentSchema.js'
import { jsonProcess } from "../utils/funciones.js"

export class DepartamentController {
    static async getAll(req, res) {
        const { error, message, codigo } = await DepartamentModel.getAll()
        if (error === true) {
            res.status(codigo).json({ error: error, message: message })
        } else {
            res.status(200).json(message)
        }
    }

    static async getById(req, res) {
        const { id } = req.params
        const { error, message, codigo } = await DepartamentModel.getById({ id })

        if (error === true) {
            res.status(codigo).json({ error: error, message: message })
        } else {
            res.status(200).json(message)
        }
    }

    static async create(req, res) {

        const result = validateDepartament(req.body)

        if (!result.success) {
            const messageError = jsonProcess(JSON.parse(result.error.message))
            return res.status(422).json({ error: true, message: messageError })
        }

        const { error, message, codigo } = await DepartamentModel.create({ input: result.data })

        if (error === true) res.status(codigo).json({ error: error, message: message })

        res.status(201).json(message)
    }

    static async delete(req, res) {
        const { id } = req.params

        const { error, message, codigo } = await DepartamentModel.delete({ id })

        if (error === true) {
            return res.status(codigo).json({ error: error, message: message })
        }

        return res.json(message)
    }

    static async update(req, res) {
        const result = validateParcialDepartament(req.body)

        if (!result.success) {
            const messageError = jsonProcess(JSON.parse(result.error.message))
            return res.status(400).json({ error: true, message: messageError })
        }

        const { id } = req.params

        const { error, message, codigo } = await DepartamentModel.update({ id, input: result.data })

        if (error === true) {
            return res.status(codigo).json({ error: true, message: message })
        }

        return res.json(message)
    }

    static async logicDelete(req, res) {
        const { id } = req.params

        const { error, message, codigo } = await DepartamentModel.logicDelete({ id })

        if (error === true) {
            return res.status(codigo).json({ error: error, message: message })
        }

        return res.json(message)
    }

}