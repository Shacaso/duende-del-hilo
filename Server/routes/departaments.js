import { Router } from 'express'
import { DepartamentController } from '../controllers/DepartamentController.js'

export const createDepartamentRouter = ({ departamentModel }) => {
    const departamentsRouter = Router()

    const departamentController = new DepartamentController({ departamentModel })

    departamentsRouter.get('/', departamentController.getAll)

    departamentsRouter.get('/:id', departamentController.getById)

    departamentsRouter.post('/', departamentController.create)

    departamentsRouter.delete('/:id', departamentController.delete)

    departamentsRouter.patch('/:id', departamentController.update)

    departamentsRouter.delete('/ld/:id', departamentController.logicDelete)

    return departamentsRouter
}

