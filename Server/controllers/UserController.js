import { UserModel } from "../models/usersFromJson.js"
import { validateUser, validateParcialUser } from '../schemas/userSchema.js'

function jsonProcess(data){
    let output = ""
    for (let index = 0; index < data.length; index++) {
        output += data[index].message +". "
        
    }
    return output
}

export class UserController {
    static async getAll(req, res) {
        const users = await UserModel.getAll()
        res.json(users)
    }

    static async getById (req, res) {
        const { id } = req.params
        const user = await UserModel.getById({ id })
        if (user) return res.json(user)
        res.status(404).json({ message: "Usuario no encontrado" })
    }

    static async create(req, res) {

        const result = validateUser(req.body)
    
        if (!result.success) {
            const messageError = jsonProcess(JSON.parse(result.error.message))
            return res.status(422).json({ error: true, message: messageError})
        }
    
        const newUser = await UserModel.create({ input: result.data })
    
        res.status(201).json(newUser)
    }

    static async delete(req, res) {
        const { id } = req.params
    
        const {error, message} = await UserModel.delete({ id })
        
        if (error === true) {
            return res.status(404).json({message})
        }
    
        return res.json({ message })
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