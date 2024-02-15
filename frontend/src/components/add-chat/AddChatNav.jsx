import React, { useState } from 'react'
import { HiSearch } from 'react-icons/hi';
import { HiOutlineUserGroup } from "react-icons/hi";
import Logout from '../auth/LogoutBtn.jsx';
import { Input, Button, Avatar } from "@nextui-org/react";
import { HiCloudDownload, HiInbox, HiOutlineAdjustments, HiUserCircle } from 'react-icons/hi';
import { Add_chat, Search_user } from '../../utils/FetchData.js';
import { ChatState } from '../../context/ChatProvider.jsx'
import { userData } from '../../../store/reducers/UserSlice.js'
import { useSelector } from 'react-redux'
import { UserState } from "../../context/UserProvider.jsx"
import { GroupChatState } from '../../context/GroupChatProvider.jsx';
import { Listbox, ListboxItem } from "@nextui-org/react";


const AddChatNav = () => {
  const [showDiv, setShowDiv] = useState(false);
  const [users, setusers] = useState([]);

  const { setgroupDrawerOpen, groupDrawerOpen } = GroupChatState()
  const { setChats, chats, fetchAgain, setFetchAgain } = ChatState();
  // const { loggedUser, setLoggedUser } = UserState();
  const loggedUser = useSelector((state)=>state.User.userdata)


  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };


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
        <div className='flex gap-4 items-center'>
          <Avatar src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" size="md" />
          <h6 className='text-white'>{loggedUser?.userName}</h6>
        </div>
        <div className='flex gap-4 text-3xl text-[#8E9297]' >
          <Button isIconOnly color="default" variant="faded" onClick={() => setgroupDrawerOpen(!groupDrawerOpen)} aria-label="Take a photo">
            <HiOutlineUserGroup className='text-xl' />
          </Button>
          <Logout />
        </div>
      </div>

      <div className='h-[5vw] w-full mb-4 flex flex-col items-center p-2'>
        <Input
          autoComplete='off'
          isRequired
          className='w-full'
          type="text"
          placeholder="Add new conversation...."
          onChange={(e) => search_users(e.target.value)}
          onClick={toggleDiv}
          startContent={
            <HiSearch />
          }
        />
        {showDiv && (
          // <Listbox
          //   aria-label="Actions"
          // >
          //   {users.length === 0 && (
          //     <ListboxItem key="new">
          //       <span className="ml-4 space-y-1 font-medium dark:text-white">No results</span>
          //     </ListboxItem>
          //   )}

          //   {users.map((user) => (
          //     <ListboxItem className='z-[99999]' key={user._id} onClick={() => create_chat(user._id)} >
          //       <Avatar img={user.profileImg} rounded size="sm" />
          //       <span className="ml-4 space-y-1 font-medium dark:text-white">{user.userName}</span>
          //     </ListboxItem>
          //   ))}
          // </Listbox>
          <Listbox
        aria-label="Actions"
        onAction={(key) => alert(key)}
      >
        <ListboxItem key="new">New file</ListboxItem>
        <ListboxItem key="copy">Copy link</ListboxItem>
        <ListboxItem key="edit">Edit file</ListboxItem>
        <ListboxItem key="delete" className="text-danger" color="danger">
          Delete file
        </ListboxItem>
      </Listbox>
        )}
      </div>
    </div>
  )
}

export default AddChatNav