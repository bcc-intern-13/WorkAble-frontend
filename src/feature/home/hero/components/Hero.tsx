import { Button } from '@/components/ui/button'
import React from 'react'

const Hero = () => {
  return (
    <section className='relative'>
        <div className='h-screen w-full flex flex-col justify-center items-center gap-2'>

            <div className='px-8 py-1 border-2 border-secondary rounded-full'>
                <h2 className='body-semibold text-secondary'>
                    PLATFORM KARIER INKLUSIF #1 DI INDONESIA
                </h2>
            </div>

            <div className='w-128 text-center text-black mb-2'>
                <h1 className='h1-bold'>
                    Break Your Limits
                </h1>
                <p className='caption-regular'>
                    WorkAble menghubungkan pencari kerja dengan ribuan perusahaan inklusif yang menghargai talenta — bukan menilai dari hal lain.
                </p>
            </div>

            <div className='flex gap-2 mb-6'>
                <Button variant={'default'} size={'default'}>Daftar gratis sekarang</Button>
                <Button variant={'black'} size={'default'}>Sudah punya akun? Masuk</Button>
            </div>

            <div className='flex gap-18 w-fit'>
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='h2-bold text-secondary'>
                        12K+
                    </h2>
                    <p className='caption-semibold text-[#757575]'>
                        Pencari Kerja
                    </p>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='h2-bold text-secondary'>
                        800+
                    </h2>
                    <p className='caption-semibold text-[#757575]'>
                        Perubahan inklusif
                    </p>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='h2-bold text-secondary'>
                        4.500+
                    </h2>
                    <p className='caption-semibold text-[#757575]'>
                        Lowongan Aktif
                    </p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Hero