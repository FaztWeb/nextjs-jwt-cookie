import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = process.env.SECRET;

export async function middleware(request) {
  const jwt = request.cookies.get("myTokenName");

  if (request.nextUrl.pathname.includes("/login")) {
    console.log(jwt)
    if (jwt) {
      try {
        await jwtVerify(jwt, new TextEncoder().encode('secret'));
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } catch (error) {
        return NextResponse.next();
      }
    }
  }

  if (request.nextUrl.pathname.includes("/dashboard")) {
    console.log(request.nextUrl.pathname);
    console.log({ jwt });

    if (jwt === undefined) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const { payload } = await jwtVerify(
        jwt,
        new TextEncoder().encode("secret")
      );
      console.log({ payload });
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: '/',
// }
