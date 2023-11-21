import express, { json } from 'express'
import { corsMiddleware } from './middlewares/corsCustom.js'
import * as Routes from './routes/index.js'

export const createApp = ({ models }) => {
    const app = express()
    app.use(json())
    app.disable('x-powered-by')
    app.use(corsMiddleware())
    
    
    app.use('/users', Routes.createUserRouter({ userModel: models.userModel }))
    
    app.use('/costumes', Routes.createCostumeRouter({ costumeModel: models.costumeModel }))
    
    app.use('/categories', Routes.createCategoryRouter({ categoryModel: models.categoryModel }))
    
    app.use('/departaments', Routes.createDepartamentRouter({ departamentModel: models.departamentModel }))
    
    app.use('/bills', Routes.createBillRouter({ billModel: models.billModel}))

    app.use('/login', Routes.createLoginRouter({ loginModel: models.loginModel }))
    
    const port = process.env.PORT ?? 1234
    
    app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`))
}

