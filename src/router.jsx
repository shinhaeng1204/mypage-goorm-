import { lazy } from "react"
import { Routes, Route } from "react-router"

import RootLayout from "./layouts/RootLayout"
import Mypage from "./routes/user/Mypage"

import { ROUTES } from "@/lib/routes"
import AuthLayout from "@/routes/auth/AuthLayout"
import Login from "@/routes/auth/Login"
import Register from "@/routes/auth/Register"
import Home from "@/routes/Home"
import NotFound from "@/routes/NotFound"
import Pratice from "@/routes/pratice/Pratice"
import Guestbook from "@/routes/project/Guestbook"
import SwithCash from "@/routes/project/SwithCash"

const Profile = lazy(() => import("@/routes/member/Profile"))
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.MEMBER.ROOT}>
          <Route path={ROUTES.MEMBER.PROFILE} element={<Profile />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.AUTH.LOGIN} element={<Login />} />
          <Route path={ROUTES.AUTH.REGISTER} element={<Register />} />
        </Route>
        <Route path={ROUTES.PROJECT.ROOT}>
          <Route path={ROUTES.PROJECT.SWITHCASH} element={<SwithCash />} />
          <Route path={ROUTES.PROJECT.GUESTBOOK} element={<Guestbook />} />
        </Route>
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        <Route path={ROUTES.PRATICE.PRATICE} element={<Pratice />} />
        <Route path={ROUTES.USER.MYPAGE} element={<Mypage />} />
      </Route>
    </Routes>
  )
}
