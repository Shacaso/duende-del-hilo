import { getCostumesByCategory } from "@/app/lib/data/costumeRepository";
import { Costume, CustomError } from "@/app/lib/definitions";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: any }) {
	const id = context.params.id;
	const response: Costume[] | CustomError = await getCostumesByCategory(id);
	if (response instanceof CustomError)
		return NextResponse.json(response, { status: response.codigo });
	return NextResponse.json(response);
}
