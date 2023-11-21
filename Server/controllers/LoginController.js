

export class LoginController {
    constructor({ loginModel }){
        this.loginModel = loginModel
    }

    login = async (req, res) => {
        const { error, message, codigo } = await this.loginModel.login({ input: req.body })
        if (error === true) {
            res.status(codigo).json({ error: error, message: message })
        } else {
            res.status(200).json(message)
        }
        
    }

    changePassword = async (req, res) => {
       /*  const result = validateParcialLogin(req.body)

        if (!result.success) {
            const messageError = jsonProcess(JSON.parse(result.error.message))
            return res.status(404).json({ error: true, message: messageError })
        } */

        const { error, message, codigo } = await this.loginModel.changePassword({ input: req.body })

        if (error === true) {
            return res.status(codigo).json({ error: true, message: message })
        }

        return res.json(message)
    }

}