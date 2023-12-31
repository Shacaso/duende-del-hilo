import { create, getAll } from "@/app/lib/data/entityRepository";
import { Client, CustomError } from "@/app/lib/definitions";
import { clientsPath } from "@/app/lib/data/paths";
import { NextResponse } from "next/server";
import { validateClient } from "@/app/lib/schemas/clientSchema";
import { jsonProcess } from "@/app/lib/data/funciones";

export async function GET(req: Request) {
  const response: Client[] | CustomError = await getAll<Client>(clientsPath)
  if (response instanceof CustomError) return NextResponse.json(response, { status: response.codigo })
  return NextResponse.json(response)
}

export async function POST(req: Request) {
  const body: Client = await req.json()

  const result = validateClient(body)

  if (!result.success) {
    const messageError = jsonProcess(JSON.parse(result.error.message))
    return NextResponse.json({error: true, message: messageError}, { status: 400 })
  }

  const response: Client | CustomError = await create<Client>(body, clientsPath)
  if (response instanceof CustomError) return NextResponse.json(response, { status: response.codigo })
  return NextResponse.json(response)
}
