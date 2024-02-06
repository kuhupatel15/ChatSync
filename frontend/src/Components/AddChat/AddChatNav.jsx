import React, { useState } from 'react'
import { Label, TextInput, Avatar, Button } from 'flowbite-react';
import { HiSearch } from 'react-icons/hi';
import { HiOutlineUserGroup } from "react-icons/hi";
import Logout from '../Logout_btn';
import { ListGroup } from 'flowbite-react';
import { HiCloudDownload, HiInbox, HiOutlineAdjustments, HiUserCircle } from 'react-icons/hi';
import { Add_chat, Search_user } from '../../utils/Fetch_data';


const AddChatNav = () => {
  const [showDiv, setShowDiv] = useState(false);
  const [users, setusers] = useState([])

  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };

  const search_users = async (param) => {
    console.log(param)
    const response = await Search_user({ query: param })
    setusers(response.data)
  }

  const create_chat = async (id) => {
    alert();
    const response = await Add_chat({ receiver_id: id })
    console.log(response.data)
  }

  return (
    <div>
      <div className='w-full h-[5vw] flex justify-between items-center p-[1vw]'>
        <Avatar rounded size="md" />
        <div className='flex gap-4 text-3xl text-[#8E9297]'>
          <Button outline gradientDuoTone="purpleToBlue" className='text-3xl'>
            <HiOutlineUserGroup className='text-xl'></HiOutlineUserGroup>
          </Button>
          <Logout />
        </div>
      </div>

      <div className='h-[5vw] w-full border-black border-b-[1px] border-t-[1px] flex flex-col items-center p-2'>
        <TextInput autoComplete='off' id="search" className='w-full' type="text" icon={HiSearch} placeholder="Add new conversation...." required onChange={(e) => search_users(e.target.value)} onClick={toggleDiv} onBlur={toggleDiv} />
        {showDiv && (
          <ListGroup className="z-[9999] w-full">
            {users.length === 0 && (
              <ListGroup.Item>
                <span className="ml-4 space-y-1 font-medium dark:text-white">No results</span>
              </ListGroup.Item>
            )}

            {users.map((user) => (
              <ListGroup.Item className='z-[99999]' key={user._id} onClick={()=>create_chat(user.id)}>
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