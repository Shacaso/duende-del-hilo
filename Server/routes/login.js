import { Router } from "express"
import { LoginController } from "../controllers/LoginController.js"

export const createLoginRouter = ({ loginModel }) => {

    const loginRouter = Router()

    const loginController = new LoginController({ loginModel })

    loginRouter.post('/', loginController.login)

    loginRouter.patch('/changePass', loginController.changePassword)

    return loginRouter
}