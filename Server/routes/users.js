import { Router } from 'express'
import { UserController } from '../controllers/UserController.js'

export const createUserRouter = ({ userModel }) => {
    const usersRouter = Router()

    const userController = new UserController({ userModel })
    
    usersRouter.get('/', userController.getAll)
    
    usersRouter.get('/:id', userController.getById)
    
    usersRouter.post('/', userController.create)
    
    usersRouter.delete('/:id', userController.delete)
    
    usersRouter.patch('/:id', userController.update)
    
    usersRouter.delete('/ld/:id', userController.logicDelete)

    return usersRouter
}

