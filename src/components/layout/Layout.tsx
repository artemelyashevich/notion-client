import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout: React.FC = () => {

  return (
    <div>
      <Header />
      <div className="flex p-5 container">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout