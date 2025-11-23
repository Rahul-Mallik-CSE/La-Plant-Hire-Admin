/** @format */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

const SIGN_IN_URL = "/sign-in";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL(SIGN_IN_URL, request.url));
  }

  try {
    const decoded = jwtDecode<{ exp?: number }>(token);

    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      const response = NextResponse.redirect(new URL(SIGN_IN_URL, request.url));
      response.cookies.delete("access_token");
      return response;
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Invalid token:", error);
    const response = NextResponse.redirect(new URL(SIGN_IN_URL, request.url));
    response.cookies.delete("access_token");
    return response;
  }
}

export const config = {
  matcher: [
    "/",
    "/confirmed-orders",
    "/cancelled-orders",
    "/completed-orders",
    "/settings",
  ],
};
