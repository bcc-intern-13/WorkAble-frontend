'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step10Schema, type Step10Data } from '@/lib/validations/onboarding'
import { useOnboardingStore } from '@/lib/stores/onboarding'
import { Button } from '@/components/ui/atoms/button'
import { FormField } from '@/components/ui/molecules/form'
import { number } from 'zod'


const special_needs_OPTIONS = [
  'Alat bantu dengar / Ruang ramah tunarungu',
  'Akses kursi roda atau lift',
  'Software pembaca layar',
  'Tidak ada kebutuhan khusus',
]


export function Step10() {
  const { data, updateData, currentStep, nextStep, prevStep } = useOnboardingStore()

  const {
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step10Data>({
    resolver: zodResolver(step10Schema),
    mode: "onChange",
    defaultValues: {
      special_needs: data.special_needs || '',
    },
  })

  const selectedSpecialNeeds = watch('special_needs')

  const isValid = !!selectedSpecialNeeds

  const onSubmit = (formData: Step10Data) => {
    updateData(formData)
    useOnboardingStore.getState().submitOnboarding()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className='bg-bl-01 rounded-full text-secondary body-semibold text-center py-1'>
          Pertanyaan {currentStep}
      </div>
      <div>
        <h2 className="h2-bold text-[#252525] mb-2">
          Apakah kamu membutuhkan penyesuaian khusus di tempat kerja?
        </h2>
        <p className="text-[#757575] body-regular whitespace-normal">
          Informasi ini bersifat privat dan hanya digunakan untuk mencocokkan lowongan yang tepat.
        </p>
      </div>

      <FormField error={errors.special_needs?.message}>
        <div className="grid gap-3">
          {special_needs_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                setValue(
                    'special_needs',
                    selectedSpecialNeeds === option ? '' : option,
                    { shouldValidate: true }
                )
                }
              className={`p-4 rounded-lg border-2 transition-all font-medium ${
                selectedSpecialNeeds === option
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
                Selesai
            </Button>
        </div> 
    </form>
  )
}