import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privateRoute = ["/dashboard", "/cart", "/checkout"];
// This function can be marked `async` if using `await` inside
export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = Boolean(token)
  const isPrivateReq= privateRoute.some((route) => req.nextUrl.pathname.startsWith(route))

  console.log({isAuthenticated, isPrivateReq, Url: req.nextUrl.pathname})
  if(!isAuthenticated && isPrivateReq) {
    return NextResponse.redirect(new URL(`/login?callbackUrl=${req.nextUrl.pathname}`, req.url))
  }

  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: ["/dashboard/:path*", "/cart/:path*", "/checkout/:path*"],
};
