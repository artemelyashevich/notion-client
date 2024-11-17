import React from 'react'
import AuthForm from '../../components/auth/AuthForm'

const Auth: React.FC = () => {
  return (
    <div className='flex items-center justify-center h-[100vh]'>
      <AuthForm />
    </div>
  )
}

export default React.memo(Auth)