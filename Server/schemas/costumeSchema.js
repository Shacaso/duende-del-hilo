import z from 'zod'
import fs from 'node:fs'


const allCategories = async () => {
    try {
        const data = await fs.readFileSync('./dbs/categories.json', { encoding: 'utf-8' })

        if (data) {
            const categories = JSON.parse(data)
            const nameCategories = categories.map(category => category.name)
            return [...nameCategories]
        } else {
            return []
        }

    } catch (error) {
        return { message: error.message }
    }
}

const categories = await allCategories();

const costumeSchema = z.object({

    name: z.string({
        invalid_type_error: 'El nombre debe ser un string',
        required_error: 'El nombre es requerido'
    }),

    price: z.coerce.number({
        invalid_type_error: 'El precio debe ser un numero mayor que 0',
        required_error: 'El precio es requerido'
    }).positive({
        message: "El precio debe ser mayor que 0"
    }),

    category: z
        .string()
        .refine(value => [...categories].includes(value), {
            message: 'No se encuenta la categoria en la base de datos',
        }),

    details: z.string({
        invalid_type_error: 'Los detalles debe ser un string',
        required_error: 'Los detalles son requeridos'
    }),

    dischargeDate: z.string().default("")

})

export function validateCostume(object) {
    return costumeSchema.safeParse(object)
}

export function validateParcialCostume(object) {
    return costumeSchema.partial().safeParse(object)
}
