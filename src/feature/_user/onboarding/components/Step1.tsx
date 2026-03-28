'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step1Schema, type Step1Data } from '@/lib/validations/onboarding'
import { useOnboardingStore } from '@/lib/stores/onboarding'
import { Button } from '@/components/ui/atoms/button'
import { Input } from '@/components/ui/atoms/input'
import { FormField } from '@/components/ui/molecules/form'

export function Step1() {
  const { data, updateData, nextStep, prevStep, currentStep } = useOnboardingStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      fullName: data.fullName || '',
    },
  })

  const onSubmit = (formData: Step1Data) => {
    updateData(formData)
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className='bg-bl-01 rounded-full text-secondary body-semibold text-center py-1'>
        Pertanyaan {currentStep}
      </div>
      <div>
        <h2 className="h2-bold text-[#252525] mb-2">
          Siapa nama kamu?
        </h2>
        <p className="text-[#757575] body-regular whitespace-normal">
          Kami akan menggunakan nama ini untuk mempersonalisasi pengalamanmu di WorkAble.
        </p>
      </div>

      <FormField label="" error={errors.fullName?.message} required>
        <Input
          type="text"
          placeholder="Masukkan namamu"
          {...register('fullName')}
          className={errors.fullName ? 'border-destructive placeholder:text-gray-400 rounded-xl py-4 shadow-none' : 'placeholder:text-gray-400 rounded-xl py-4 shadow-none'}
          autoFocus
        />
      </FormField>

      <div className='w-full flex items-center justify-center  gap-4'>
        {currentStep > 1 && (
          <div className='w-full grid grid-cols-2  gap-4'>
            <Button onClick={prevStep} variant={"back"}  size={"lg"}>
              Back
            </Button>

            <Button type="submit" variant={"lanjut"} size="lg" className='w-full'>
              Lanjut
            </Button>
          </div>
        )}
        {currentStep == 1 && (
          <Button type="submit" variant={"lanjut"} size="lg" className='w-full'>
            Lanjut
          </Button>
        )}
      </div>
    </form>
  )
}