import express, { json } from 'express'
import { usersRouter } from './routes/users.js'
import { corsMiddleware } from './middlewares/corsCustom.js'

const app = express()
app.use(json())
app.disable('x-powered-by')
app.use(corsMiddleware())


app.use('/users', usersRouter)


const port = process.env.PORT ?? 1234

app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`))