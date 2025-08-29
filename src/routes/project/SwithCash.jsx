import { useState } from "react";

export default function App() {
  const [input, setInput] = useState(1);
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [setError] = useState(null);

  const reloading = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://api.frankfurter.app/latest?from=USD&to=KRW",
      );
      if (!res.ok) {
        throw new Error("환율 API가 올바르지 않습니다.");
      }
      const data = await res.json();
      const krw = data?.rates?.KRW;
      if (typeof krw !== "number") {
        throw new Error("KRW 환율 데이터가 없습니다.");
      }
      setRate(krw);
    } catch (e) {
      setError(e.message || "알 수 없는 오류가 발생했습니다.");
      setRate(null);
    } finally {
      setLoading(false);
    }
  };

  const converted = rate ? (input * rate).toLocaleString() : "-";

  return (
    <div className="container">
      <h1>환율 불러오기</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="가격을 입력해주세요"
          value={input}
          onChange={(e) => setInput(Number(e.target.value))}
        />
      </div>
      <div className="button-group">
        <button type="button" disabled={loading} onClick={reloading}>
          {loading ? "..." : "계산하기"}
        </button>
      </div>
      <p>
        {input} USD = <strong>{converted} KRW</strong>
      </p>
    </div>
  );
}
