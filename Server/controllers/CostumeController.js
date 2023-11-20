import { validateCostume, validateParcialCostume } from '../schemas/costumeSchema.js'
import { jsonProcess } from "../utils/funciones.js"

export class CostumeController {
    constructor({ costumeModel }) {
        this.costumeModel = costumeModel
    }

    getAll = async (req, res) => {
        const { error, message, codigo } = await this.costumeModel.getAll()
        if (error === true) {
            res.status(codigo).json({ error: error, message: message })
        } else {
            res.status(200).json(message)
        }
    }

    getById = async (req, res) => {
        const { id } = req.params
        const { error, message, codigo } = await this.costumeModel.getById({ id })

        if (error === true) {
            res.status(codigo).json({ error: error, message: message })
        } else {
            res.status(200).json(message)
        }
    }

    create = async (req, res) => {

        const result = validateCostume(req.body)

        if (!result.success) {
            const messageError = jsonProcess(JSON.parse(result.error.message))
            return res.status(422).json({ error: true, message: messageError })
        }

        const { error, message, codigo } = await this.costumeModel.create({ input: result.data })

        if (error === true) res.status(codigo).json({ error: error, message: message })

        res.status(201).json(message)
    }

    delete = async (req, res) => {
        const { id } = req.params

        const { error, message, codigo } = await this.costumeModel.delete({ id })

        if (error === true) {
            return res.status(codigo).json({ error: error, message: message })
        }

        return res.json(message)
    }

    update = async (req, res) => {
        const result = validateParcialCostume(req.body)

        if (!result.success) {
            const messageError = jsonProcess(JSON.parse(result.error.message))
            return res.status(400).json({ error: true, message: messageError })
        }

        const { id } = req.params

        const { error, message, codigo } = await this.costumeModel.update({ id, input: result.data })

        if (error === true) {
            return res.status(codigo).json({ error: true, message: message })
        }

        return res.json(message)
    }

    logicDelete = async (req, res) => {
        const { id } = req.params

        const { error, message, codigo } = await this.costumeModel.logicDelete({ id })

        if (error === true) {
            return res.status(codigo).json({ error: error, message: message })
        }

        return res.json(message)
    }
}