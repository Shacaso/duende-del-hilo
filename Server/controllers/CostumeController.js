import { CostumeModel } from "../models/fromJson/costumes.js"
import { validateCostume, validateParcialCostume } from '../schemas/costumeSchema.js'
import { jsonProcess } from "../utils/funciones.js"

export class CostumeController {
    static async getAll(req, res) {
        const costumes = await CostumeModel.getAll()
        res.json(costumes)
    }

    static async getById (req, res) {
        const { id } = req.params
        const costume = await CostumeModel.getById({ id })
        if (costume) return res.json(costume)
        res.status(404).json({ message: "Categoria no encontrado" })
    }

    static async create(req, res) {

        const result = validateCostume(req.body)
    
        if (!result.success) {
            const messageError = jsonProcess(JSON.parse(result.error.message))
            return res.status(422).json({ error: true, message: messageError})
        }
    
        const newCostume = await CostumeModel.create({ input: result.data })
    
        res.status(201).json(newCostume)
    }

    static async delete(req, res) {
        const { id } = req.params
    
        const {error, message} = await CostumeModel.delete({ id })
        
        if (error === true) {
            return res.status(404).json({error: error, message: message})
        }
    
        return res.json(message)
    }

    static async update(req, res)  {
        const result = validateParcialCostume(req.body)
    
        if (!result.success) {
            const messageError = jsonProcess(JSON.parse(result.error.message))
            return res.status(400).json({ error: true, message: messageError})
        }
    
        const { id } = req.params
        
        const {error, message} = await CostumeModel.update({ id, input: result.data })

        if (error === true) {
            return res.status(404).json({ error: true, message: message})
        }
    
        return res.json(message)
    }
}