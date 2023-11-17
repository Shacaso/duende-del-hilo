import z from 'zod'

const departamentSchema = z.object({

    name: z.string({
        invalid_type_error: 'El nombre del departamento debe ser un string',
        required_error: 'El nombre del departamento es requerido'
    }),

    

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

export function validateDepartament(object) {
    return departamentSchema.safeParse(object)
}

export function validateParcialDepartament(object) {
    return departamentSchema.partial().safeParse(object)
}
