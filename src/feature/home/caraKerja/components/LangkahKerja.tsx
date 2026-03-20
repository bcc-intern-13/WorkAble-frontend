import React from 'react'
import { langkahKerjaData } from '../data/langkahKerjaData'
import { TLangkahKerja } from '../types/TLangkahKerja'

interface LangkahKerjaProps {
    langkahKerjaData : TLangkahKerja
}

export default function LangkahKerja({ langkahKerjaData }: LangkahKerjaProps) {
  return (
    <div className=''>
        <div className='flex flex-col items-center justify-center gap-10 '>
            <div className='bg-secondary h1-semibold text-white rounded-full w-22 h-22 flex items-center justify-center'>
                {langkahKerjaData.no}
            </div>

            <div className='flex flex-col gap-2 leading-relaxed text-center max-w-xs mx-auto'>
                <h3 className='title-bold whitespace-nowrap'>
                    {langkahKerjaData.title}
                </h3>
                <p className='body-regular text-base'>
                    {langkahKerjaData.description}
                </p>
            </div>

        </div>
    </div>
  )
}

