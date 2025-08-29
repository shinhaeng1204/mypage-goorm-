import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import { api } from "@/api/http"
import { token } from "@/api/token"

export default function Mypage() {
  const [hasToken, setHasToken] = useState(Boolean(token.get()))
  const [profile, setProfile] = useState({ name: "", email: "" })
  // useEffect(() => {
  //   console.log(token.get())
  //   async function fetchMe() {
  //     if (!hasToken) {
  //       return
  //     }
  //     try {
  //       const me = await api.get("/me")
  //       console.log("mememem", me)
  //       setProfile({
  //         name: me.data.name || "",
  //         email: me.data.email || "",
  //       })
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   fetchMe()
  // }, [hasToken])
  const {
    data: me,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get("/me")
      return res.data
    },
    enabled: hasToken,
  })
  if (!hasToken) {
    return <div>로그인이 필요합니다.</div>
  }
  if (isLoading) {
    return <div>불러오는 중...</div>
  }
  if (error) {
    return <div>에러 발생 : {error.message}</div>
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="font-bold text-3xl mb-4">마이페이지</div>
      <div className="flex border rounded-md shadow-md p-4 min-w-0">
        <div className="flex flex-col">
          이름 <input value={me.name} readOnly />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          이메일:{" "}
          <input value={me.email} readOnly className="border rounded-md shadow-md p-4 w-full" />
        </div>
      </div>
    </div>
  )
}
