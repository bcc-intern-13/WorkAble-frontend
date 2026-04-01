"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useToast } from "@/shared/hooks/useToast";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const isVerified = searchParams.get("verified") === "true";
  
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    isVerified ? "success" : "loading"
  );
  
  const { showToast } = useToast();

  useEffect(() => {
    if (isVerified) {
      setStatus("success");
      
      console.log('Verifikasi email sukses, mengalihkan ke login...');

      const timer = setTimeout(() => {
        showToast({
          type: 'success',
          title: 'Email Terverifikasi',
          message: 'Silakan masuk menggunakan akun Anda.',
        });
        router.push("/login");
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setStatus("loading");
    }
  }, [isVerified, router, showToast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="p-8 bg-white rounded-2xl shadow-xl text-center max-w-sm w-full border border-blue-100">
        {status === "loading" && (
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <h1 className="text-xl font-bold text-[#005E82]">Cek Email Anda</h1>
            <p className="text-gray-600">
              Kami telah mengirimkan link verifikasi. Silakan klik link tersebut untuk mengaktifkan akun Anda.
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-4">
            <div className="text-5xl">✅</div>
            <h1 className="text-2xl font-black text-[#005E82]">VERIFIKASI BERHASIL!</h1>
            <p className="text-gray-600">Email kamu sudah aktif. Mengalihkan ke halaman login...</p>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <div className="text-5xl">❌</div>
            <h1 className="text-2xl font-black text-red-600">VERIFIKASI GAGAL</h1>
            <p className="text-gray-600">Terjadi kesalahan pada URL verifikasi.</p>
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