import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CompleteOnboardingData } from '@/lib/validations/onboarding'
import { onboardingService } from '@/api/services/onboarding'

interface OnboardingStore {
  currentStep: number
  
  data: Partial<CompleteOnboardingData>
  
  setCurrentStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  updateData: (newData: Partial<CompleteOnboardingData>) => void
  resetOnboarding: () => void
  
  isStepCompleted: (step: number) => boolean
  getProgress: () => number
  submitOnboarding: () => Promise<{ success: boolean; error?: string }>
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      data: {},
      
      setCurrentStep: (step) => set({ currentStep: step }),
      
      nextStep: () => {
        const { currentStep } = get()
        if (currentStep < 10) {
          set({ currentStep: currentStep + 1 })
        }
      },
      
      prevStep: () => {
        const { currentStep } = get()
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1 })
        }
      },
      
      updateData: (newData) => {
        set((state) => ({
          data: { ...state.data, ...newData }
        }))
      },
      
      resetOnboarding: () => {
        set({ currentStep: 1, data: {} })
      },
      
      isStepCompleted: (step) => {
        const { data } = get()
        
        switch (step) {
          case 1:
            return !!data.name
          case 2:
            return !!data.age
          case 3:
            return !!data.city
          case 4:
            return !!data.education
          case 5:
            return !!data.job_field
          case 6:
            return !!data.job_type
          case 7:
            return !!data.status
          case 8:
            return !!data.communication_preference
          case 9:
            return !!(data.work_environment && data.work_environment.length > 0)
          case 10:
            return !!data.special_needs
          default:
            return false
        }
      },

      submitOnboarding: async () => {
        const { data } = get()
        try {
          console.log(data)
          await onboardingService.submit(data as CompleteOnboardingData)
          get().resetOnboarding()
          return { success: true }
        } catch (error) {
          return { success: false, error: error instanceof Error ? error.message : 'Gagal submit onboarding' }
        }
      },
      
      getProgress: () => {
        const { currentStep } = get()
        return (currentStep / 10) * 100
      },

    }),
    {
      name: 'onboarding-storage', 
    }
  )
)