import z from 'zod'

const userSchema = z.object({

    name: z.string({
        invalid_type_error: 'El nombre debe ser un string',
        required_error: 'El nombre es requerido'
    }),

    telefono: z.number({
        invalid_type_error: 'El telefono debe ser un numero de 10 digitos',
        required_error: 'El telefono es requerido'
    }).int().min(1000000000).max(9999999999)

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

export function validateUser(object){
    return userSchema.safeParse(object)
}

export function validateParcialUser(object){
    return userSchema.partial().safeParse(object)
}
