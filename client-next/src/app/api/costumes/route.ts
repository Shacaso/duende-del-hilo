import { getAll } from "@/app/lib/data/entityRepository";
import { Costume, CostumeDTO, CustomError } from "@/app/lib/definitions";
import { costumesPath } from "@/app/lib/data/paths";
import { NextResponse } from "next/server";
import { validateCostume } from "@/app/lib/schemas/costumeSchema";
import { jsonProcess } from "@/app/lib/data/funciones";
import { create } from "@/app/lib/data/costumeRepository";

export async function GET(req: Request) {
	const response: Costume[] | CustomError = await getAll<Costume>(costumesPath);
	if (response instanceof CustomError)
		return NextResponse.json(response, { status: response.codigo });
	return NextResponse.json(response);
}

export async function POST(req: Request) {
	const body: CostumeDTO = await req.json();

	const result = validateCostume(body);

	if (!result.success) {
		const messageError = jsonProcess(JSON.parse(result.error.message));
		console.log(messageError);
		return NextResponse.json(
			{ error: true, message: messageError },
			{ status: 400 }
		);
	}

	const response: Costume | CustomError = await create(body, costumesPath);
	if (response instanceof CustomError) {
		console.log(response.message);
		return NextResponse.json(response, { status: response.codigo });
	}
	return NextResponse.json(response);
}
