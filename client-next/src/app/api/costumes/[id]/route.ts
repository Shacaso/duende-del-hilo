import { update } from "@/app/lib/data/costumeRepository";
import { getById, logicDelete } from "@/app/lib/data/entityRepository";
import { jsonProcess } from "@/app/lib/data/funciones";
import { costumesPath } from "@/app/lib/data/paths";
import { Costume, CostumeDTO, CustomError } from "@/app/lib/definitions";
import { validateParcialCostume } from "@/app/lib/schemas/costumeSchema";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: any }) {
	const id = context.params.id;
	const response: Costume | CustomError = await getById<Costume>(
		id,
		costumesPath
	);
	if (response instanceof CustomError)
		return NextResponse.json(response, { status: response.codigo });
	return NextResponse.json(response);
}

export async function PATCH(req: Request, context: { params: any }) {
	const id = context.params.id;
	const body: CostumeDTO = await req.json();

	const result = validateParcialCostume(body);

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

	const response: Costume | CustomError = await update(id, body);
	if (response instanceof CustomError)
		return NextResponse.json(response, { status: response.codigo });
	return NextResponse.json(response);
}

export async function DELETE(req: Request, context: { params: any }) {
	const id = context.params.id;
	const response: Costume | CustomError = await logicDelete<Costume>(
		id,
		costumesPath
	);
	if (response instanceof CustomError)
		return NextResponse.json(response, { status: response.codigo });
	return NextResponse.json(response);
}
