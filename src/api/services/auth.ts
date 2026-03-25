// lib/api/auth.service.ts
import api, { setAccessToken, getAccessToken } from '@/lib/axios'
import { LoginFormData, RegisterFormData } from '@/lib/validations/auth'

// Response types
export interface User {
  id: string
  email: string
  name: string
  role: 'job_seeker' | 'employer' | 'admin'
  disability_type?: string
  created_at: string
}

export interface AuthResponse {
  success: boolean
  message: string
  data: {
    user: User
    access_token: string
    refresh_token?: string // Optional (sent as httpOnly cookie)
    expires_in: number // Access token expiry in seconds (e.g., 900 for 15 min)
  }
}

export interface RefreshResponse {
  success: boolean
  data: {
    access_token: string
    expires_in: number
  }
}

export interface ErrorResponse {
  success: false
  message: string
  errors?: Record<string, string[]>
}

export const authService = {
  /**
   * Login with email & password
   * Returns access token + refresh token (httpOnly cookie)
   */
  async login(credentials: LoginFormData): Promise<AuthResponse> {
    try {
      console.log('🔐 Login attempt:', { email: credentials.email })

      const response = await api.post<AuthResponse>('/auth/login', credentials)

      console.log('✅ Login successful:', {
        user: response.data.data.user.email,
        hasAccessToken: !!response.data.data.access_token,
      })

      // Store access token in memory
      setAccessToken(response.data.data.access_token)

      // Refresh token automatically stored as httpOnly cookie by backend

      return response.data
    } catch (error: any) {
      console.error('❌ Login failed:', error)
      throw this.handleError(error)
    }
  },

  /**
   * Register new user
   */
  async register(data: RegisterFormData): Promise<AuthResponse> {
    try {
      console.log('📝 Register attempt:', {
        email: data.email,
        role: data.role,
      })

      const response = await api.post<AuthResponse>('/auth/register', data)

      console.log('✅ Registration successful')

      // Store access token
      setAccessToken(response.data.data.access_token)

      return response.data
    } catch (error: any) {
      console.error('❌ Registration failed:', error)
      throw this.handleError(error)
    }
  },

  /**
   * Login with Google OAuth
   */
  async googleLogin(googleToken: string): Promise<AuthResponse> {
    try {
      console.log('🔐 Google login attempt')

      const response = await api.post<AuthResponse>('/auth/google', {
        token: googleToken,
      })

      console.log('✅ Google login successful')

      setAccessToken(response.data.data.access_token)

      return response.data
    } catch (error: any) {
      console.error('❌ Google login failed:', error)
      throw this.handleError(error)
    }
  },

  /**
   * Refresh access token using refresh token (from httpOnly cookie)
   */
  async refreshToken(): Promise<RefreshResponse> {
    try {
      console.log('🔄 Refreshing access token...')

      const response = await api.post<RefreshResponse>('/auth/refresh')

      console.log('✅ Token refreshed:', {
        expiresIn: response.data.data.expires_in,
      })

      // Update access token in memory
      setAccessToken(response.data.data.access_token)

      return response.data
    } catch (error: any) {
      console.error('❌ Token refresh failed:', error)
      throw this.handleError(error)
    }
  },

  /**
   * Logout user
   * Clears access token & invalidates refresh token on server
   */
  async logout(): Promise<void> {
    try {
      console.log('🚪 Logging out...')

      await api.post('/auth/logout')

      // Clear access token from memory
      setAccessToken(null)

      console.log('✅ Logout successful')
    } catch (error: any) {
      console.error('❌ Logout error:', error)
      // Clear token anyway
      setAccessToken(null)
      throw this.handleError(error)
    }
  },

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<User> {
    try {
      console.log('👤 Fetching current user...')

      const response = await api.get<{ success: true; data: User }>('/auth/me')

      console.log('✅ User fetched:', response.data.data.email)

      return response.data.data
    } catch (error: any) {
      console.error('❌ Fetch user failed:', error)
      throw this.handleError(error)
    }
  },

  /**
   * Verify if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!getAccessToken()
  },

  /**
   * Handle API errors
   */
  handleError(error: any): Error {
    if (error.response) {
      const data = error.response.data as ErrorResponse

      if (data.errors) {
        // Validation errors
        const firstError = Object.values(data.errors)[0]?.[0]
        return new Error(firstError || data.message)
      }

      return new Error(data.message || 'Terjadi kesalahan')
    }

    if (error.request) {
      return new Error('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.')
    }

    return new Error(error.message || 'Terjadi kesalahan yang tidak diketahui')
  },
}