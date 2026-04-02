import { X } from 'lucide-react'
import { z } from 'zod'

export const step1Schema = z.object({
  name: z
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
  education: z.string().min(1, 'Pendidikan terakhir wajib dipilih'),
})

export const step5Schema = z.object({
  job_field: z.string().min(1, 'Bidang kerja wajib dipilih'),
})

export const step6Schema = z.object({
  job_type: z.string().min(1, 'Tipe pekerjaan wajib dipilih'),
})

export const step7Schema = z.object({
  status: z.string().min(1, 'Status kerja wajib dipilih'),
})

export const step8Schema = z.object({
  communication_preference: z.string().min(1, 'Cara komunikasi wajib dipilih'),
})

export const step9Schema = z.object({
  work_environment: z.array(z.string()).min(1, 'Pilih setidaknya satu opsi ideal buatmu'),
})

export const step10Schema = z.object({
  special_needs: z.string().min(1, 'Bantuan wajib dipilih'),
})

export const completeOnboardingSchema = z.object({
  name: step1Schema.shape.name,
  age: step2Schema.shape.age,
  city: step3Schema.shape.city,
  education: step4Schema.shape.education,
  job_field: step5Schema.shape.job_field,
  job_type: step6Schema.shape.job_type,
  status: step7Schema.shape.status,
  communication_preference: step8Schema.shape.communication_preference,
  work_environment: step9Schema.shape.work_environment,
  special_needs: step10Schema.shape.special_needs,
})

export type Step1Data = z.infer<typeof step1Schema>
export type Step2Data = z.infer<typeof step2Schema>
export type Step3Data = z.infer<typeof step3Schema>
export type Step4Data = z.infer<typeof step4Schema>
export type Step5Data = z.infer<typeof step5Schema>
export type Step6Data = z.infer<typeof step6Schema>
export type Step7Data = z.infer<typeof step7Schema>
export type Step8Data = z.infer<typeof step8Schema>
export type Step9Data = z.infer<typeof step9Schema>
export type Step10Data = z.infer<typeof step10Schema>
export type CompleteOnboardingData = z.infer<typeof completeOnboardingSchema>