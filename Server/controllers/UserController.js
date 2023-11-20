import { UserModel } from "../models/fromJson/users.js"
import { validateUser, validateParcialUser } from '../schemas/userSchema.js'
import { jsonProcess } from "../utils/funciones.js"

export class UserController {
    static async getAll(req, res) {
        const users = await UserModel.getAll()
        res.json(users)
    }

    static async getById (req, res) {
        const { id } = req.params
        const { error, message } = await UserModel.getById({ id })
        
        if (error === true) {
            res.status(404).json({ error: error, message: message })
        } else {
            res.status(200).json(message)
        }
    }

    static async create(req, res) {

        const result = validateUser(req.body)
    
        if (!result.success) {
            const messageError = jsonProcess(JSON.parse(result.error.message))
            return res.status(422).json({ error: true, message: messageError})
        }
    
        const { error, message } = await UserModel.create({ input: result.data })
    
        if (error === true) res.status(404).json({ error: error, message: message })

        res.status(201).json(message)
    }

    static async delete(req, res) {
        const { id } = req.params
    
        const {error, message} = await UserModel.delete({ id })
        
        if (error === true) {
            return res.status(404).json({error: error, message: message})
        }
    
        return res.json(message)
    }

    static async update(req, res)  {
        const result = validateParcialUser(req.body)
    
        if (!result.success) {
            const messageError = jsonProcess(JSON.parse(result.error.message))
            return res.status(400).json({ error: true, message: messageError})
        }
    
        const { id } = req.params
        
        const {error, message} = await UserModel.update({ id, input: result.data })

        if (error === true) {
            return res.status(404).json({ error: true, message: message})
        }
    
        return res.json(message)
    }
}