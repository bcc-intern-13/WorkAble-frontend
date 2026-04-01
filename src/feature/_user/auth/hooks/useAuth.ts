import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService, } from "@/api/services/auth";
import { LoginPayload, RegisterPayload, User } from "@/shared/types/auth";
import { setAccessToken } from "@/api/core/axios";

export const useAuth = () => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [Loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (payload: LoginPayload) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authService.login(payload)

      if (response.error || !response.data) {
        const errorMsg = response.message || "Login failed";
        throw new Error(errorMsg);
      }

      setAccessToken(response.access_token)

      const userData = response.data.user;
      setUser(userData || null);
    } catch (error) {
      setUser(null)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (payload: RegisterPayload) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authService.register(payload)

      if (response.error || !response.data) {
        const errorMsg = response.message || "Register failed";
        throw new Error(errorMsg);
      }

      setAccessToken(response.access_token)

      const userData = response.data.user;
      setUser(userData || null);
    } catch (error) {
      setUser(null)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    setError(null)
    try {
      await authService.logout()
      setAccessToken(null)
      setUser(null)
      router.push('/login')
    } catch (error) {
      setUser(null)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    Loading,
    error,
    login,
    register,
    logout
  }
}