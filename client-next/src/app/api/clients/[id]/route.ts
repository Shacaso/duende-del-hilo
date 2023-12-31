import { getById, logicDelete, update } from "@/app/lib/data/entityRepository";
import { jsonProcess } from "@/app/lib/data/funciones";
import { clientsPath } from "@/app/lib/data/paths";
import { Client, CustomError } from "@/app/lib/definitions";
import { validateParcialClient } from "@/app/lib/schemas/clientSchema";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: any }) {
    const id = context.params.id
    const response: Client | CustomError = await getById<Client>(id, clientsPath)
    if (response instanceof CustomError) return NextResponse.json(response, { status: response.codigo })
    return NextResponse.json(response)
}

export async function PATCH(req: Request, context: { params: any }) {
    const id = context.params.id
    const body: Client = await req.json()

    const result = validateParcialClient(body)

    if (!result.success) {
        const messageError = jsonProcess(JSON.parse(result.error.message))
        return NextResponse.json({ error: true, message: messageError }, { status: 400 })
    }

    const response: Client | CustomError = await update<Client>(id, body, clientsPath)
    if (response instanceof CustomError) return NextResponse.json(response, { status: response.codigo })
    return NextResponse.json(response)
}

export async function DELETE(req: Request, context: { params: any }) {
    const id = context.params.id
    const response: Client | CustomError = await logicDelete<Client>(id, clientsPath)
    if (response instanceof CustomError) return NextResponse.json(response, { status: response.codigo })
    return NextResponse.json(response)
}