"use server";

import { getPDF } from "@/app/(general)/bill/prueba";
import { create } from "@/app/lib/data/billRepository";
import { getAll } from "@/app/lib/data/entityRepository";
import { jsonProcess } from "@/app/lib/data/funciones";
import { billsPath } from "@/app/lib/data/paths";
import { Bill, BillDto, CustomError } from "@/app/lib/definitions";
import { validateBill } from "@/app/lib/schemas/billSchema";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const response: Bill[] | CustomError = await getAll<Bill>(billsPath);
  if (response instanceof CustomError)
    return NextResponse.json(response, { status: response.codigo });
  return NextResponse.json(response);
}

export async function POST(req: Request) {
  const body: BillDto = await req.json();

  const result = validateBill(body);

  if (!result.success) {
    const messageError = jsonProcess(JSON.parse(result.error.message));
    console.log(messageError);
    return NextResponse.json(
      { error: true, message: messageError },
      { status: 400 }
    );
  }

  const response: Bill | CustomError = await create(body, billsPath);
  if (response instanceof CustomError) {
    console.log(response.message);
    return NextResponse.json(response, { status: response.codigo });
  }

  await getPDF(response);
  //new Mailer(response.client.email).sendEmail();

  return NextResponse.json(response, { status: 201 });
}
