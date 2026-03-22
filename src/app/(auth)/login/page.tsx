import LoginContainer from '@/feature/_user/login/container/LoginContainer'
import NavLogin from '@/shared/components/NavLogin'
import React from 'react'

const page = () => {
  return (
    <>
    <NavLogin/>
    <LoginContainer/>
    </>
    
  )
}

export default page