import { getById, logicDelete, update } from "@/app/lib/data/entityRepository";
import { jsonProcess } from "@/app/lib/data/funciones";
import { departamentsPath } from "@/app/lib/data/paths";
import { Departament, CustomError, Entity } from "@/app/lib/definitions";
import { validateParcialDepartament } from "@/app/lib/schemas/departamentSchema";
import { NextResponse } from "next/server";
import { departamentSchema } from "@/app/lib/schemas/departamentSchema";

export async function GET(req: Request, context: { params: any }) {
    const id = context.params.id
    const response: Departament | CustomError = await getById<Departament>(id, departamentsPath)
    if (response instanceof CustomError) return NextResponse.json(response, { status: response.codigo })
    return NextResponse.json(response)
}

export async function PATCH(req: Request, context: { params: any }) {
    const id = context.params.id
    const body: Departament = await req.json()

    const result = validateParcialDepartament(body)

    if (!result.success) {
        const messageError = jsonProcess(JSON.parse(result.error.message))
        return NextResponse.json({ error: true, message: messageError }, { status: 400 })
    }

    const response: Departament | CustomError = await update<Departament>(id, body, departamentsPath)
    if (response instanceof CustomError) return NextResponse.json(response, { status: response.codigo }) 

    return NextResponse.json(response)
}

export async function DELETE(req: Request, context: { params: any }) {
    const id = context.params.id
    const response: Departament | CustomError = await logicDelete<Departament>(id, departamentsPath)
    if (response instanceof CustomError) return NextResponse.json(response, { status: response.codigo }) 
    return NextResponse.json(response)
}
