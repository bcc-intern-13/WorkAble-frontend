export interface User {
  id: string
  email: string
}

export interface RegisterResponse{
  data: {
    avatar_url: string
    created_at: string
    email: string
    id: string
    is_premium: boolean
    is_verified: boolean
    nama: string
    onboarding_completed: boolean
    premium_expires_at: string
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

export interface RegisterPayload {
  name: string
  username: string
  email: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}