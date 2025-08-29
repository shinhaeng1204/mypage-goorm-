import axios from "axios";
// import {use} from "react"
import { useEffect, useState } from "react";

import ProfileCard from "@/components/ProfileCard";

// async function fetchUser() {
//   const res = await fetch("/users.json");
//   if (!res.ok) {
//     throw new Error("데이터 불러오기 실패");
//   }
//   return res.json();
// }
// const userPromise = fetchUser();
export default function ProfilePage() {
  const [users, setUsers] = useState([]);

  //   useEffect(() => {
  //     fetch("/users.json")
  //       .then((res) => res.json())
  //       .then((data) => setUsers(data))
  //       .catch((err) => console.error("데이터 로드 실패:", err));
  //   }, []);
  useEffect(() => {
    axios
      .get("/users.json")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">우리 팀 프로필</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user, idx) => (
          <ProfileCard key={idx} {...user} />
        ))}
      </div>
    </div>
  );
}
