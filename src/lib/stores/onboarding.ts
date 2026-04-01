import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CompleteOnboardingData } from '@/lib/validations/onboarding'

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
            return !!data.fullName
          case 2:
            return !!data.age
          case 3:
            return !!data.city
          case 4:
            return !!data.pendidikanTerakhir
          case 5:
            return !!data.bidangKerja
          case 6:
            return !!data.tipePekerjaan
          case 7:
            return !!data.statusKerja
          default:
            return false
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