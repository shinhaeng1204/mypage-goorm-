import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"

import { auth } from "../../api/auth"

export default function Register() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  })
  const [errors, setErrors] = useState({})

  const onChange = (e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) {
      return
    }
    try {
      const res = await auth.register({
        email: form.email,
        password: form.password,
        name: form.name,
      })
      console.log(res)
      alert("회원가입 성공")
      navigate("/login", { replace: true })
    } catch (err) {
      const status = err.status

      if (status === 409) {
        setErrors((p) => ({ ...p, email: "이미 가입된 이메일입니다." }))
      }
      alert(`회원가입 실패: ${err.message}`)
    }
  }

  const validate = () => {
    const err = {}
    if (!form.name.trim()) {
      err.name = "이름을 입력하세요"
    }
    if (!form.email.trim()) {
      err.email = "이메일을 입력하세요"
    }
    if (!form.password.trim()) {
      err.password = "비밀번호를 입력하세요"
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      err.email = "이메일 형식이 잘못되었습니다"
    }
    if (form.password.length < 8) {
      err.password = "비밀번호는 8자 이상이여야 합니다"
    }
    if (form.password !== form.confirm) {
      err.confirm = "비밀번호가 일치하지 않습니다"
    }
    setErrors(err)
    return Object.keys(err).length === 0
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-start max-w-md mx-auto p-6 rounded-md shadow-md bg-gray-100"
    >
      <h2 className="text-xl font-bold mb-4 self-center">회원가입</h2>
      <div className="mb-4">
        <label className="mr-4">이름</label>
        <input
          className="border p-1 rounded-md shadow-md"
          name="name"
          value={form.name}
          placeholder="이름을 입력하세요"
          onChange={onChange}
        />
        {errors.name && <div className="text-red-500 mt-1">{errors.name}</div>}
      </div>
      <div className="mb-4">
        <label className="mr-4">이메일</label>
        <input
          className="border p-1 rounded-md shadow-md"
          name="email"
          value={form.email}
          placeholder="이메일을 입력하세요"
          onChange={onChange}
        />
        {errors.email && <div className="text-red-500 mt-1">{errors.email}</div>}
      </div>
      <div className="mb-4">
        <label className="mr-4">비밀번호</label>
        <input
          className="border p-1 rounded-md shadow-md"
          name="password"
          value={form.password}
          placeholder="비밀번호를 입력하세요"
          onChange={onChange}
          type={showPassword ? "text" : "password"}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="flex items-center text-gray-500"
        >
          {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
        {errors.password && <div className="text-red-500 mt-1">{errors.password}</div>}
      </div>
      <div className="mb-4">
        <label className="mr-4">비밀번호 확인</label>
        <input
          className="border p-1 rounded-md shadow-md"
          name="confirm"
          value={form.confirm}
          placeholder="비밀번호를 다시 입력하세요"
          onChange={onChange}
          type={showPasswordConfirm ? "text" : "password"}
        />
        <button
          type="button"
          onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
          className="flex items-center text-gray-500"
        >
          {showPasswordConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        {errors.confirm && <div className="text-red-500 mt-1">{errors.confirm}</div>}
      </div>

      <button type="submit" className="flex self-center p-2 border rounded-md shadow-md">
        가입하기
      </button>
    </form>
  )
}
