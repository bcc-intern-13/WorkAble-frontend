import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, SessionData } from '@/lib/session'


export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { user, access_token } = body

    const response = new Response()
    const session = await getIronSession<SessionData>(
      request,
      response,
      sessionOptions
    )

    session.user = user
    session.access_token = access_token
    session.isLoggedIn = true

    await session.save()

    return NextResponse.json(
      { success: true, message: 'Session created' },
      { headers: response.headers }
    )
  } catch (error) {
    console.error('Session creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create session' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
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

    return NextResponse.json({
      success: true,
      user: session.user,
      isLoggedIn: session.isLoggedIn,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Session error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { access_token } = body

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

    console.log('Session updated with new access token')

    return NextResponse.json(
      { success: true },
      { headers: response.headers }
    )
  } catch (error) {
    console.error('Session update error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update session' },
      { status: 500 }
    )
  }
}