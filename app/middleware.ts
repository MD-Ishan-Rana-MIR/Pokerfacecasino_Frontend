// middleware.ts
import { NextResponse } from "next/server"

export function middleware(req: Request) {
    // 1️⃣ Get country from Vercel header
    const country = req.headers.get("x-vercel-ip-country") || ""

    // 2️⃣ If using your own server, you can use geoip-lite
    // const ip = req.ip || req.headers.get("x-forwarded-for") || ""
    // const geo = geoip.lookup(ip)
    // const country = geo?.country || ""

    // 3️⃣ Block UK
    if (country === "GB") {
        return new NextResponse("Access denied from the UK", { status: 403 })
    }

    return NextResponse.next()
}

// 4️⃣ Apply middleware to all routes
export const config = {
    matcher: ["/((?!_next).*)"], // all routes except _next
}