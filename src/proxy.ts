import { NextRequest, NextResponse } from 'next/server'

const PROTECTED_ROUTES = [
  '/beranda',
  '/cariLowongan',
  '/lamaran',
  '/smartProfile',
  '/career-mapping',
  '/onboarding',
  '/payment',
]

const PUBLIC_ONLY_ROUTES = [
  '/login',
  '/register',
  '/landing',
]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const authCookie = request.cookies.get('refresh_token') || request.cookies.get('access_token') 
  
  const isLoggedIn = !!authCookie?.value

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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
