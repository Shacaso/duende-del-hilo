import { CostumeModel } from "../models/fromJson/costumes.js"
import { validateCostume, validateParcialCostume } from '../schemas/costumeSchema.js'
import { jsonProcess } from "../utils/funciones.js"

export class CostumeController {
    static async getAll(req, res) {
        const { error, message, codigo } = await CostumeModel.getAll()
        if (error === true) {
            res.status(codigo).json({ error: error, message: message })
        } else {
            res.status(200).json(message)
        }
    }

    static async getById(req, res) {
        const { id } = req.params
        const { error, message, codigo } = await CostumeModel.getById({ id })

        if (error === true) {
            res.status(codigo).json({ error: error, message: message })
        } else {
            res.status(200).json(message)
        }
    }

    static async create(req, res) {

        const result = validateCostume(req.body)

        if (!result.success) {
            const messageError = jsonProcess(JSON.parse(result.error.message))
            return res.status(422).json({ error: true, message: messageError })
        }

        const { error, message, codigo } = await CostumeModel.create({ input: result.data })

        if (error === true) res.status(codigo).json({ error: error, message: message })

        res.status(201).json(message)
    }

    static async delete(req, res) {
        const { id } = req.params

        const { error, message, codigo } = await CostumeModel.delete({ id })

        if (error === true) {
            return res.status(codigo).json({ error: error, message: message })
        }

        return res.json(message)
    }

    static async update(req, res) {
        const result = validateParcialCostume(req.body)

        if (!result.success) {
            const messageError = jsonProcess(JSON.parse(result.error.message))
            return res.status(400).json({ error: true, message: messageError })
        }

        const { id } = req.params

        const { error, message, codigo } = await CostumeModel.update({ id, input: result.data })

        if (error === true) {
            return res.status(codigo).json({ error: true, message: message })
        }

        return res.json(message)
    }

    static async logicDelete(req, res) {
        const { id } = req.params

        const { error, message, codigo } = await CostumeModel.logicDelete({ id })

        if (error === true) {
            return res.status(codigo).json({ error: error, message: message })
        }

        return res.json(message)
    }
}