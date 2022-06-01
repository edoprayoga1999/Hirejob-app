/* eslint-disable consistent-return */
import { NextResponse } from "next/server"

export default function middleware(req) {
  const { token, level } = req.cookies
  const { pathname, origin } = req.nextUrl
  console.log(pathname)
  if (!token && pathname !== '/login' && pathname !== '/login/recruiter' && pathname !== '/register' && pathname !== '/register/recruiter' && pathname !== '/' && pathname !== '/backgroundpic.jpg' && pathname !== '/favicon.ico' && pathname !== '/peworld.png') {
    return NextResponse.redirect(`${origin}/login`)
  }
  if (token && (pathname === '/login' || pathname === '/login/recruiter' || pathname === '/register' || pathname === '/register/recruiter' || pathname === '/')) {
    return NextResponse.redirect(`${origin}/home`)
  }
  if (level === '0' && (pathname === '/company/home' || pathname === '/company/profile' || pathname === '/company/profile/edit')) {
    return NextResponse.redirect(`${origin}/home`)
  }
  if (level === '1' && (pathname === '/home' || pathname === '/chat')) {
    return NextResponse.redirect(`${origin}/company/home`)
  }
  if (level === '1' && (pathname === '/profile' || pathname === '/profile/edit')) {
    return NextResponse.redirect(`${origin}/company/profile`)
  }
}