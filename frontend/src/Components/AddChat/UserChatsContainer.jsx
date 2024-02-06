import  { useEffect, useState } from 'react'
import UserChat from './UserChat'
import { Fetch_chat } from '../../utils/Fetch_data'


const UserChatsContainer = () => {

  const [users, setusers] = useState([])
  
  const getallusers = async () => {
    const response = await Fetch_chat();
    setusers(response.data.chat)
  }
  
  useEffect(()=>{
    getallusers();
  }, [])
  
  return (
    <div className='max-h-[40vw] overflow-scroll scrollbar-hide' >
        {/* {users && users.map((user)=>(
          <div key={user.users[1]._id}>
            <UserChat name={user.users[1].userName} 
            chatid={user.users[1]._id}
            />
          </div>
        ))} */}
    </div>
  )
}

export default UserChatsContainer