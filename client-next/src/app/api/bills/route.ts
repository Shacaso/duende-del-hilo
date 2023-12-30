import { create, getAll } from "@/app/lib/data/bills";

export async function GET(req: Request) {
  const response = await getAll()
  return Response.json(response)
}

export async function POST(req: Request) {
  const body = await req.json()
  const response = await create(body)
  return Response.json(response)
}

