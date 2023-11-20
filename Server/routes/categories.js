import { Router } from 'express'

import { CategoryController } from '../controllers/CategoryController.js'

export const createCategoryRouter = ({ categoryModel }) => {
    const categoriesRouter = Router()

    const categoryController = new CategoryController({ categoryModel })
    
    categoriesRouter.get('/', categoryController.getAll)
    
    categoriesRouter.get('/:id', categoryController.getById)
    
    categoriesRouter.post('/', categoryController.create)
    
    categoriesRouter.delete('/:id', categoryController.delete)
    
    categoriesRouter.patch('/:id', categoryController.update)
    
    categoriesRouter.delete('/ld/:id', categoryController.logicDelete)

    return categoriesRouter
}
