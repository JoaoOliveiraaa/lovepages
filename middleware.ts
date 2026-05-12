import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
  if (process.env.LOVEPAGES_SKIP_AUTH_MIDDLEWARE === "true") {
    return NextResponse.next();
  }

  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret || secret.length < 32) {
    return NextResponse.json(
      {
        error: "NEXT_MISCONFIGURED",
        message:
          "Defina JWT_ACCESS_SECRET (>=32 chars, igual ao da API) ou LOVEPAGES_SKIP_AUTH_MIDDLEWARE=true para desenvolvimento.",
      },
      { status: 503 },
    );
  }

  const token = request.cookies.get("lp_access_token")?.value;
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  try {
    const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(secret));
    const role = typeof payload.role === "string" ? payload.role : "USER";
    if (request.nextUrl.pathname.startsWith("/admin") && role !== "ADMIN") {
      const url = request.nextUrl.clone();
      url.pathname = "/app";
      return NextResponse.redirect(url);
    }
  } catch {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/admin/:path*"],
};
