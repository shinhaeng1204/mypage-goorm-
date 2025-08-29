import { NavLink } from "react-router";

import { ROUTES } from "@/lib/routes";

export default function Header({ onMenu }) {
  return (
    <header className="bg-white border rounded-md shadow-md h-[60px] m-2 flex items-center justify-between">
      <div className="flex gap-3 items-center m-2">
        <button
          className="bg-white border border-black-100 rounded-md shadow-md p-2"
          onClick={onMenu}
        >
          ☰
        </button>
        <h1 className="font-bold">
          <NavLink to="/" className="hover:text-blue-500">
            MyApp
          </NavLink>
        </h1>
      </div>
      <div className="flex gap-4 m-2">
        <h1 className="text-right">
          <NavLink to={ROUTES.AUTH.LOGIN} className="hover:text-blue-500">
            로그인
          </NavLink>
        </h1>
        <h1 className="text-right">
          <NavLink to={ROUTES.AUTH.REGISTER} className="hover:text-blue-500">
            회원가입
          </NavLink>
        </h1>
      </div>
    </header>
  );
}
