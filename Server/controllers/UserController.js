import { validateUser, validateParcialUser } from '../schemas/userSchema.js'
import { jsonProcess } from "../utils/funciones.js"

export class UserController {
    constructor ({ userModel }) {
        this.userModel = userModel
    }

    getAll = async (req, res) => {
        const { error, message, codigo } = await this.userModel.getAll()
        if (error === true) res.status(codigo).json({ error: error, message: message })
        
        const { dni, name, surname, email } = req.query
        let users = message
        if(dni){
            users = users.filter(
                user => user.dni === parseInt(dni)
            )
        }

        if(name){
            users = users.filter(
                user => user.name.includes(name)
            )
        }

        if(surname){
            users = users.filter(
                user => user.surname.includes(name)
            )
        }

        if(email){
            users = users.filter(
                user => user.email.includes(email)
            )
        }

        res.status(200).json(users)
        
    }

    getById = async (req, res) => {
        const { id } = req.params
        const { error, message, codigo } = await this.userModel.getById({ id })

        if (error === true) {
            res.status(codigo).json({ error: error, message: message })
        } else {
            res.status(200).json(message)
        }
    }

    create = async (req, res) => {

        const result = validateUser(req.body)

        if (!result.success) {
            const messageError = jsonProcess(JSON.parse(result.error.message))
            return res.status(422).json({ error: true, message: messageError })
        }

        const { error, message, codigo } = await this.userModel.create({ input: result.data })

        if (error === true) res.status(codigo).json({ error: error, message: message })

        res.status(201).json(message)
    }

    delete = async (req, res) => {
        const { id } = req.params

        const { error, message, codigo } = await this.userModel.delete({ id })

        if (error === true) {
            return res.status(codigo).json({ error: error, message: message })
        }

        return res.json(message)
    }

    logicDelete = async (req, res) => {
        const { id } = req.params

        const { error, message, codigo } = await this.userModel.logicDelete({ id })

        if (error === true) {
            return res.status(codigo).json({ error: error, message: message })
        }

        return res.json(message)
    }

    update = async (req, res) => {
        const result = validateParcialUser(req.body)

        if (!result.success) {
            const messageError = jsonProcess(JSON.parse(result.error.message))
            return res.status(400).json({ error: true, message: messageError })
        }

        const { id } = req.params

        const { error, message, codigo } = await this.userModel.update({ id, input: result.data })

        if (error === true) {
            return res.status(codigo).json({ error: true, message: message })
        }

        return res.json(message)
    }
}