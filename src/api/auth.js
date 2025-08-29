import { api } from "./http"
import { token } from "./token"

export const auth = {
  login: async (payload) => {
    const response = await api.post("/auth/login", payload, { auth: false })
    response.data.token ? token.set(response.data.token) : token.clear()
    return response
  },
  register: async (payload) => {
    const response = await api.post("/auth/register", payload, { auth: false })
    return response
  },
}
