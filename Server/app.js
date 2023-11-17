import express, { json } from 'express'
import { usersRouter } from './routes/users.js'
import { costumesRouter } from './routes/costumes.js'
import { categoriesRouter } from './routes/categories.js'
import { corsMiddleware } from './middlewares/corsCustom.js'

const app = express()
app.use(json())
app.disable('x-powered-by')
app.use(corsMiddleware())


app.use('/users', usersRouter)

app.use('/costumes', costumesRouter)

app.use('/categories', categoriesRouter)

const port = process.env.PORT ?? 1234

app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`))