'use client'

import { useOnboardingStore } from '@/lib/stores/onboarding'
import { Step1 } from '../components/Step1'
import { Step2 } from '../components/Step2'
import { ChevronLeft } from 'lucide-react'
import { Step3 } from '../components/Step3'
import { Step4 } from '../components/Step4'
import { Step5 } from '../components/Step5'
import { Step6 } from '../components/Step6'
import { Step7 } from '../components/Step7'
import { Step8 } from '../components/Step8'

export const TOTAL_STEPS = 10



export default function OnboardingContainer() {
  const { currentStep, getProgress } = useOnboardingStore()

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />
      case 2:
        return <Step2 />
      case 3:
        return <Step3/>
      case 4:
        return <Step4/>
      case 5:
        return <Step5/>
      case 6:
        return <Step6/>
      case 7:
        return <Step7/>
      case 8:
        return <Step8/>
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