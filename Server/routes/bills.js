import { Router } from 'express'

import { BillController } from '../controllers/BillController.js'

export const billsRouter = Router()

billsRouter.get('/', BillController.getAll)

billsRouter.get('/:id', BillController.getById)

billsRouter.post('/', BillController.create)

billsRouter.delete('/:id', BillController.delete)

billsRouter.patch('/:id', BillController.update)

billsRouter.delete('/ld/:id', BillController.logicDelete)
