import { X } from 'lucide-react'
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

export const step4Schema = z.object({
  pendidikanTerakhir: z.string().min(1, 'Pendidikan terakhir wajib dipilih'),
})

export const step5Schema = z.object({
  bidangKerja: z.string().min(1, 'Bidang kerja wajib dipilih'),
})

export const step6Schema = z.object({
  tipePekerjaan: z.string().min(1, 'Tipe pekerjaan wajib dipilih'),
})

export const step7Schema = z.object({
  statusKerja: z.string().min(1, 'Status kerja wajib dipilih'),
})

export const step8Schema = z.object({
  caraKomunikasi: z.string().min(1, 'Cara komunikasi wajib dipilih'),
})

export const completeOnboardingSchema = z.object({
  fullName: step1Schema.shape.fullName,
  age: step2Schema.shape.age,
  city: step3Schema.shape.city,
  pendidikanTerakhir: step4Schema.shape.pendidikanTerakhir,
  bidangKerja: step5Schema.shape.bidangKerja,
  tipePekerjaan: step6Schema.shape.tipePekerjaan,
  statusKerja: step7Schema.shape.statusKerja,
  caraKomunikasi: step8Schema.shape.caraKomunikasi,
})

export type Step1Data = z.infer<typeof step1Schema>
export type Step2Data = z.infer<typeof step2Schema>
export type Step3Data = z.infer<typeof step3Schema>
export type Step4Data = z.infer<typeof step4Schema>
export type Step5Data = z.infer<typeof step5Schema>
export type Step6Data = z.infer<typeof step6Schema>
export type Step7Data = z.infer<typeof step7Schema>
export type Step8Data = z.infer<typeof step8Schema>
export type CompleteOnboardingData = z.infer<typeof completeOnboardingSchema>