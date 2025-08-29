import { twMerge } from "tailwind-merge";

export default function Button({ isPrimary }) {
  return (
    <button
      className={twMerge(
        "px-4 py-2 rounded font-bold m-4",
        isPrimary ? "bg-blue-500 text-white" : "bg-red-500 text-white",
      )}
    >
      Click Me
    </button>
  );
}
