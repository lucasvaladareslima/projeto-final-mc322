// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("sessionid"); // ou seu cookie custom
  const { pathname } = req.nextUrl;
  if (!token && pathname.startsWith("/conta")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = { matcher: ["/conta/:path*"] };
