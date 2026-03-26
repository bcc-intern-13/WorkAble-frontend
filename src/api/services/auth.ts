import api from '../core/axios'
import type { CompleteOnboardingData } from '@/lib/validations/onboarding'

export interface OnboardingResponse {
  success: boolean
  message: string
  data: {
    user: {
      id: string
      onboarding_completed: boolean
    }
  }
}

export const onboardingService = {
  /**
   * Submit complete onboarding data
   */
  async submitOnboarding(data: CompleteOnboardingData): Promise<OnboardingResponse> {
    try {
      console.log('📤 Submitting onboarding:', data)

      const response = await api.post<OnboardingResponse>('/api/onboarding/submit', {
        full_name: data.fullName,
        age: data.age,
        city: data.city,
        education: data.education,
        disability_type: data.disabilityType,
        job_type_preference: data.jobType,
      })

      console.log('✅ Onboarding submitted successfully')

      return response.data
    } catch (error: any) {
      console.error('❌ Onboarding submission failed:', error)
      throw new Error(error.message || 'Gagal menyimpan data onboarding')
    }
  },

  /**
   * Get onboarding status
   */
  async getOnboardingStatus(): Promise<{ completed: boolean }> {
    try {
      const response = await api.get<{ data: { completed: boolean } }>(
        '/onboarding/status'
      )
      return response.data.data
    } catch (error) {
      throw new Error('Gagal mengecek status onboarding')
    }
  },
}