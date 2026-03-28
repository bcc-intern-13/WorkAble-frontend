import axios from "axios"
import { ErrorResponse } from "./auth"

export function handleError(error: unknown): Error {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ErrorResponse | undefined

    if (data?.error?.message) {
      return new Error(data.error.message)
    }

    if (error.request) {
      return new Error("Tidak bisa terhubung ke server")
    }

    return new Error("Server error")
  }

  if (error instanceof Error) {
    return new Error(error.message)
  }

  return new Error("Unknown error")
}