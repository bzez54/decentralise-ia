import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const isDashboard = req.nextUrl.pathname.startsWith('/dashboard')
  if (!isDashboard) return NextResponse.next()

  const hasToken =
    req.cookies.has('sb-access-token') || req.cookies.has('sb-refresh-token')

  if (!hasToken) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
