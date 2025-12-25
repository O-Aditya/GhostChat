import { NextRequest, NextResponse } from "next/server"
import { redis } from "./lib/redis"
import { nanoid } from "nanoid"

export const proxy = async (req : NextRequest) =>{
    const pathname = req.nextUrl.pathname
    const roomMatch = pathname.match(/^\/room\/([^/]+)$/)
    
    if(!roomMatch){
        return NextResponse.redirect (new URL ("/", req.url))
    }
    const roomId = roomMatch[1]

    // Fetch data (allow string or array type)
    const meta = await redis.hgetall<{connected: string[] | string; createdAt:number}>(`meta:${roomId}`)

    if(!meta){
        return NextResponse.redirect (new URL ("/?error=room-not-found", req.url))
    }

    // --- FIX: Parse 'connected' correctly ---
    let connectedUsers: string[] = []
    
    if (Array.isArray(meta.connected)) {
        connectedUsers = meta.connected
    } else if (typeof meta.connected === 'string') {
        try {
            connectedUsers = JSON.parse(meta.connected)
        } catch (e) {
            connectedUsers = []
        }
    }
    // ----------------------------------------

    const existingToken = req.cookies.get("x-auth-token")?.value

    // Use the parsed array for checks
    if(existingToken && connectedUsers.includes(existingToken)){
        return NextResponse.next()
    }

    // Now .length works correctly on the array (1 user = length 1)
    if(connectedUsers.length >= 2 ){
        return NextResponse.redirect (new URL ("/?error=room-full", req.url))
    }

    const response = NextResponse.next()
    const token = nanoid()

    response.cookies.set("x-auth-token", token, {
        path:"/",
        httpOnly:true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",    
    })

    // Save back to Redis
    await redis.hset(`meta:${roomId}`,{
        connected: [...connectedUsers, token],
    })

    return response
}

export const config ={
    matcher:"/room/:path*"
}