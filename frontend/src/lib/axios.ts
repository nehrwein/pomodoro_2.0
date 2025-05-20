import axios from "axios"
import { BASE_URL } from "./constants"
import { useUserStore } from "./useUserStore"

const api = axios.create({
  baseURL:
    import.meta.env.DEV && import.meta.env.VITE_DISABLE_MSW ? BASE_URL : "",
})

api.interceptors.request.use((config) => {
  const token = useUserStore.getState().accessToken
  if (token) {
    config.headers = config.headers || {}
    config.headers["Authorization"] = `Bearer ${token}`
  }
  config.headers = config.headers || {}
  config.headers["Content-Type"] = "application/json"
  return config
})
export default api
