import { CompleteOnboardingData } from "@/lib/validations/onboarding"
import api from "../core/axios"

export const onboardingService = {
    submit: async (data: CompleteOnboardingData) => {
        const response = await api.post('/onboarding/submit', data)
        return response.data
    }
}