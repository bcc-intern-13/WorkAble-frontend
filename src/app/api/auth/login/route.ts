import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const BE_URL = process.env.NEXT_PUBLIC_API_URL;

    if (!BE_URL) {
      return NextResponse.json({ message: "Konfigurasi Base URL Backend tidak ditemukan" }, { status: 500 });
    }

    const response = await fetch(`${BE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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
    }

    return res;
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Terjadi kesalahan pada internal server" },
      { status: 500 }
    );
  }
}
