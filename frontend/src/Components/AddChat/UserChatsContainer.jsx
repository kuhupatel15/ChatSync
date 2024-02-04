import React, { useEffect, useState } from 'react'
import UserChat from './UserChat'
import { Get_all_users } from '../../utils/Fetch_data'


const UserChatsContainer = () => {

  const [users, setusers] = useState([])

  const getallusers = async () => {
    const response = await Get_all_users();
    setusers(response.data)
  }

  useEffect(()=>{
    getallusers();
  }, [])


  return (
    <div className='max-h-[40vw] overflow-scroll scrollbar-hide' >
        {users.map((user)=>(
          <div >
            <UserChat name={user.userName} />
          </div>
        ))}
    </div>
  )
}

export default UserChatsContainer