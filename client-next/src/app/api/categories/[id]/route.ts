import { getById, logicDelete, update } from "@/app/lib/data/entityRepository";
import { jsonProcess } from "@/app/lib/data/funciones";
import { categoriesPath } from "@/app/lib/data/paths";
import { Category, CustomError } from "@/app/lib/definitions";
import { validateParcialCategory } from "@/app/lib/schemas/categorySchema";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: any }) {
    const id = context.params.id
    const response: Category | CustomError = await getById<Category>(id, categoriesPath)
    if (response instanceof CustomError) return NextResponse.json(response, { status: response.codigo })
    return NextResponse.json(response)
}

export async function PATCH(req: Request, context: { params: any }) {
    const id = context.params.id
    const body: Category = await req.json()

    const result = validateParcialCategory(body)

    if (!result.success) {
        const messageError = jsonProcess(JSON.parse(result.error.message))
        return NextResponse.json({ error: true, message: messageError }, { status: 400 })
    }

    const response: Category | CustomError = await update<Category>(id, body, categoriesPath)
    if (response instanceof CustomError) return NextResponse.json(response, { status: response.codigo })
    return NextResponse.json(response)
}

export async function DELETE(req: Request, context: { params: any }) {
    const id = context.params.id
    const response: Category | CustomError = await logicDelete<Category>(id, categoriesPath)
    if (response instanceof CustomError) return NextResponse.json(response, { status: response.codigo })
    return NextResponse.json(response)
}