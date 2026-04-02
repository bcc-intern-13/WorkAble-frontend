import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const BE_URL = process.env.NEXT_PUBLIC_API_URL;
    const refreshToken = request.cookies.get('refresh_token')?.value;

    if (refreshToken && BE_URL) {
       try {
           await fetch(`${BE_URL}/auth/logout`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Cookie": `refresh_token=${refreshToken}`
              },
           });
       } catch (err) {
           console.error("Gagal mengirim sinyal logout ke BE:", err);
       }
    }

    const res = NextResponse.json({ message: "Berhasil logout dari sistem frontend" }, { status: 200 });
    
    res.cookies.delete('refresh_token');

    return res;
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Terjadi kesalahan internal" },
      { status: 500 }
    );
  }
}
