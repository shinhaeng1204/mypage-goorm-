import { Outlet } from "react-router-dom"

export default function AuthLayout() {
  return (
    <div>
      레이아웃
      <Outlet />
    </div>
  )
}
