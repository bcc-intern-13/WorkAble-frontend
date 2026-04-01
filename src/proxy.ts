import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, SessionData } from '@/lib/session'

const PROTECTED_ROUTES = [
  // '/beranda',
  '/cariLowongan',
  '/lamaran',
  '/smartProfile',
  '/career-mapping',
  // '/onboarding',
  '/payment',
]

const PUBLIC_ONLY_ROUTES = [
  '/login',
  '/register',
  '/landing',
]

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  let isLoggedIn = false
  
  try {
    const response = new Response()
    const session = await getIronSession<SessionData>(
      request,
      response,
      sessionOptions
    )
    
    isLoggedIn = session.isLoggedIn && !!session.user
  } catch (error) {
    console.error('proxy session check error:', error)
    isLoggedIn = false
  }

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  )

  const isPublicOnlyRoute = PUBLIC_ONLY_ROUTES.some((route) =>
    pathname.startsWith(route)
  )

  if (!isLoggedIn && isProtectedRoute) {

    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)

    return NextResponse.redirect(loginUrl)
  }

  if (isLoggedIn && isPublicOnlyRoute) {

    return NextResponse.redirect(new URL('/beranda', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // '/beranda/:path*',
    '/cariLowongan/:path*',
    '/lamaran/:path*',
    '/smartProfile/:path*',
    '/career-mapping/:path*',
    // '/onboarding/:path*',
    '/payment/:path*',
    '/login',
    '/register',
    '/landing',
  ],
}