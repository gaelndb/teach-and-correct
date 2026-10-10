import axios from 'axios'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

async function post<TResponse, TPayload = undefined>(url: string, payload?: TPayload): Promise<TResponse> {
  const response = await axiosClient.post<TResponse>(url, payload)

  return response.data
}

export const api = {
  post,
}
