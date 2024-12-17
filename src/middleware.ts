// // middleware.ts

// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
// import { getSession } from "next-auth/react";

// export async function middleware(req: NextRequest) {
//   // Lấy session từ cookies
//   const session = await getSession();
//   const url = req.url;

//   // Chặn người dùng không phải doctor truy cập vào /doctor
//   if (url.includes("/doctor") && session?.user?.role !== "doctor") {
//     return NextResponse.redirect(new URL("/", req.url)); // Chuyển hướng về trang chủ
//   }

//   return NextResponse.next(); // Tiếp tục nếu hợp lệ
// }

// export const config = {
//   matcher: ["/doctor/*"], // Áp dụng middleware cho tất cả các URL có chứa "/doctor"
// };
// middleware.ts
// middleware.tsimport { NextResponse } from 'next/server'
// import { type NextRequest, NextResponse } from "next/server";
// import { getSession } from "next-auth/react";

// // Middleware function để kiểm tra role và redirect nếu cần
// export async function middleware(request: NextRequest) {
//   // Lấy session từ cookies thông qua getSession
//   const session = await getSession();
//   console.log("Session in Middleware:", session); // Log session để kiểm tra
//   // Kiểm tra nếu session không tồn tại hoặc người dùng không phải là doctor và truy cập vào /doctor
//   if (request.url.includes("/doctor") && session?.user?.role !== "doctor") {
//     // Chuyển hướng về trang chủ nếu điều kiện không thỏa mãn
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   // Nếu hợp lệ, tiếp tục yêu cầu
//   return NextResponse.next();
// }

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.AUTH_SECRET;

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret });

  // Nếu không có token => chuyển hướng về trang chủ
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const path = request.nextUrl.pathname;

  // Kiểm tra vai trò
  if (path.startsWith("/doctor") && token.role !== "doctor") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (path.startsWith("/admin") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Config matcher để áp dụng middleware
export const config = {
  matcher: ["/doctor/:path*", "/admin/:path*"],
};
