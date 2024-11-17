import React, { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PAGES } from '../../constants'
import { TokenService } from '../../service/token.service'

const AuthRequire = ({ children }: { children: React.ReactNode }) => {

    const navigate = useNavigate()
    const { pathname } = useLocation()

    useMemo(() => {
        if (!TokenService.getToken()) {
            navigate(PAGES.AUTH)
        }
    }, [pathname])

    return children
}

export default React.memo(AuthRequire)