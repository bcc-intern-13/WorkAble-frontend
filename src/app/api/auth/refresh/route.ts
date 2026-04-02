import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const BE_URL = process.env.NEXT_PUBLIC_API_URL;
    
    const refreshToken = request.cookies.get('refresh_token')?.value;

    if (!refreshToken) {
        return NextResponse.json({ message: "Tidak ada session refresh token" }, { status: 401 });
    }

    const response = await fetch(`${BE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `refresh_token=${refreshToken}`
      },
    });

    const data = await response.json();
    const res = NextResponse.json(data, { status: response.status });

    if (response.ok) {
        const setCookieHeader = response.headers.get("set-cookie");
        if (setCookieHeader) {
          const match = setCookieHeader.match(/(?:refresh_token|refreshToken)=([^;]+)/i);
          if (match && match[1]) {
             res.cookies.set({
               name: 'refresh_token',
               value: match[1],
               httpOnly: true,
               path: '/',
               secure: process.env.NODE_ENV === 'production',
               sameSite: 'lax',
               maxAge: 60 * 60 * 24 * 7
             });
          }
        }
    } else {
        res.cookies.delete('refresh_token');
    }

    return res;
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Terjadi kesalahan internal" },
      { status: 500 }
    );
  }
}
