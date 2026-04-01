'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step7Schema, type Step7Data } from '@/lib/validations/onboarding'
import { useOnboardingStore } from '@/lib/stores/onboarding'
import { Button } from '@/components/ui/atoms/button'
import { FormField } from '@/components/ui/molecules/form'
import { number } from 'zod'


const STATUS_OPTIONS = [
  'Masih kuliah',
  'Fresh Graduate',
  'Sedang mencari kerja',
  'Sudah bekerja',
]


export function Step7() {
  const { data, updateData, currentStep, nextStep, prevStep } = useOnboardingStore()

  const {
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step7Data>({
    resolver: zodResolver(step7Schema),
    mode: "onChange",
    defaultValues: {
      statusKerja: data.statusKerja || '',
    },
  })

  const selectedStatus = watch('statusKerja')

  const isValid = !!selectedStatus

  const onSubmit = (formData: Step7Data) => {
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
          Apa status kamu saat ini?
        </h2>
        <p className="text-[#757575] body-regular whitespace-normal">
          Ini membantu kami memahami kebutuhan dan urgensi pencarianmu.
        </p>
      </div>

      <FormField error={errors.statusKerja?.message}>
        <div className="grid gap-3">
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                setValue(
                    'statusKerja',
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