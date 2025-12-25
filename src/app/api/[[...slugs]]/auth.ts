
import { Elysia } from "elysia";
import { redis } from "@/lib/redis";



class AuthError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AuthError";
    }
}

export const authMiddleware = new Elysia({name:"auth"})
    .error({AuthError})
    .onError(({code , set}) =>{
        if(code === "AuthError"){
            set.status=401
            return ({error:"Unauthorized"})
        }
    })
    .derive({ as: "scoped"} , async({query , cookie}) =>{
        const roomId = query.roomId 
        const token = cookie["x-auth-token"].value as string || undefined

        if(!roomId || !token){
            throw new AuthError ("Missing roomId or token")
        }

        //const connected = await redis.hget<string[]> (`meta:${roomId}`, "connected")

        // --- FIX START: Safe Parsing ---
        const rawConnected = await redis.hget(`meta:${roomId}`, "connected");
        
        // Ensure connected is always an Array
        let connected: string[] = [];
        
        if (Array.isArray(rawConnected)) {
            connected = rawConnected;
        } else if (typeof rawConnected === 'string') {
            try {
                connected = JSON.parse(rawConnected);
            } catch (e) {
                connected = [];
            }
        }
        // --- FIX END ---

        if(!connected?.includes(token)){
            throw new AuthError ("Invalid token")
        }

        return {auth:{roomId , token , connected}}

    })