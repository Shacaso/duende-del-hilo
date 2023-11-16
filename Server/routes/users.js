import { Router } from 'express'

import { UserController } from '../controllers/UserController.js'

export const usersRouter = Router()

usersRouter.get('/', UserController.getAll)

usersRouter.get('/:id', UserController.getById)

usersRouter.post('/', UserController.create)

usersRouter.delete('/:id', UserController.delete)

usersRouter.patch('/:id', UserController.update)

