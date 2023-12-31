import { login } from "@/app/lib/data/entityRepository"
import { jsonProcess } from "@/app/lib/data/funciones"
import { loginPath } from "@/app/lib/data/paths"
import { CustomError } from "@/app/lib/definitions"
import { validateUserLogin } from "@/app/lib/schemas/userLoginSchema"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    const body = await req.json()

    const result = validateUserLogin(body)

    if (!result.success) {
        const messageError = jsonProcess(JSON.parse(result.error.message))
        return NextResponse.json(new CustomError(true, messageError), { status: 400 })
    }

    const response = await login(body, loginPath)
    if (response instanceof CustomError) return NextResponse.json(response, { status: response.codigo })

    return NextResponse.json(response)

}

