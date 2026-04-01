import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid'),
  password: z
    .string()
    .min(1, 'Password wajib diisi')
    .min(8, 'Password minimal 8 karakter'),
})

export const RegisterApiSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
})

export const registerSchema = z
  .object({
    namaDepan: z
      .string()
      .min(1, 'Nama lengkap wajib diisi')
      .min(3, 'Nama minimal 3 karakter')
      .max(100, 'Nama maksimal 100 karakter'),
    namaBelakang: z
      .string()
      .min(1, 'Nama lengkap wajib diisi')
      .min(3, 'Nama minimal 3 karakter')
      .max(100, 'Nama maksimal 100 karakter'),
    email: z
      .string()
      .min(1, 'Email wajib diisi')
      .email('Format email tidak valid'),
    phone: z
        .string()
        .min(10, 'Nomor telepon minimal 10 karakter')
        .regex(/^\+62\d{9,12}$/, 'Format nomor telepon tidak valid (contoh: +62812345678)'),
    password: z
      .string()
      .min(1, 'Password wajib diisi')
      .min(8, 'Password minimal 8 karakter')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])/,
        'Password harus mengandung huruf besar, huruf kecil, angka, dan simbol'
      ),
    confirmPassword: z.string().min(1, 'Konfirmasi password wajib diisi'),
    acceptTerms: z
      .boolean()
      .refine((val) => val === true, {
        message: 'Anda harus menyetujui syarat dan ketentuan',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password tidak cocok',
    path: ['confirmPassword'],
  })

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type RegisterApiSchema = z.infer<typeof RegisterApiSchema>
