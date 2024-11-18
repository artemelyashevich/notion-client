import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { PAGES } from '../../constants'
import { TokenService } from '../../service/token.service'
import toast from 'react-hot-toast'
import { IUserContext, UserContext } from '../../contexts/UserContextProvider'
import Loader from '../shared/Loader'

const Header: React.FC = () => {
  const { user, isLoading } = useContext(UserContext) as IUserContext
  const navigation = useNavigate()
  const handleLogout = () => {
    TokenService.deleteToken()
    navigation(PAGES.AUTH)
    toast.success("Logged out")
  }
  return (
    <header className='flex justify-between p-10'>
      <h1>
        Hello, {isLoading ? <Loader /> : <span>{user?.email}</span>}
      </h1>
      <nav className="flex gap-10">
        <NavLink
          className={({ isActive }) => `${isActive && 'text-blue-500 '} no-underline hover:underline`}
          to={PAGES.ABOUT}
        >
          About
        </NavLink>
        <NavLink
          className={({ isActive }) => `${isActive && 'text-blue-500 '} no-underline hover:underline`}
          to={PAGES.NOTES}
        >
          Notes
        </NavLink>
        <span
          onClick={handleLogout}
          className='text-black cursor-pointer hover:underline'
        >
          Logout
        </span>
      </nav>
    </header >
  )
}

export default React.memo(Header)