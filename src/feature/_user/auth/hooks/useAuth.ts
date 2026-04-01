import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/api/services/auth";
import { LoginPayload, RegisterPayload, User } from "@/shared/types/auth";
import { setAccessToken } from "@/api/core/axios";
import Cookies from 'js-cookie';

export const useAuth = () => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null) 
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (payload: LoginPayload) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authService.login(payload)
      console.log(response)
      
      const accessToken = response.data?.access_token || response.access_token;
      const userData = response.data?.user || response.user;

      if (!accessToken) throw new Error("Terjadi kesalahan, Token tidak ditemukan");

      setAccessToken(accessToken)
      setUser(userData);
      Cookies.set('access_token', accessToken, { expires: 1, path: '/' });
      Cookies.set('refresh_token', response.data?.refresh_token || response.refresh_token, { expires: 7, path: '/' });

      router.push('/beranda')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login gagal';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false)
    }
  }

  const register = async (payload: RegisterPayload) => {
    setLoading(true)
    setError(null)
    try {
      await authService.register(payload)
      router.push('/verify')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Register gagal';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false)
    }
  }

  return { user, loading, error, login, register }
}
