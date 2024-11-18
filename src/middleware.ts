import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";

// Define protected routes
const protectedRoutes = ["/dashboard", "/profile"]; // TODO : -Define these route later
const authRoutes = ["/login", "/sign-up"];
const adminRoutes = ["/admin"]; // Add your admin routes here

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("token");
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  // Handle authentication routes (login, signup)
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (token) {
      try {
        await jwtVerify(token.value, secret);
        return NextResponse.redirect(new URL("/", request.url));
      } catch (error) {
        console.error("Auth routes middleware error:", error);
      }
    }
    return NextResponse.next();
  }

  // Handle admin routes
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const url = new URL("/login", request.url);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }

    try {
      const { payload } = (await jwtVerify(token.value, secret)) as {
        payload: JWTPayload;
      };

      // Check if user has admin role
      if (payload.role !== "admin") {
        // Redirect non-admin users to main dashboard or show unauthorized page
        return NextResponse.redirect(new URL("/", request.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.error("Admin middleware error:", error);
      // Redirect to login if token is invalid
      const url = new URL("/login", request.url);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  // Handle protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const url = new URL("/login", request.url);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }

    try {
      await jwtVerify(token.value, secret);
      return NextResponse.next();
    } catch (error) {
      console.error("Protected routes middleware error:", error);
      const url = new URL("/login", request.url);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/login",
    "/sign-up",
  ],
};
