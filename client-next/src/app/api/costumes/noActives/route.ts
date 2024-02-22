import { getAllNoActives } from "@/app/lib/data/entityRepository"
import { costumesPath } from "@/app/lib/data/paths"
import { Costume, CustomError } from "@/app/lib/definitions"
import { NextResponse } from "next/server"


export async function GET(req: Request) {
  const response: Costume[] | CustomError = await getAllNoActives<Costume>(costumesPath)
  if (response instanceof CustomError) return NextResponse.json(response, { status: response.codigo })
  return NextResponse.json(response)
}