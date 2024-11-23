import axios from 'axios'

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  },
  timeout: 10000,
})

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage =
      error.response?.data?.error?.message || 'An error occurred'
    console.error('Hetzner API Error:', errorMessage)
    return Promise.reject(error)
  },
)
