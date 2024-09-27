import { create, getAll } from "@/app/lib/data/entityRepository";
import { Category, CustomError } from "@/app/lib/definitions";
import { categoriesPath } from "@/app/lib/data/paths";
import { NextResponse } from "next/server";
import { validateCategory } from "@/app/lib/schemas/categorySchema";
import { jsonProcess } from "@/app/lib/data/funciones";

export async function GET(req: Request) {
	const response: Category[] | CustomError = await getAll<Category>(
		categoriesPath
	);
	if (response instanceof CustomError)
		return NextResponse.json(response, { status: response.codigo });
	return NextResponse.json(response);
}

export async function POST(req: Request) {
	const body: Category = await req.json();

	const result = validateCategory(body);

	if (!result.success) {
		const messageError = jsonProcess(JSON.parse(result.error.message));
		return NextResponse.json(
			{ error: true, message: messageError },
			{ status: 400 }
		);
	}

	const response: Category | CustomError = await create<Category>(
		body,
		categoriesPath
	);
	if (response instanceof CustomError)
		return NextResponse.json(response, { status: response.codigo });
	return NextResponse.json(response, { status: 201 });
}
