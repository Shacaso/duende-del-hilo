import { Router } from 'express'

import { CostumeController } from '../controllers/CostumeController.js'

export const costumesRouter = Router()

costumesRouter.get('/', CostumeController.getAll)

costumesRouter.get('/:id', CostumeController.getById)

costumesRouter.post('/', CostumeController.create)

costumesRouter.delete('/:id', CostumeController.delete)

costumesRouter.patch('/:id', CostumeController.update)

costumesRouter.delete('/ld/:id', CostumeController.logicDelete)