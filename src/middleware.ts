import { NextRequest, NextResponse } from "next/server";


export function middleware(
    request:NextRequest
){
    const hasToken = request.cookies.get("dummy")

    if(
        (!hasToken && request.nextUrl.pathname.startsWith("/alerts")||
        request.nextUrl.pathname === "/"        
        )
    ){
        return NextResponse.redirect(new URL("/login",request.url))
    }
    if(hasToken && request.nextUrl.pathname==="login"){
        return NextResponse.redirect(new URL("/alerts",request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
    '/alerts/:path*',
    '/login',
    "/"
    ],
}