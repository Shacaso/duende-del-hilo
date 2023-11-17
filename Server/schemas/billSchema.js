import z from 'zod'
import fs from 'node:fs'

const allUsers = async () => {
    try {
        const data = await fs.readFileSync('./dbs/users.json', { encoding: 'utf-8' })
        if (data) {
            const users = JSON.parse(data)
            const idsUser = users.map(user => user.id)
            return [...idsUser]
        } else {
            return []
        }

    } catch (error) {
        return { message: error.message }
    }
}

const idsUsers = await allUsers()

const billSchema = z.object({

    billNumber: z.number().optional(),

    date: z.date().optional(),

    returned: z.boolean({
        invalid_type_error: 'El valor del atributo devuelto debe ser un booleano'        
    }).default(false),

    amount: z.number({
        invalid_type_error: 'El monto debe ser un numero mayor que 0',
        required_error: 'El monto  es requerido'
    }).positive(),

    idUser: z
        .string()
        .refine(value => [...idsUsers].includes(value), {
            message: 'No se encuenta ese id de Usuario en la base de datos',
        }),

    note: z.string({
        invalid_type_error: 'La nota debe ser un string',
        required_error: 'La nota es requerido'
    })

    /* title: z.string({
        invalid_type_error: 'El titulo de la pelicula debe ser un string',
        required_error: 'El titulo de la pelicula es requerido'
    }),
    year: z.number().int().min(1900).max(2024),
    director: z.string(),
    duration: z.number().int().positive(),
    poster: z.string().url({
        message: 'el poster deber ser una URL valida'
    }),
    genre: z.array(
        z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller','Sci-Fi']),
        {
            required_error: 'El genero es requerido',
            invalid_type_error: 'El genero debe ser alguno de los valores del array de enums de genero'
        }
    ),
    rate: z.number().min(0).max(10).default(5) */
})

export function validateBill(object) {
    return billSchema.safeParse(object)
}

export function validateParcialBill(object) {
    return billSchema.partial().safeParse(object)
}
