import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, SessionData } from '@/lib/session'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { access_token } = body

    if (!access_token) {
      return NextResponse.json(
        { success: false, error: 'No access token provided' },
        { status: 400 }
      )
    }

    const response = new Response()
    const session = await getIronSession<SessionData>(
      request,
      response,
      sessionOptions
    )

    if (!session.isLoggedIn) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      )
    }

    session.access_token = access_token
    await session.save()

    return NextResponse.json(
      { success: true },
      { headers: response.headers }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to refresh token' },
      { status: 500 }
    )
  }
}