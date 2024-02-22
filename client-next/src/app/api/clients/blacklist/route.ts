import { getBlacklistClient } from "@/app/lib/data/clientRepository"
import { Client, CustomError } from "@/app/lib/definitions"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const response: Client[] | CustomError = await getBlacklistClient()
    if (response instanceof CustomError) return NextResponse.json(response, { status: response.codigo })
    return NextResponse.json(response)
}