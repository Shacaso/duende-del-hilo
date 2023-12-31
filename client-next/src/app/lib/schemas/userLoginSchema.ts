import { z } from 'zod'
import { UserLogin } from '../definitions'

const categorySchema = z.object({

    user: z.string({
        invalid_type_error: 'El usuario debe ser un string',
        required_error: 'El usuario es requerida'
    }),

    password: z.string({
        invalid_type_error: 'La contraseña debe ser un string',
        required_error: 'La contraseña es requerida'
    })

})

export function validateUserLogin(object: UserLogin) {
    return categorySchema.safeParse(object)
}

export function validateParcialUserLogin(object: UserLogin) {
    return categorySchema.partial().safeParse(object)
}
