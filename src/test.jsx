import { useState, useRef } from "react";

export function Parent() {
  const [childValue, setChildValue] = useState(null);

  return <Child onRefChange={(val) => setChildValue(val)} />;
}

export function Child({ onRefChange }) {
  const secret = useRef(0);

  function update() {
    secret.current += 1;
    onRefChange(secret.current);
  }

  return <button onClick={update}>update</button>;
}
