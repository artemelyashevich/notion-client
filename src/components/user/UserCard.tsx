import React from 'react'
import { IUser } from '../../types'
import { formatDate } from '../../utils/date.utils'

interface IProps {
    user: IUser | undefined,
    isLoading: boolean
}

const UserCard = ({ user, isLoading }: IProps) => {
    return (
        <div>
            {
                isLoading
                    ? <p>Loading...</p>
                    : <div>
                        <p className='text-xl text-gray-400'>Email: <span className='text-black'>{user?.email}</span></p>
                        <p className='text-xl text-gray-400'>Date sign up: <span className='text-black'>{formatDate(user?.createdAt)}</span></p>
                    </div>
            }
        </div>
    )
}

export default React.memo(UserCard)