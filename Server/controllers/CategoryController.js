import { CategoryModel } from "../models/fromJson/categories.js"
import { validateCategory, validateParcialCategory } from '../schemas/categorySchema.js'
import { jsonProcess } from "../utils/funciones.js"

export class CategoryController {
    static async getAll(req, res) {
        const categories = await CategoryModel.getAll()
        res.json(categories)
    }

    static async getById (req, res) {
        const { id } = req.params
        const category = await CategoryModel.getById({ id })
        if (category) return res.json(category)
        res.status(404).json({ message: "Categoria no encontrado" })
    }

    static async create(req, res) {

        const result = validateCategory(req.body)
    
        if (!result.success) {
            const messageError = jsonProcess(JSON.parse(result.error.message))
            return res.status(422).json({ error: true, message: messageError})
        }
    
        const newCategory = await CategoryModel.create({ input: result.data })
    
        res.status(201).json(newCategory)
    }

    static async delete(req, res) {
        const { id } = req.params
    
        const {error, message} = await CategoryModel.delete({ id })
        
        if (error === true) {
            return res.status(404).json({message})
        }
    
        return res.json(message)
    }

    static async update(req, res)  {
        const result = validateParcialCategory(req.body)
    
        if (!result.success) {
            const messageError = jsonProcess(JSON.parse(result.error.message))
            return res.status(400).json({ error: true, message: messageError})
        }
    
        const { id } = req.params
        
        const {error, message} = await CategoryModel.update({ id, input: result.data })

        if (error === true) {
            return res.status(404).json({ error: true, message: message})
        }
    
        return res.json(message)
    }
}