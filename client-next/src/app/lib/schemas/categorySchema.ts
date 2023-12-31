import { z } from 'zod'
import { Category } from '../definitions'

const categorySchema = z.object({

    name: z.string({
        invalid_type_error: 'La categoria debe ser un string',
        required_error: 'La categoria es requerido'
    }),

    dischargeDate: z.string().default("")

})

export function validateCategory(object: Category) {
    return categorySchema.safeParse(object)
}

export function validateParcialCategory(object: Category) {
    return categorySchema.partial().safeParse(object)
}
