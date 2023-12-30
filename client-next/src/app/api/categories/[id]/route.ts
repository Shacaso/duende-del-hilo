import { getById, logicDelete, update } from "@/app/lib/data/categories";

export async function GET(req: Request, context: { params: any }) {
    const id = context.params.id
    const response = await getById(id)
    return Response.json(response)
}

export async function PATCH(req: Request, context: { params: any }) {
    const id = context.params.id
    const body = await req.json()
    const response = await update(id, body)
    return Response.json(response)
}

export async function DELETE(req: Request, context: { params: any }) {
    const id = context.params.id
    const response = await logicDelete(id)
    return Response.json(response)
}