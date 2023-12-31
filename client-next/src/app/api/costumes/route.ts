import { create, getAll } from "@/app/lib/data/entityRepository";
import { Costume, CustomError } from "@/app/lib/definitions";
import { costumesPath } from "@/app/lib/data/paths";
import { NextResponse } from "next/server";
import { validateCostume } from "@/app/lib/schemas/costumeSchema";
import { jsonProcess } from "@/app/lib/data/funciones";

export async function GET(req: Request) {
  const response: Costume[] | CustomError = await getAll<Costume>(costumesPath)
  if (response instanceof CustomError) return NextResponse.json(response, { status: response.codigo })
  return NextResponse.json(response)
}

export async function POST(req: Request) {
  const body: Costume = await req.json()

  const result = validateCostume(body)

  if (!result.success) {
    const messageError = jsonProcess(JSON.parse(result.error.message))
    return NextResponse.json({error: true, message: messageError}, { status: 400 })
  }
  
  const response: Costume | CustomError = await create<Costume>(body, costumesPath)
  if (response instanceof CustomError) return NextResponse.json(response, { status: response.codigo })
  return NextResponse.json(response)
  
  
}

