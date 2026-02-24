import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // 🌍 1️⃣ Get country from Vercel header
    const country = request.headers.get("x-vercel-ip-country") || "";

    // 🚫 2️⃣ Block UK users
    if (country === "GB") {
        return new NextResponse("Access denied from the UK", { status: 403 });
    }

    // 🔐 3️⃣ Protect /MARKETS route
    const token = request.cookies.get("user-token");

    if (!token && request.nextUrl.pathname.startsWith("/MARKETS")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

// 4️⃣ Apply middleware to all routes except _next
export const config = {
    matcher: ["/((?!_next).*)"],
};