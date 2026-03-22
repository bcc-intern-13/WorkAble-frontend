import BerandaContainer from '@/feature/_user/beranda/container/BerandaContainer'
import NavLogin from '@/shared/components/NavLogin'
import React from 'react'

const page = () => {
  return (
    <main className='bg-bl-01 min-h-screen'>
        <NavLogin/>
        <section>
            <BerandaContainer/>
        </section>
    </main>
  )
}

export default page