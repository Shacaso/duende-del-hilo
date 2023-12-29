import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { costumesPath } from "@/app/lib/data/paths";
import { allEntities } from "@/app/lib/data/GetAndSaveJson";

export async function GET(req: NextApiRequest) {
  const costumes = await allEntities(costumesPath)
  return NextResponse.json(costumes)
}

export function POST(req: NextApiRequest) {
  return NextResponse.json({hola:'post'})
}

