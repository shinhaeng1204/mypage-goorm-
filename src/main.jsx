import { QueryClientProvider } from "@tanstack/react-query"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"

import { queryClient } from "@/lib/queryClient"

import "./index.css"
import App from "./App.jsx"
// import Test from "./test.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        {/* <Test /> */}
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
)
