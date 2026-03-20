import React from 'react'

const MengapaCard = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 cursor-default '>
        <div className='h-full  flex flex-col items-center justify-center bg-white rounded-[25px] p-5 border border-[#D9D9D9] text-center transition-all duration-300 shadow-md shadow-[#006ADB66] hover:shadow-lg hover:scale-105'>
            <h3 className='title-bold mb-2'>Career Mapping Pintar</h3>
            <p className='body-regular text-[#757575] text-base leading-relaxed text-center max-w-xs mx-auto'>20 pertanyaan singkat menghasilkan peta karier personal berdasarkan kekuatan, minat, dan cara kerjamu.</p>
        </div>

        <div className='h-full  flex flex-col items-center justify-center bg-white rounded-[25px] p-5 border border-[#D9D9D9] text-center transition-all duration-300 shadow-md shadow-[#006ADB66] hover:shadow-lg hover:scale-105'>
            <h3 className='title-bold mb-2'>Filter Aksesibilitas</h3>
            <p className='body-regular text-[#757575] text-base leading-relaxed text-center max-w-xs mx-auto'>Temukan lowongan dari perusahaan yang sudah siap secara fisik, digital, dan budaya untuk menyambut kamu.</p>
        </div>

        <div className='h-full  flex flex-col items-center justify-center bg-white rounded-[25px] p-5 border border-[#D9D9D9] text-center transition-all duration-300 shadow-md shadow-[#006ADB66] hover:shadow-lg hover:scale-105'>
            <h3 className='title-bold mb-2'>Filter Sesuai Kebutuhanmu</h3>
            <p className='body-regular text-[#757575] text-base leading-relaxed text-center max-w-xs mx-auto'>Cek ATS Score CV-mu dan perbaiki sebelum dikirim. Tingkatkan peluang dipanggil 3x lebih besar.</p>
        </div>

    </div>
  )
}

export default MengapaCard