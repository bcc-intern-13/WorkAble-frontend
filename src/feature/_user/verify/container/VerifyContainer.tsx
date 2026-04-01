"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { setAccessToken } from "@/api/core/axios";
import { useToast } from "@/shared/hooks/useToast";
import { authService } from "@/api/services/auth";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const { showToast } = useToast();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setStatus("loading");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await authService.verify(token);
        console.log('Registration successful:', response)
        
        if (response.data.success) {
            setStatus("success");
            setAccessToken(token)
            
            console.log('Registration successful:', response)

            showToast({
                type: 'success',
                title: 'Registrasi berhasil',
                message: 'Selamat datang di WorkAble!',
            })

            setTimeout(() => {
                router.push("/onboarding");
            }, 3000);
            return;
        }

    } catch (error) {
        setStatus("error");
        router.push("/register");
        }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="p-8 bg-white rounded-2xl shadow-xl text-center max-w-sm w-full border border-blue-100">
        {status === "loading" && (
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-secondary-bl-07 font-bold">Sedang memverifikasi email..., Cek Email-mu</p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-4">
            <div className="text-5xl">✅</div>
            <h1 className="text-2xl font-black text-[#005E82]">VERIFIKASI BERHASIL!</h1>
            <p className="text-gray-600">Email kamu sudah aktif. Mengalihkan ke halaman onboarding...</p>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <div className="text-5xl">❌</div>
            <h1 className="text-2xl font-black text-red-600">VERIFIKASI GAGAL</h1>
            <p className="text-gray-600">Token tidak valid atau sudah kadaluwarsa.</p>
            <button 
              onClick={() => router.push("/register")}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold"
            >
              Coba Registrasi Lagi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}