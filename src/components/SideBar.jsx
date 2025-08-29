import { NavLink } from "react-router"

import { ROUTES } from "@/lib/routes"

export default function SideBar({ open, onClose }) {
  return (
    <nav
      className={`bg-white border rounded-md shadow-md flex-col list-none w-64 m-2 
        ${open ? "flex" : "hidden"}`}
    >
      <NavLink to={ROUTES.MEMBER.PROFILE} className=" ml-4 mt-4 hover:text-blue-500">
        프로필
      </NavLink>
      <NavLink to={ROUTES.PROJECT.SWITHCASH} className=" ml-4 mt-4 hover:text-blue-500">
        환율계산기
      </NavLink>
      <NavLink to={ROUTES.PRATICE.PRATICE} className=" ml-4 mt-4 hover:text-blue-500">
        연습용
      </NavLink>
      <NavLink to={ROUTES.USER.MYPAGE} className=" ml-4 mt-4 hover:text-blue-500">
        마이페이지
      </NavLink>
      <NavLink to={ROUTES.PROJECT.GUESTBOOK} className=" ml-4 mt-4 hover:text-blue-500">
        방명록
      </NavLink>
      <button className="mt-4 bg-gray-200 px-3 py-1 rounded" onClick={onClose}>
        닫기
      </button>
    </nav>
  )
}
