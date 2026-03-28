import { z } from 'zod'

export const step1Schema = z.object({
  fullName: z
    .string()
    .min(1, 'Nama lengkap wajib diisi')
    .min(3, 'Nama minimal 3 karakter')
    .max(100, 'Nama maksimal 100 karakter'),
})

export const step2Schema = z.object({
  age: z
    .string()
    .min(1, 'Usia wajib dipilih')
})


export const step3Schema = z.object({
  city: z.string().min(1, 'Kota wajib diisi'),
})

export const completeOnboardingSchema = z.object({
  fullName: step1Schema.shape.fullName,
  age: step2Schema.shape.age,
  city: step3Schema.shape.city,
})

export type Step1Data = z.infer<typeof step1Schema>
export type Step2Data = z.infer<typeof step2Schema>
export type Step3Data = z.infer<typeof step3Schema>
export type CompleteOnboardingData = z.infer<typeof completeOnboardingSchema>