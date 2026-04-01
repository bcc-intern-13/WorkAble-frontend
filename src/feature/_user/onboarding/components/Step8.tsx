'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step8Schema, type Step8Data } from '@/lib/validations/onboarding'
import { useOnboardingStore } from '@/lib/stores/onboarding'
import { Button } from '@/components/ui/atoms/button'
import { FormField } from '@/components/ui/molecules/form'
import { number } from 'zod'


const KOMUNIKASI_OPTIONS = [
  'Teks atau Chat',
  'Video Call',
  'Telepon Suara',
  'Tatap Muka',
  'Video Rekaman',
]


export function Step8() {
  const { data, updateData, currentStep, nextStep, prevStep } = useOnboardingStore()

  const {
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step8Data>({
    resolver: zodResolver(step8Schema),
    mode: "onChange",
    defaultValues: {
      caraKomunikasi: data.caraKomunikasi || '',
    },
  })

  const selectedStatus = watch('caraKomunikasi')

  const isValid = !!selectedStatus

  const onSubmit = (formData: Step8Data) => {
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
          Cara komunikasi apa yang paling nyaman buatmu?
        </h2>
        <p className="text-[#757575] body-regular whitespace-normal">
          Ini akan digunakan untuk menentukan format wawancara yang sesuai.
        </p>
      </div>

      <FormField error={errors.caraKomunikasi?.message}>
        <div className="grid gap-3">
          {KOMUNIKASI_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                setValue(
                    'caraKomunikasi',
                    selectedStatus === option ? '' : option,
                    { shouldValidate: true }
                )
                }
              className={`p-4 rounded-lg border-2 transition-all font-medium ${
                selectedStatus === option
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