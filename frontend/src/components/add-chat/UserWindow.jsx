import React from 'react'
import AddChatNav from './AddChatNav'
import UserChatsContainer from './UserChatsContainer'
import { User } from '@nextui-org/react'

const UserWindow = () => {
  return (
    <div>
        <AddChatNav />
        <UserChatsContainer />
    </div>
  )
}

export default UserWindow