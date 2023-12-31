import { getAll } from "@/app/lib/data/entityRepository";
import { Bill, CustomError } from "@/app/lib/definitions";
import { billsPath } from "@/app/lib/data/paths";
import { NextResponse } from "next/server";
import { validateBill } from "@/app/lib/schemas/billSchema";
import { jsonProcess } from "@/app/lib/data/funciones";
import { create } from "@/app/lib/data/billRepository";

export async function GET(req: Request) {
  const response: Bill[] | CustomError = await getAll<Bill>(billsPath)
  if (response instanceof CustomError) return NextResponse.json(response, { status: response.codigo })
  return NextResponse.json(response)
}

export async function POST(req: Request) {
  const body: Bill = await req.json()

  const result = validateBill(body)

  if (!result.success) {
    const messageError = jsonProcess(JSON.parse(result.error.message))
    return NextResponse.json({error: true, message: messageError}, { status: 400 })
  }

  const response: Bill | CustomError = await create(body, billsPath)
  if (response instanceof CustomError) return NextResponse.json(response, { status: response.codigo })
  return NextResponse.json(response)
}
