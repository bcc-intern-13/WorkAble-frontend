import React from 'react'

const HeaderBeranda = () => {
  return (
    <div className='flex flex-col gap-8'>
        <div className='flex items-center justify-between'>
            <div>
                <div className='flex'>
                    <h3 className='h3-bold'>
                        Selamat Datang, 
                    </h3>
                    <p className='h3-bold'>
                        {/* Username User */}
                        Rizki 
                    </p>
                </div>
                <p className='caption-regular'>
                    Ada 24 lowongan baru yang cocok untuk profilmu hari ini.
                </p>
            </div>
            <div className='bg-white  px-4 py-2 flex items-center justify-center border-2 border-[#D9D9D9] rounded-full'>
                <p className='caption-regular'>
                    Selasa, 10 Maret 2026
                </p>
            </div>
        </div>

        <div className='flex items-center justify-between gap-8'>
            <div className='w-67 h-11 bg-white rounded-xl border border-[#D9D9D9] flex items-center justify-center'>
                <p className='text-base font-semibold'>
                    {/* Total Job */}
                    8 Total Lamaran
                </p>
            </div>
            <div className='w-67 h-11 bg-white  rounded-xl border border-[#D9D9D9] flex items-center justify-center'>
                <p className='text-base font-semibold'>
                    {/* Total Dipanggil */}
                    1 Dipanggil Interview 
                </p>
            </div>
            <div className='w-67 h-11 bg-white  rounded-xl border border-[#D9D9D9] flex items-center justify-center'>
                <p className='text-base font-semibold'>
                    {/* Total Disimpan */}
                    12 Lowongan Disimpan
                </p>
            </div>
        </div>
    </div>
  )
}

export default HeaderBeranda