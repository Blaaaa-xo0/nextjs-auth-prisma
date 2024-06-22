const { NextResponse } = require("next/server")
import db from "@/libs/db"

export async function POST(request) {
    const data = await request.json()

    //validamos si el username ya existe
    const userUsernameFound = await db.user.findUnique({
        where: {
            username: data.username
        }
    })

    if (userUsernameFound) {
        return NextResponse.json({
            message: "Username already exists"
        }, {
            status: 400
        })
    }


    //validamos si el email ya existe
    const userEmailFound = await db.user.findUnique({
        where: {
            email: data.email
        }
    })

    if (userEmailFound) {
        return NextResponse.json({
            message: "Email already exists"
        }, {
            status: 400
        })
    }

    const newUser = await db.user.create({
        data
    })

    return NextResponse.json(newUser)
}