'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step5Schema, type Step5Data } from '@/lib/validations/onboarding'
import { useOnboardingStore } from '@/lib/stores/onboarding'
import { Button } from '@/components/ui/atoms/button'
import { FormField } from '@/components/ui/molecules/form'
import { number } from 'zod'


const BIDANG_OPTIONS = [
  'Teknologi & IT',
  'Administrasi & Keuangan',
  'Kesehatan',
  'Desain & Kreatif',
  'Pendidikan',
  'Perdagangan & Ritel',
  'Lainnya',
]


export function Step5() {
  const { data, updateData, currentStep, nextStep, prevStep } = useOnboardingStore()

  const {
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step5Data>({
    resolver: zodResolver(step5Schema),
    mode: "onChange",
    defaultValues: {
      job_field: data.job_field || '',
    },
  })

  const selectedBidang = watch('job_field')

  const isValid = !!selectedBidang

  const onSubmit = (formData: Step5Data) => {
    updateData(formData)
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className='bg-bl-01 rounded-full text-secondary body-semibold text-center py-1'>
          Pertanyaan {currentStep}
      </div>
      <div>
        <h2 className="h2-bold text-[#252525] mb-2">
          Bidang kerja apa yang paling kamu minati?
        </h2>
        <p className="text-[#757575] body-regular whitespace-normal">
          Pilih satu bidang yang paling sesuai dengan minat dan keahlianmu.
        </p>
      </div>

      <FormField error={errors.job_field?.message}>
        <div className="grid grid-cols-2 gap-3">
          {BIDANG_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                setValue(
                    'job_field',
                    selectedBidang === option ? '' : option,
                    { shouldValidate: true }
                )
                }
              className={`p-4 rounded-lg border-2 transition-all font-medium ${
                selectedBidang === option
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </FormField>

        <div className='w-full grid grid-cols-2  gap-4'>
            <Button onClick={prevStep} variant={"back"} disabled={!isValid}  size={"lg"}>
                Back
            </Button>

            <Button type="submit" variant={"lanjut"} size="lg" className='w-full'>
                Lanjut
            </Button>
        </div> 
    </form>
  )
}