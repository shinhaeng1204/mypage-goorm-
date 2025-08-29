// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
// import { useState } from "react"

// import { postsApi } from "../../api/posts"

// export default function Guestbook() {
//   const qc = useQueryClient()

//   // 파라미터 & 키
//   const postsParams = { page: 1, limit: 100 }
//   const POSTS_KEY = ["posts", postsParams]

//   // 폼 상태
//   const [title, setTitle] = useState("")
//   const [body, setBody] = useState("")
//   const [tagsInput, setTagsInput] = useState("")
//   const [clientError, setClientError] = useState("")

//   const resetForm = () => {
//     setTitle("")
//     setBody("")
//     setTagsInput("")
//     setClientError("")
//   }

//   // 목록 호출 useQuery

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: POSTS_KEY,
//     queryFn: () => postsApi.list(postsParams),
//     staleTime: 5 * 1000,
//   })

//   // 글 작성 useMutation
//   const createPost = useMutation({
//     mutationKey: [], // mutation을 구분하기 위한 키
//     mutationFn: () => {}, // 서버에 새 글 생성 요청 (payload: title, body, tags)
//     onMutate: () => {
//       // 뮤테이션 실행 직전에(서버에 요청 보내기 전에) 호출

//       // 이전 클라이언트 에러 메시지 초기화

//       // 낙관적 업데이트로 넣어둔 임시 데이터를 안전하게 유지하기 위해 응답을 받지 않도록 쿼리 중단 cancelQueries

//       // 현재 캐시에 저장된 posts 데이터를 백업 getQueryData

//       // 낙관적 업데이트를 위한 임시 포스트 삽입 (피드 상단)
//       const tempId = ""
//       const tempPost = {}

//       // 캐시 데이터 수정 → 새로운 글을 피드 상단에 추가 (낙관적 업데이트) setQueryData
//       // 캐시가 비어있다면 새 데이터 구조 만들어서 반환
//       // 기존 데이터가 있다면, 새 글을 items 배열 맨 앞에 추가

//       // 폼 초기화 (제출 후 입력창 비우기)

//       // rollback용으로 prev(기존 데이터)와 tempId를 반환
//     },
//     onError: (err, _payload, ctx) => {
//       // err : mutationFn 실행 중 발생한 에러
//       // _payload : mutate(payload)로 보낸 값
//       // ctx : onMutate에서 return 한 값
//       // 실패했다면 이전 상태(prev)로 복구 (rollback) setQueryData
//       // 에러 메시지를 사용자에게 표시
//     },
//     onSuccess: (res, _payload, ctx) => {
//       // res : mutationFn이 성공해서 서버가 돌려준 결과
//       // _payload : mutate(payload)로 보낸 값
//       // ctx : onMutate에서 return 한 값

//       // 응답으로 받은 실제 post로 임시 tempPost를 교체 setQueryData
//       qc.setQueryData(POSTS_KEY, (old) => {
//         if (!old) {
//           return old
//         }
//         return {
//           ...old,
//           items: (old.items ?? []).map((p) => (p._id === ctx?.tempId ? res.post : p)),
//         }
//       })
//     },
//     onSettled: () => {
//       // 서버와 캐시 데이터 동기화 (혹시 누락된 글이 있다면 다시 가져오기) invalidateQueries
//     },
//   })

//   // 삭제
//   const deletePost = useMutation({
//     mutationKey: [], // mutation 구분 키
//     mutationFn: () => {}, // 서버에 글 삭제 요청
//     onMutate: () => {
//       // 뮤테이션 실행 직전에(서버에 요청 보내기 전에) 호출
//       // 낙관적 업데이트로 넣어둔 임시 데이터를 안전하게 유지하기 위해 응답을 받지 않도록 쿼리 중단 cancelQueries
//       // 현재 캐시에 저장된 posts 데이터를 백업 getQueryData
//       // rollback용 데이터 반환
//     },
//     onError: (_err, _id, ctx) => {
//       // err : mutationFn 실행 중 발생한 에러
//       // _id : mutate(id)로 보낸 값
//       // ctx : onMutate에서 return 한 값
//       // 실패했다면 이전 상태(prev)로 복구 (rollback) setQueryData
//     },
//     onSettled: () => {
//       // 서버와 캐시 데이터 동기화 (혹시 누락된 글이 있다면 다시 가져오기) invalidateQueries
//     },
//   })

