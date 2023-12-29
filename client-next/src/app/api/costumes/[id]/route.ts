import { NextApiRequest } from "next";
import { NextResponse } from "next/server";


export async function GET(req: NextApiRequest, context: { params: any }) {
    const id = context.params.id
    return NextResponse.json({ get: `id: ${id}` })
}

export async function PATCH(req: NextApiRequest, context: { params: any }) {
    const id = context.params.id
    return NextResponse.json({ patch: `id: ${id}` })
}

export async function DELETE(req: NextApiRequest, context: { params: any }) {
    const id = context.params.id
    return NextResponse.json({ delete: `id: ${id}` })
}