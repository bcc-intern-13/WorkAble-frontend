'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step9Schema, type Step9Data } from '@/lib/validations/onboarding'
import { useOnboardingStore } from '@/lib/stores/onboarding'
import { Button } from '@/components/ui/atoms/button'
import { FormField } from '@/components/ui/molecules/form'

const LINGKUNGAN_OPTIONS = [
  'Ruang tenang dan minim gangguan',
  'Jadwal kerja fleksibel',
  'Aksesibilitas fisik gedung',
  'Ruang kerja yang suportif',
  'Tidak ada preferensi khusus',
]

export function Step9() {
  const { data, updateData, currentStep, nextStep, prevStep } = useOnboardingStore()

  const {
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step9Data>({
    resolver: zodResolver(step9Schema),
    mode: "onChange",
    defaultValues: {
      work_environment: data.work_environment || [],
    },
  })

  const selectedOptions = watch('work_environment')

  const isValid = selectedOptions.length > 0;

  const toggleOption = (option: string) => {
    if (option === 'Tidak ada preferensi khusus') {
       if (selectedOptions.includes(option)) {
           setValue('work_environment', [], { shouldValidate: true })
       } else {
           setValue('work_environment', [option], { shouldValidate: true })
       }
       return;
    }

    let newOptions = selectedOptions.filter(o => o !== 'Tidak ada preferensi khusus');

    if (newOptions.includes(option)) {
      newOptions = newOptions.filter((o) => o !== option)
    } else {
      newOptions.push(option)
    }
    
    setValue('work_environment', newOptions, { shouldValidate: true })
  }

  const onSubmit = (formData: Step9Data) => {
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
          Lingkungan kerja seperti apa yang ideal buatmu?
        </h2>
        <p className="text-[#757575] body-regular whitespace-normal">
          Kamu bisa pilih lebih dari satu opsi.
        </p>
      </div>

      <FormField error={errors.work_environment?.message}>
        <div className="grid gap-3">
          {LINGKUNGAN_OPTIONS.map((option) => {
            const isSelected = selectedOptions.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => toggleOption(option)}
                className={`p-4 rounded-lg border-2 transition-all font-medium text-left ${
                  isSelected
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                {option}
              </button>
            )
          })}
        </div>
      </FormField>

        <div className='w-full grid grid-cols-2 gap-4'>
            <Button type="button" onClick={prevStep} variant={"back"} size={"lg"}>
                Back
            </Button>

            <Button type="submit" variant={"lanjut"} size="lg" className='w-full' disabled={!isValid}>
                Lanjut
            </Button>
        </div> 
    </form>
  )
}