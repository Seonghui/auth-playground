import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/my-page', '/places'];

const isAuthenticated = false;

export default function middleware(req: NextRequest) {
  //   if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
  //     const absoluteURL = new URL('/login', req.nextUrl.origin);
  //     return NextResponse.redirect(absoluteURL.toString());
  //   }
}
