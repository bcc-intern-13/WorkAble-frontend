'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/atoms/button'
import { Input } from '@/components/ui/atoms/input'
import { Alert, AlertDescription } from '@/components/ui/atoms/alert'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/atoms/tabs'
import { FormField } from '@/components/ui/molecules/form'
import { Checkbox } from '@/components/ui/atoms/checkbox'

import { RegisterApiSchema, registerSchema, type RegisterFormData } from '@/lib/validations/auth'
import { authService } from '@/api/services/auth'
import { setAccessToken } from '@/api/core/axios'
import { useToast } from '@/shared/hooks/useToast'
import { useAuth } from '@/feature/_user/auth/hooks/useAuth'


export default function RegisterContainer() {
  const { register: registerAuth } = useAuth();
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      namaDepan: '',
      namaBelakang: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  })

  const mapToRegisterPayload = (
    data: RegisterFormData
  ): RegisterApiSchema => {
    return {
      name: `${data.namaDepan} ${data.namaBelakang}`,
      username: data.namaDepan,
      email: data.email,
      password: data.password,
    }
  }

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null)

    try {
      const payload = mapToRegisterPayload(data)
      await registerAuth(payload)
      router.push('/verify')
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message)
        showToast({
          type: 'error',
          title: 'Registrasi gagal',
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

      <Tabs value="register" className="mb-8 p-1">
        <TabsList className="grid w-full grid-cols-2 gap-4 bg-bl-01">
          <TabsTrigger value="login" className='text-[#757575] p-4' onClick={() => router.push('/login')}>
            Masuk
          </TabsTrigger>
          <TabsTrigger value="register" className='text-[#757575] p-4'>Daftar</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mb-8">
        <h2 className="h2-semibold mb-2">
          Buat akun gratis
        </h2>
        <p className="body-regular">
          Daftar dalam 2 menit dan mulai perjalanan karier Anda.
        </p>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <p className="bg-background px-2 caption-regular text-muted-foreground">
            atau daftar dengan email
          </p>
        </div>
      </div>

      {serverError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
         <div className='grid grid-cols-2 gap-4'>
            <FormField label="Nama Depan" error={errors.namaDepan?.message} required>
                <Input
                    type="text"
                    placeholder="Masukkan nama depan"
                    {...register('namaDepan')}
                    className={errors.email ? 'border-destructive placeholder:text-gray-400 rounded-xl py-4 shadow-none' : 'placeholder:text-gray-400 rounded-xl py-4 shadow-none'}
                />
            </FormField>
            <FormField label="Nama Belakang" error={errors.namaBelakang?.message} required>
                <Input
                    type="text"
                    placeholder="Masukkan nama belakang"
                    {...register('namaBelakang')}
                    className={errors.email ? 'border-destructive placeholder:text-gray-400 rounded-xl py-4 shadow-none' : 'placeholder:text-gray-400 rounded-xl py-4 shadow-none'}
                />
            </FormField>
        </div>

        <FormField label="Email" error={errors.email?.message} required>
          <Input
            type="email"
            placeholder="nama@email.com"
            {...register('email')}
            className={errors.email ? 'border-destructive placeholder:text-gray-400 rounded-xl py-4 shadow-none' : 'placeholder:text-gray-400 rounded-xl py-4 shadow-none'}
          />
        </FormField>

        <FormField label="Nomor Telepon" error={errors.phone?.message} required>
          <Input
            type="tel"
            placeholder="+62"
            {...register('phone')}
            className={errors.email ? 'border-destructive placeholder:text-gray-400 rounded-xl py-4 shadow-none' : 'placeholder:text-gray-400 rounded-xl py-4 shadow-none'}
          />
        </FormField>

        <FormField label="Password" error={errors.password?.message} required>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Minimal 8 karakter"
              {...register('password')}
              className={errors.email ? 'border-destructive placeholder:text-gray-400 rounded-xl py-4 shadow-none pr-10' : 'placeholder:text-gray-400 rounded-xl py-4 shadow-none pr-10'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Harus mengandung huruf besar, huruf kecil, dan angka
          </p>
        </FormField>

        <FormField
          label="Konfirmasi Password"
          error={errors.confirmPassword?.message}
          required
        >
          <div className="relative">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Masukkan password lagi"
              {...register('confirmPassword')}
              className={
                errors.confirmPassword ? 'border-destructive pr-10 placeholder:text-gray-400 rounded-xl py-4 shadow-none' : 'pr-10 placeholder:text-gray-400 rounded-xl py-4 shadow-none'
              }
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </FormField>

        <FormField error={errors.acceptTerms?.message}>
          <div className="flex items-start gap-2">
            <Checkbox
              id="terms"
              checked={watch('acceptTerms')}
              onCheckedChange={(checked) =>
                setValue('acceptTerms', checked as boolean)
              }
              className={errors.acceptTerms ? 'border-destructive' : ''}
            />
            <label
              htmlFor="terms"
              className="caption-regular text-muted-foreground leading-tight cursor-pointer"
            >
              Saya setuju menyetujui{' '}
              <Link href="/terms" className="text-secondary hover:underline">
                Syarat & Ketentuan
              </Link>{' '}
              dan{' '}
              <Link href="/privacy" className="text-secondary hover:underline"> 
                Kebijakan Privasi
              </Link>
              WorkAble. Data disabilitas saya dijaga kerahsiaannya
            </label>
          </div>
        </FormField>
        
        <Button
          type="submit"
          variant={'lanjut'}
          className="w-full py-8"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? 'Memproses...' : 'Daftar Sekarang'}
        </Button>
      </form>

      <p className="text-center caption-semibold text-muted-foreground mt-4">
        Sudah punya akun?{' '}
        <Link href="/login" className="text-secondary hover:underline font-semibold">
          Masuk di sini
        </Link>
      </p>
    </section>
  )
}