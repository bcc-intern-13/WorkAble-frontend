import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, SessionData } from '@/lib/session'

export async function GET(request: NextRequest) {
  try {
    const response = new Response()
    const session = await getIronSession<SessionData>(
      request,
      response,
      sessionOptions
    )

    if (!session.isLoggedIn || !session.access_token) {
      return NextResponse.json(
        { success: false, error: 'No token in session' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      access_token: session.access_token,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to get token' },
      { status: 500 }
    )
  }
}