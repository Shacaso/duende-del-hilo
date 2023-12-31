import { z } from 'zod'
import { Departament, Entity } from '../definitions'

export const departamentSchema = z.object({

    name: z.string({
        invalid_type_error: 'El nombre del departamento debe ser un string',
        required_error: 'El nombre del departamento es requerido'
    }),

    dischargeDate: z.string().default("")

})


export function validateDepartament(object: Departament) {
    return departamentSchema.safeParse(object)
}

export function validateParcialDepartament(object: Departament) {
    return departamentSchema.partial().safeParse(object)
}
