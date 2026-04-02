'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step6Schema, type Step6Data } from '@/lib/validations/onboarding'
import { useOnboardingStore } from '@/lib/stores/onboarding'
import { Button } from '@/components/ui/atoms/button'
import { FormField } from '@/components/ui/molecules/form'
import { number } from 'zod'


const TIPE_OPTIONS = [
  'Remote Penuh',
  'Hybrid',
  'Onsite',
]


export function Step6() {
  const { data, updateData, currentStep, nextStep, prevStep } = useOnboardingStore()

  const {
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step6Data>({
    resolver: zodResolver(step6Schema),
    mode: "onChange",
    defaultValues: {
      job_type: data.job_type || '',
    },
  })

  const selectedTipe = watch('job_type')

  const isValid = !!selectedTipe

  const onSubmit = (formData: Step6Data) => {
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
          Tipe pekerjaan seperti apa yang kamu inginkan?
        </h2>
        <p className="text-[#757575] body-regular whitespace-normal">
          Ini akan menjadi filter utama saat mencari lowongan.
        </p>
      </div>

      <FormField error={errors.job_type?.message}>
        <div className="grid gap-3">
          {TIPE_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                setValue(
                    'job_type',
                    selectedTipe === option ? '' : option,
                    { shouldValidate: true }
                )
                }
              className={`p-4 rounded-lg border-2 transition-all font-medium ${
                selectedTipe === option
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