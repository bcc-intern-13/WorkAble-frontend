import api, { getAccessToken } from '../core/axios'
import { RegisterApiSchema } from '@/lib/validations/auth'
import { LoginFormData } from '@/lib/validations/auth'
import { LoginPayload } from '@/shared/types/auth'

export const authService = {
  login: async (payload: LoginPayload) => {
    const response = await api.post('/auth/login', payload)
    return response.data
  },
  register: async (payload: RegisterApiSchema) => {
    const response = await api.post('/auth/register', payload)
    return response.data
  },
  verify: async (token: string) => {
    const response = await api.get(`/auth/verify?token=${token}`);
    return response.data;
  },
  logout: async () => {
    const response = await api.post('/auth/logout')
    return response.data
  },
  isAuthenticated: () => {
    const token = getAccessToken()
    return !!token
  }
  // getProfile: async () => {
  //   const response = await api.get('/auth/me')
  //   return response.data
  // },
}
// import api, { setAccessToken, getAccessToken } from '../core/axios'
// import { LoginFormData } from '@/lib/validations/auth'
// import { handleError } from './errors'
// import { RegisterFormData } from '@/lib/validations/auth'


// export const authService = {
//   async login(credentials: LoginFormData): Promise<LoginResponse> {
//     try {
//       const response = await api.post<LoginResponse>('/auth/login', credentials)
//       setAccessToken(response.data.data.access_token)
//       return response.data
//     } catch (error) {
//       console.error('Login failed:', error)
//       throw handleError(error)
//     }
//   },

  
//   async register(data: RegisterFormData): Promise<LoginResponse> {
//     try {
//       const response = await api.post<LoginResponse>('/auth/register', data)
//       setAccessToken(response.data.data.access_token)
//       return response.data
//     } catch (error) {
//       console.error('Registration failed:', error)
//       throw handleError(error)
//     }
//   },
  
//   async logout(): Promise<void> {
//     try {
//       await api.post('/auth/logout')
//       setAccessToken(null)
//     } catch (error) {
//       console.error('Logout error:', error)
//       setAccessToken(null)
//       throw handleError(error)
//     }
//   },

//   async getCurrentUser(): Promise<User> {
//     try {
//       const response = await api.get<{ success: true; data: User }>('/auth/me')
//       console.log('User fetched:', response.data.data.email)

//       return response.data.data
//     } catch (error) {
//       console.error('Fetch user failed:', error)
//       throw handleError(error)
//     }
//   },

  
//   isAuthenticated(): boolean {
//     return !!getAccessToken()
//   },

// }