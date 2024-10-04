import { getById, hardDelete, update } from "@/app/lib/data/entityRepository";
import { jsonProcess } from "@/app/lib/data/funciones";
import { billsPath } from "@/app/lib/data/paths";
import { Bill, CustomError } from "@/app/lib/definitions";
import { validateParcialBill } from "@/app/lib/schemas/billSchema";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: any }) {
	const id = context.params.id;
	const response: Bill | CustomError = await getById<Bill>(id, billsPath);
	if (response instanceof CustomError)
		return NextResponse.json(response, { status: response.codigo });
	return NextResponse.json(response);
}

export async function PATCH(req: Request, context: { params: any }) {
	const id = context.params.id;
	const body: Bill = await req.json();

	const result = validateParcialBill(body);

	if (!result.success) {
		const messageError = jsonProcess(JSON.parse(result.error.message));
		return NextResponse.json(
			{ error: true, message: messageError },
			{ status: 400 }
		);
	} else if (Object.values(result.data).length === 0) {
		const messageError = "No se proporcionaron atributos válidos";
		return NextResponse.json(
			{ error: true, message: messageError },
			{ status: 400 }
		);
	}

	const response: Bill | CustomError = await update<Bill>(id, body, billsPath);
	if (response instanceof CustomError)
		return NextResponse.json(response, { status: response.codigo });
	return NextResponse.json(response);
}

export async function DELETE(req: Request, context: { params: any }) {
	const id = context.params.id;
	const response: Bill | CustomError = await hardDelete<Bill>(id, billsPath);
	if (response instanceof CustomError)
		return NextResponse.json(response, { status: response.codigo });
	return NextResponse.json(response);
}
