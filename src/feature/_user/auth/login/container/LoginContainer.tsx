'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, AlertCircle, Loader2, AlertTriangle } from 'lucide-react'

import { Button } from '@/components/ui/atoms/button'
import { Input } from '@/components/ui/atoms/input'
import { Alert, AlertDescription } from '@/components/ui/atoms/alert'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/atoms/tabs'
import { FormField } from '@/components/ui/molecules/form'

import { loginSchema, type LoginFormData } from '@/lib/validations/auth'
import { authService } from '@/api/services/auth'
import { setAccessToken } from '@/api/core/axios'
import { useToast } from '@/shared/hooks/useToast'
import { useAuth } from '@/feature/_user/auth/hooks/useAuth'

export default function LoginContainer() {
  const { login } = useAuth();
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [sessionExpired, setSessionExpired] = useState(false)
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null)
    setSessionExpired(false)

    try {
      const redirectPath = searchParams.get('from') || '/beranda'
      await login(data, redirectPath)

      showToast({
        type: 'success',
        title: 'Login berhasil',
        message: 'Selamat datang kembali di WorkAble!',
      })
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message)
        showToast({
          type: 'error',
          title: 'Login gagal',
          message: error.message,
        })
      }
    }
  }

  return (
    <section className="w-full max-h-xl">
      <div className="lg:hidden mb-8">
        <h1 className="text-secondary h2-bold">WorkAble</h1>
        <p className="text-sm text-muted-foreground">
          Platform Karier Inklusif
        </p>
      </div>

      <Tabs value="login" className="mb-8 p-1">
        <TabsList className="grid w-full grid-cols-2 gap-4 bg-bl-01">
          <TabsTrigger value="login" className="text-[#757575] p-4">
            Masuk
          </TabsTrigger>
          <TabsTrigger
            value="register"
            className="text-[#757575] p-4"
            onClick={() => router.push('/register')}
          >
            Daftar
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mb-8">
        <h2 className="h2-semibold mb-2">Selamat Datang!</h2>
        <p className="body-regular">
          Masuk untuk melanjutkan perjalanan karier Anda bersama WorkAble.
        </p>
      </div>

      {sessionExpired && (
        <Alert variant="default" className="mb-6 border-amber-500 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            Sesi Anda telah berakhir karena tidak aktif. Silakan login kembali
            untuk melanjutkan.
          </AlertDescription>
        </Alert>
      )}

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <p className="bg-background px-2 caption-regular text-muted-foreground">
            atau masuk dengan email
          </p>
        </div>
      </div>

      {serverError && !sessionExpired && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormField label="Email" error={errors.email?.message} required>
          <Input
            type="email"
            placeholder="nama@gmail.com"
            autoComplete="email"
            {...register('email')}
            className={
              errors.email
                ? 'border-destructive placeholder:text-gray-400 rounded-xl py-4 shadow-none'
                : 'placeholder:text-gray-400 rounded-xl py-4 shadow-none'
            }
            disabled={isSubmitting}
          />
        </FormField>

        <FormField label="Password" error={errors.password?.message} required>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Masukkan password"
              autoComplete="current-password"
              {...register('password')}
              className={
                errors.password
                  ? 'border-destructive pr-10 placeholder:text-gray-400 rounded-xl py-4 shadow-none'
                  : 'pr-10 placeholder:text-gray-400 rounded-xl py-4 shadow-none'
              }
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </FormField>

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="caption-semibold text-secondary hover:text-primary transition-colors"
          >
            Lupa Password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="lanjut"
          className="w-full py-8"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? 'Memproses...' : 'Masuk ke WorkAble'}
        </Button>
      </form>

      <p className="text-center caption-semibold text-muted-foreground mt-4">
        Belum punya akun?{' '}
        <Link
          href="/register"
          className="text-secondary hover:underline font-semibold"
        >
          Daftar Gratis
        </Link>
      </p>
    </section>
  )
}