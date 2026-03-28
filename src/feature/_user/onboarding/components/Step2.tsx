'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step2Schema, type Step2Data } from '@/lib/validations/onboarding'
import { useOnboardingStore } from '@/lib/stores/onboarding'
import { Button } from '@/components/ui/atoms/button'
import { FormField } from '@/components/ui/molecules/form'
import { number } from 'zod'


const AGE_OPTIONS = [
  '18',
  '18-24',
  '25-30',
  '31-35',
  '35+',
]


export function Step2() {
  const { data, updateData, currentStep, nextStep, prevStep } = useOnboardingStore()

  const {
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    mode: "onChange",
    defaultValues: {
      age: data.age || '',
    },
  })

  const selectedAge = watch('age')

  const isValid = !!selectedAge

  const onSubmit = (formData: Step2Data) => {
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
          Berapa usiamu?
        </h2>
        <p className="text-[#757575] body-regular whitespace-normal">
          Ini membantu kami memberikan rekomendasi yang lebih relevan.
        </p>
      </div>

      <FormField error={errors.age?.message}>
        <div className="grid gap-3">
          {AGE_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                setValue(
                    'age',
                    selectedAge === option ? '' : option,
                    { shouldValidate: true }
                )
                }
              className={`p-4 rounded-lg border-2 transition-all font-medium ${
                selectedAge === option
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              {option} tahun
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