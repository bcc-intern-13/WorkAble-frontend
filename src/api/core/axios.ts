import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
  withCredentials: true, 
})

let accessToken: string | null = null

export const setAccessToken = (token: string | null) => {
  accessToken = token
}

export const getAccessToken = () => accessToken

const clearAuthAndRedirect = (reason: string = 'expired') => {
  setAccessToken(null)
  
  if (typeof window !== 'undefined') {
    sessionStorage.clear()
  }
  
  if (typeof document !== 'undefined') {
    document.cookie.split(';').forEach(cookie => {
      const name = cookie.split('=')[0].trim()
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    })
  }
  
  if (typeof window !== 'undefined') {
    window.location.href = `/login?session=${reason}`
  }
}

interface QueueItem {
  resolve: (value: string | null) => void
  reject: (reason: Error) => void
}

let isRefreshing = false
let failedQueue: QueueItem[] = []

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

interface RefreshTokenResponse {
  data: {
    access_token: string
  }
}

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken()

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    console.log('API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      hasToken: !!token,
    })

    return config
  },
  (error: AxiosError) => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('API Response:', {
      status: response.status,
      url: response.config.url,
    })
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    console.error('API Error:', {
      status: error.response?.status,
      url: originalRequest?.url,
    })

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            if (originalRequest.headers && token) {
              originalRequest.headers.Authorization = `Bearer ${token}`
            }
            return api(originalRequest)
          })
          .catch((err: Error) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const response = await axios.post<RefreshTokenResponse>(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          {
            withCredentials: true, 
          }
        )

        const { access_token } = response.data.data

        console.log('Access token refreshed successfully')

        setAccessToken(access_token)

        await fetch('/api/auth/refresh', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ access_token }),
        }).catch(() => {
          console.log('Session API route not available')
        })

        processQueue(null, access_token)

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access_token}`
        }

        return api(originalRequest)
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError)

        const error = refreshError instanceof Error 
          ? refreshError 
          : new Error('Unknown error occurred during token refresh')

        processQueue(error, null)

        clearAuthAndRedirect('expired')

        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }
  
    if (error.response?.status === 403) {
      console.error('Access forbidden')
    }

    if (error.response?.status === 500) {
      console.error('Server error')
    }

    return Promise.reject(error)
  }
)

export const clearAuth = () => {
  clearAuthAndRedirect('logout')
}

export default api