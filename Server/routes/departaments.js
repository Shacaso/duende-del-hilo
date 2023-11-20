import { Router } from 'express'

import { DepartamentController } from '../controllers/DepartamentController.js'

export const departamentsRouter = Router()

departamentsRouter.get('/', DepartamentController.getAll)

departamentsRouter.get('/:id', DepartamentController.getById)

departamentsRouter.post('/', DepartamentController.create)

departamentsRouter.delete('/:id', DepartamentController.delete)

departamentsRouter.patch('/:id', DepartamentController.update)

departamentsRouter.delete('/ld/:id', DepartamentController.logicDelete)
