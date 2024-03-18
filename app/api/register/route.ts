import bcrypt from 'bcrypt'
import primsa from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request:Request)
{

    const body=await request.json()

   
    const {email,password,name}=body

    if(!email || !name || !password)
    {
        return new NextResponse ('Missing Information',{status:400})
    }

    const hashedPassword=await bcrypt.hash(password,12)

    const user=await primsa.user.create({
        data:{
            email,name,hashedPassword
        }
    })

    return NextResponse.json(user)
}

