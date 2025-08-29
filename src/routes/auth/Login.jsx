import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"

import { auth } from "@/api/auth"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const queryClient = useQueryClient()
  const mutatelogin = useMutation({
    mutationFn: (payload) => auth.login(payload),
    onSuccess: (data) => {
      // 사용자 정보 캐시 초기화/갱신
      queryClient.invalidateQueries({ queryKey: ["me"] })

      // 마이페이지로 이동
      navigate("/mypage", { replace: true })
    },
    onError: (error) => {
      alert(`로그인 실패: ${error.response?.data?.message || "서버 오류"}`)
    },
  })
  const handleLogin = async () => {
    // try {
    //   const response = await auth.login({
    //     email,
    //     password,
    //   })
    //   console.log(response)
    //   navigate("/mypage", { replace: true })
    // } catch (err) {
    //   console.log(err)
    // }
    mutatelogin.mutate({
      email,
      password,
    })
  }
  return (
    <div className="flex items-center justify-center flex-col">
      <input
        name="email"
        type="text"
        placeholder="이메일을 입력하세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="m-4 p-2 border rounded-md shadow-md"
      />
      <input
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="m-4 p-2 border rounded-md shadow-md"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className=" mb-4 flex items-center text-gray-500"
      >
        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
      </button>
      <button type="button" onClick={handleLogin} className="p-2 border rounded-md shadow-md">
        로그인
      </button>
    </div>
  )
}
