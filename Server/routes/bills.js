import { Router } from 'express'
import { BillController } from '../controllers/BillController.js'

export const createBillRouter = ({ billModel }) => {
    const billsRouter = Router()

    const billController = new BillController({ billModel })

    billsRouter.get('/', billController.getAll)

    billsRouter.get('/:id', billController.getById)

    billsRouter.post('/', billController.create)

    billsRouter.delete('/:id', billController.delete)

    billsRouter.patch('/:id', billController.update)

    billsRouter.delete('/ld/:id', billController.logicDelete)

    return billsRouter
}

