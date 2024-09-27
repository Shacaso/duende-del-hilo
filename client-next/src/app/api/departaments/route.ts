import { create, getAll } from "@/app/lib/data/entityRepository";
import { Departament, CustomError } from "@/app/lib/definitions";
import { departamentsPath } from "@/app/lib/data/paths";
import { NextResponse } from "next/server";
import { validateDepartament } from "@/app/lib/schemas/departamentSchema";
import { jsonProcess } from "@/app/lib/data/funciones";

export async function GET(req: Request) {
	const response: Departament[] | CustomError = await getAll<Departament>(
		departamentsPath
	);
	if (response instanceof CustomError)
		return NextResponse.json(response, { status: response.codigo });
	return NextResponse.json(response);
}

export async function POST(req: Request) {
	const body: Departament = await req.json();

	const result = validateDepartament(body);

	if (!result.success) {
		const messageError = jsonProcess(JSON.parse(result.error.message));
		return NextResponse.json(
			{ error: true, message: messageError },
			{ status: 400 }
		);
	}

	const response: Departament | CustomError = await create<Departament>(
		body,
		departamentsPath
	);
	if (response instanceof CustomError)
		return NextResponse.json(response, { status: response.codigo });
	return NextResponse.json(response, { status: 201 });
}
