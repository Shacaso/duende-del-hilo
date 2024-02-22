import { getAllActives } from "@/app/lib/data/entityRepository"
import { clientsPath } from "@/app/lib/data/paths"
import { Client, CustomError } from "@/app/lib/definitions"
import { NextResponse } from "next/server"


export async function GET(req: Request) {
    const response: Client[] | CustomError = await getAllActives<Client>(clientsPath)
    if (response instanceof CustomError) return NextResponse.json(response, { status: response.codigo })
    return NextResponse.json(response)
}