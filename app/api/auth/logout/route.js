import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function GET(request) {
  const cookieStore = cookies();
  const token = cookieStore.get("myTokenName");
  console.log(token);

  if (!token) {
    return NextResponse.json({
      message: "Not logged in",
    }, {
      status: 401,
    })
  }

  try {
    cookieStore.delete("myTokenName");

    const response = NextResponse.json(
      {},
      {
        status: 200,
      }
    );

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(error.message, {
      status: 500,
    });
  }
}
