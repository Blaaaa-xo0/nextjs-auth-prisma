import { NextResponse } from "next/server"
import db from "@/libs/db"
import bcrypt from "bcrypt";

export async function POST(request) {

    // en caso de que no haya errores considerados
    try {
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

        //encriptamos la contraseña
        const hashPassword = await bcrypt.hash(data.password, 10)

        const newUser = await db.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: hashPassword
            }
        })

        return NextResponse.json(newUser)

    } catch (error) { // en caso de que haya errores No
        
        return NextResponse.json({
            message: error.message
        }, {
            status: 500
        })
    }
}