//   // ---- 제출 ----
//   const onSubmit = (e) => {
//     // 기본 form 제출 이벤트 막기

//     // 제목이 비어 있으면 에러 처리

//     // 입력한 태그 문자열을 배열로 변환 (중복 제거 + 공백 제거)
//     const tags = []

//     // useMutation 실행 → postsApi.create 호출
//   }

//   return (
//     <div className="mx-auto max-w-3xl p-4">
//       {/* 작성 폼 */}
//       <div className="mb-4 rounded-2xl bg-white p-6 shadow-xl">
//         <h1 className="mb-4 text-2xl font-bold">방명록</h1>

//         <form onSubmit={onSubmit} className="grid gap-3" noValidate>
//           <label className="grid gap-2 text-sm">
//             제목
//             <input
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               disabled={createPost.isPending}
//               className="h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400 disabled:bg-slate-100"
//               placeholder="제목을 입력하세요"
//             />
//           </label>

//           <label className="grid gap-2 text-sm">
//             본문
//             <textarea
//               value={body}
//               onChange={(e) => setBody(e.target.value)}
//               disabled={createPost.isPending}
//               rows={6}
//               className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-slate-400 disabled:bg-slate-100"
//               placeholder="내용을 작성하세요"
//             />
//           </label>

//           <label className="grid gap-2 text-sm">
//             태그 (쉼표로 구분)
//             <input
//               value={tagsInput}
//               onChange={(e) => setTagsInput(e.target.value)}
//               disabled={createPost.isPending}
//               className="h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400 disabled:bg-slate-100"
//               placeholder="react, mongo, query"
//             />
//           </label>

//           {clientError && (
//             <p className="rounded-lg border border-red-200 bg-red-50 p-2 text-sm text-red-700">
//               {clientError}
//             </p>
//           )}

//           <button
//             type="submit"
//             disabled={createPost.isPending}
//             className="h-11 rounded-xl bg-slate-900 font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
//           >
//             {createPost.isPending ? "등록 중…" : "등록"}
//           </button>
//         </form>
//       </div>

//       {/* 피드 */}
//       <div className="rounded-2xl bg-white p-6 shadow-xl">
//         <h2 className="mb-4 text-xl font-semibold">피드</h2>

//         {isLoading && <p>불러오는 중…</p>}
//         {isError && (
//           <p className="rounded-lg border border-red-200 bg-red-50 p-2 text-sm text-red-700">
//             {error?.message || "불러오기 실패"}
//           </p>
//         )}

//         {data?.items?.length ? (
//           <ul className="space-y-3">
//             {data.items.map((p) => (
//               <li key={p._id} className="rounded-xl border border-slate-200 p-4">
//                 <div className="mb-2 flex items-start justify-between gap-4">
//                   <h3 className="text-lg font-semibold">{p.title}</h3>
//                   <button
//                     onClick={() => {
//                       if (confirm("정말 삭제하시겠습니까?")) {
//                         deletePost.mutate(p._id)
//                       }
//                     }}
//                     disabled={deletePost.isPending}
//                     className="rounded-lg border px-3 py-1 text-red-600 hover:bg-red-50 disabled:opacity-60"
//                   >
//                     {deletePost.isPending ? "삭제 중…" : "삭제"}
//                   </button>
//                 </div>

//                 <div className="text-sm text-slate-700 whitespace-pre-wrap">{p.body}</div>

//                 {!!p.tags?.length && (
//                   <div className="mt-2 flex flex-wrap gap-2 text-xs">
//                     {(p.tags ?? []).map((t, i) => (
//                       <span
//                         key={`${t}-${i}`}
//                         className="rounded-full border border-slate-200 px-2 py-1"
//                       >
//                         #{t}
//                       </span>
//                     ))}
//                   </div>
//                 )}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           !isLoading && <p className="text-slate-500">아직 작성된 글이 없습니다.</p>
//         )}
//       </div>
//     </div>
//   )
// }
export default function Guestbook() {
  return <div>게스트북입니다.</div>
}
