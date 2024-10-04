import { getCostumesByCategory } from "@/app/lib/data/costumeRepository";
import { Costume, CustomError } from "@/app/lib/definitions";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: any }) {
	const id = context.params.id;
	const response: Costume[] | CustomError = await getCostumesByCategory(id);
	if (response instanceof CustomError)
		return NextResponse.json(response, { status: response.codigo });
	if (response.length === 0)
		return NextResponse.json(
			new CustomError(true, "No se encuentran disfraces en esa categoria", 404),
			{ status: 404 }
		);
	return NextResponse.json(response);
}
