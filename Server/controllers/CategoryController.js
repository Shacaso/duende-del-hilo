import { validateCategory, validateParcialCategory } from '../schemas/categorySchema.js'
import { jsonProcess } from "../utils/funciones.js"

export class CategoryController {
    constructor ({ categoryModel }) {
        this.categoryModel = categoryModel
    }
    
    getAll = async (req, res) => {
        const { error, message, codigo } = await this.categoryModel.getAll()
        if (error === true) res.status(codigo).json({ error: error, message: message })
        
        let categories = message

        const { name } = req.query

        if(name){
            categories = categories.filter(
                category => category.name.includes(name)
            )
        }

        res.status(200).json(categories)
        
    }

    getById = async (req, res) => {
        const { id } = req.params
        const { error, message, codigo } = await this.categoryModel.getById({ id })

        if (error === true) {
            res.status(codigo).json({ error: error, message: message })
        } else {
            res.status(200).json(message)
        }
    }

    create = async (req, res) => {

        const result = validateCategory(req.body)

        if (!result.success) {
            const messageError = jsonProcess(JSON.parse(result.error.message))
            return res.status(422).json({ error: true, message: messageError })
        }

        const { error, message, codigo } = await this.categoryModel.create({ input: result.data })

        if (error === true) res.status(codigo).json({ error: error, message: message })

        res.status(201).json(message)
    }

    delete = async (req, res) => {
        const { id } = req.params

        const { error, message, codigo } = await this.categoryModel.delete({ id })

        if (error === true) {
            return res.status(codigo).json({ error: error, message: message })
        }

        return res.json(message)
    }

    update = async (req, res) => {
        const result = validateParcialCategory(req.body)

        if (!result.success) {
            const messageError = jsonProcess(JSON.parse(result.error.message))
            return res.status(400).json({ error: true, message: messageError })
        }

        const { id } = req.params

        const { error, message, codigo } = await this.categoryModel.update({ id, input: result.data })

        if (error === true) {
            return res.status(codigo).json({ error: true, message: message })
        }

        return res.json(message)
    }

    logicDelete = async (req, res) => {
        const { id } = req.params

        const { error, message, codigo } = await this.categoryModel.logicDelete({ id })

        if (error === true) {
            return res.status(codigo).json({ error: error, message: message })
        }

        return res.json(message)
    }
}