import z from 'zod'

const departamentSchema = z.object({

    name: z.string({
        invalid_type_error: 'El nombre del departamento debe ser un string',
        required_error: 'El nombre del departamento es requerido'
    }),

    dischargeDate: z.string().default("")

})

export function validateDepartament(object) {
    return departamentSchema.safeParse(object)
}

export function validateParcialDepartament(object) {
    return departamentSchema.partial().safeParse(object)
}
