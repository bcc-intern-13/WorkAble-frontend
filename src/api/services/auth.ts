import api, { setAccessToken, getAccessToken } from '../core/axios'
import { LoginFormData } from '@/lib/validations/auth'
import { handleError } from './errors'
import { RegisterFormData } from '@/lib/validations/auth'

export interface User {
  id: string
  email: string
}

export interface RegisterResponse{
  data: {
    id: string
    email: string
    avatar_url: string
    is_verified: boolean
    created_at: string
    updated_at: string
  }
  message: string
  success: true
}

export interface LoginResponse {
  data: {
    access_token: string
    refresh_token: string
    user: User
  }
  message: string
  success: true
}

export interface ErrorResponse {
  success: false
  error: {
    type: string
    message: string
    detail: string
    status: number
  }
}

export interface LoginPayload {
  email: string
  password: string
}

export const authService = {
  async login(credentials: LoginFormData): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/auth/login', credentials)
      setAccessToken(response.data.data.access_token)
      return response.data
    } catch (error) {
      console.error('Login failed:', error)
      throw handleError(error)
    }
  },

  
  async register(data: RegisterFormData): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/auth/register', data)
      setAccessToken(response.data.data.access_token)
      return response.data
    } catch (error) {
      console.error('Registration failed:', error)
      throw handleError(error)
    }
  },
  
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout')
      setAccessToken(null)
    } catch (error) {
      console.error('Logout error:', error)
      setAccessToken(null)
      throw handleError(error)
    }
  },

  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get<{ success: true; data: User }>('/auth/me')
      console.log('User fetched:', response.data.data.email)

      return response.data.data
    } catch (error) {
      console.error('Fetch user failed:', error)
      throw handleError(error)
    }
  },

  
  isAuthenticated(): boolean {
    return !!getAccessToken()
  },

}