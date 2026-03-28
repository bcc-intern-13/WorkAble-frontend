'use client'

import { useOnboardingStore } from '@/lib/stores/onboarding'
import { Step1 } from '../components/Step1'
import { Step2 } from '../components/Step2'
import { ChevronLeft } from 'lucide-react'

export const TOTAL_STEPS = 6



export default function OnboardingContainer() {
  const { currentStep, getProgress } = useOnboardingStore()

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />
      case 2:
        return <Step2 />
      default:
        return <Step1 />
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 mt-22">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-4 mb-8 ">
          {renderStep()}
        </div>
      </div>
    </div>
  )
}