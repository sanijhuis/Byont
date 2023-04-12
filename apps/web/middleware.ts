import { verifyAuth } from "./lib/verify-jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  console.log(req.cookies);
  const token = req.cookies.get("access_token")?.value;

  const verifiedToken =
    token &&
    (await verifyAuth(token).catch(err => {
      console.log(err);
    }));

  if (req.nextUrl.pathname.startsWith("/login") && !verifiedToken) {
    return;
  }

  if (req.url.includes("/login") && verifiedToken) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/login", "/dashboard"],
};
