import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (
    token &&
    (url.pathname.startsWith("/login") ||
      url.pathname.startsWith("/signup"))
  ) {
    console.log("User is authenticated; redirecting to homepage.");
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && url.pathname.startsWith("/note")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (!token && url.pathname.startsWith("/createnote")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/createnote/:path*", "/note/:id*"],
};
