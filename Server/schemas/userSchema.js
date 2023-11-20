import z from 'zod'
import fs from 'node:fs'

const allDepartaments = async () => {
    try {
        const data = await fs.readFileSync('./dbs/departaments.json', { encoding: 'utf-8' })
        if (data) {
            const departaments = JSON.parse(data)
            const nameDepartaments = departaments.map(departament => departament.name)
            return [...nameDepartaments]
        } else {
            return []
        }

    } catch (error) {
        return { message: error.message }
    }
}

const departaments = await allDepartaments()

export const userSchema = z.object({

    name: z.string({
        invalid_type_error: 'El nombre debe ser un string',
        required_error: 'El nombre es requerido'
    }),

    surname: z.string({
        invalid_type_error: 'El apellido debe ser un string',
        required_error: 'El apellido es requerido'
    }),

    dni: z.number({
        invalid_type_error: 'El dni debe ser un numero de 10 digitos',
        required_error: 'El dni es requerido'
    }).int().min(1000000).max(99999999),

    phoneNumber: z.number({
        invalid_type_error: 'El telefono debe ser un numero de 10 digitos',
        required_error: 'El telefono es requerido'
    }).int().min(1000000000).max(9999999999),

    email: z.string().email({
        invalid_type_error: 'El email debe tener el formato correcto',
        required_error: 'El email es requerido'
    }),

    direction: z.string({
        invalid_type_error: 'La direccion debe ser un string',
        required_error: 'La direccion es requerido'
    }),

    departament: z
        .string()
        .refine(value => [...departaments].includes(value), {
            message: 'No se encuenta el departamento en la base de datos',
        }),

    postalCode: z.number({
        invalid_type_error: 'El codigo postal debe ser un numero de 10 digitos',
        required_error: 'El codigo postal es requerido'
    }).int().min(1000).max(99999),

    blacklist: z.boolean({
        invalid_type_error: 'El blacklist debe ser un boolean',
        required_error: 'El blacklist es requerido'
    }),

    dischargeDate: z.string().default("")
})

export function validateUser(object) {
    return userSchema.safeParse(object)
}

export function validateParcialUser(object) {
    return userSchema.partial().safeParse(object)
}
