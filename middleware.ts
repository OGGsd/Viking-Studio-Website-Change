// @ts-check
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedUrls = [
  'api.leadconnectorhq.com/widget/booking'
]

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  
  // Check if request contains any protected URLs
  const containsProtectedUrl = protectedUrls.some(protectedUrl => {
    return request.headers.get('referer')?.includes(protectedUrl) ||
           url.toString().includes(protectedUrl)
  })
  
  if (containsProtectedUrl) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ]
}