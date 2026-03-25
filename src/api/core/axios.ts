// lib/axios.ts
import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

// Create axios instance
const api = axios.create({
  baseURL: "https://remissly-crumbier-michelle.ngrok-free.dev/",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // CRITICAL: Send cookies with requests (for refresh token)
})

// Access token storage (in memory, not localStorage for security)
let accessToken: string | null = null

export const setAccessToken = (token: string | null) => {
  accessToken = token
  console.log('🔑 Access token updated:', token ? 'Set' : 'Cleared')
}

export const getAccessToken = () => accessToken

// Flag to prevent multiple refresh requests
let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: any) => void
  reject: (reason?: any) => void
}> = []

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

// Request interceptor - Add access token to requests
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken()

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    console.log('📤 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      hasToken: !!token,
    })

    return config
  },
  (error: AxiosError) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor - Handle 401 and auto-refresh
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('📥 API Response:', {
      status: response.status,
      url: response.config.url,
    })
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    console.error('❌ API Error:', {
      status: error.response?.status,
      url: originalRequest?.url,
    })

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Wait for refresh to complete
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`
            }
            return api(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        console.log('🔄 Refreshing access token...')

        // Call refresh endpoint
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          {
            withCredentials: true, // Send refresh token cookie
          }
        )

        const { access_token } = response.data.data

        console.log('✅ Access token refreshed successfully')

        // Update access token
        setAccessToken(access_token)

        // Update session
        await fetch('/api/auth/session', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ access_token }),
        })

        // Process queued requests
        processQueue(null, access_token)

        // Retry original request
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access_token}`
        }

        return api(originalRequest)
      } catch (refreshError) {
        console.error('❌ Token refresh failed:', refreshError)

        processQueue(refreshError as Error, null)

        // Clear tokens and redirect to login
        setAccessToken(null)
        await fetch('/api/auth/session', { method: 'DELETE' })

        if (typeof window !== 'undefined') {
          window.location.href = '/login?session=expired'
        }

        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    // Handle other errors
    if (error.response?.status === 403) {
      console.error('🚫 Access forbidden')
    }

    if (error.response?.status === 500) {
      console.error('💥 Server error')
    }

    return Promise.reject(error)
  }
)

export default api