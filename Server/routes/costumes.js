import { Router } from 'express'

import { CostumeController } from '../controllers/CostumeController.js'

export const createCostumeRouter = ({ costumeModel }) => {
    const costumesRouter = Router()
    
    const costumeController = new CostumeController({ costumeModel })

    costumesRouter.get('/', costumeController.getAll)
    
    costumesRouter.get('/:id', costumeController.getById)
    
    costumesRouter.post('/', costumeController.create)
    
    costumesRouter.delete('/:id', costumeController.delete)
    
    costumesRouter.patch('/:id', costumeController.update)
    
    costumesRouter.delete('/ld/:id', costumeController.logicDelete)

    return costumesRouter
}
