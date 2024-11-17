import React, { useContext } from 'react'
import { IUserContext, UserContext } from '../../contexts/UserContextProvider'
import { Link } from 'react-router-dom'
import { PAGES } from '../../constants'
import UserCard from '../../components/user/UserCard'

const About: React.FC = () => {
  const { user, isLoading } = useContext(UserContext) as IUserContext
  return (
    <div className='flex flex-col align-center text-center w-full justify-center'>
      <h1 className='mb-10 font-bold text-[40px]'>About me</h1>
      <UserCard user={user} isLoading={isLoading} />
      <Link className='my-[10rem] p-3 text-xl mx-auto bg-gray-300 w-1/4' to={PAGES.NOTES}>Go to notes</Link>
    </div >
  )
}

export default React.memo(About)