import React, { useState } from 'react'
import { Label, TextInput, Avatar, Button } from 'flowbite-react';
import { HiSearch } from 'react-icons/hi';
import { HiOutlineUserGroup } from "react-icons/hi";
import Logout from '../Logout_btn';
import { ListGroup } from 'flowbite-react';
import { HiCloudDownload, HiInbox, HiOutlineAdjustments, HiUserCircle } from 'react-icons/hi';
import { Add_chat, Search_user } from '../../utils/Fetch_data';
import {ChatState} from '../../Context/ChatProvider'
import { userData} from '../../../store/reducers/UserSlice.js'
import { useSelector } from 'react-redux'
import {UserState} from "../../Context/UserProvider.jsx"
import { GroupChatState } from '../../Context/GroupChatProvider.jsx';
// import {getAllChats} from './UserChatsContainer'
const AddChatNav = () => {
  const [showDiv, setShowDiv] = useState(false);
  const {setgroupDrawerOpen,groupDrawerOpen}=GroupChatState()
  const [users, setusers] = useState([])
  const {setChats,chats,fetchAgain,setFetchAgain} = ChatState();
  // const loggedUser = useSelector((state) => state.User.userdata)
  const {loggedUser,setLoggedUser} =UserState();
  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };
  // console.log(loggedUser)
  const search_users = async (param) => {
    const response = await Search_user({ query: param })
    setusers(response.data)
  }

  const create_chat = async (id) => {
    const response = await Add_chat({ receiver_id: id })
    
    toggleDiv();
    setFetchAgain(!fetchAgain)
  }
  

  return (
    <div>
      <div className='w-full h-[5vw] flex justify-between items-center p-[1vw]'>
      <div className='flex gap-4 items-center'><Avatar  rounded size="md" />
        <h6 className='text-white'>{loggedUser.userName}</h6>
        </div>
        <div className='flex gap-4 text-3xl text-[#8E9297]' onClick={()=>setgroupDrawerOpen(!groupDrawerOpen)}>
          <Button outline gradientDuoTone="purpleToBlue" className='text-3xl'>
            <HiOutlineUserGroup className='text-xl' ></HiOutlineUserGroup>
          </Button>
          <Logout />
        </div>
      </div>

      <div className='h-[5vw] w-full border-black border-b-[1px] border-t-[1px] flex flex-col items-center p-2'>
        <TextInput autoComplete='off' id="search" className='w-full' type="text" icon={HiSearch} placeholder="Add new conversation...." required onChange={(e) => search_users(e.target.value)} onClick={toggleDiv} />
        {showDiv && (
          <ListGroup onInputCapture={(e)=>console.log(e)} className="z-[9999] w-full">
            {users.length === 0 && (
              <ListGroup.Item>
                <span className="ml-4 space-y-1 font-medium dark:text-white">No results</span>
              </ListGroup.Item>
            )}

            {users.map((user) => (
              <ListGroup.Item className='z-[99999]' key={user._id} onClick={() => create_chat(user._id)} >
                <Avatar img={user.profileImg} rounded size="sm" />
                <span className="ml-4 space-y-1 font-medium dark:text-white">{user.userName}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </div>
    </div>
  )
}

export default AddChatNav