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
import toast from 'react-hot-toast';
import ProfilePage from '../drawers/ProfilePage.jsx';

const AddChatNav = () => {
  const [showDiv, setShowDiv] = useState(false);
  const [users, setusers] = useState([]);

  const { setgroupDrawerOpen, groupDrawerOpen } = GroupChatState()
  const { setChats, chats, fetchAgain, setFetchAgain } = ChatState();
  const { loggedUser, setLoggedUser } = UserState();

  const [isProfileOpen, setIsProfileOpen] = useState(true);


  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };

  console.log("LOGGED USER ---> ", loggedUser)

  const search_users = async (param) => {
    const response = await Search_user({ name: param })
    setusers(response.data)
  }

  const create_chat = async (id) => {
    const response = await Add_chat({ receiver_id: id })
    toggleDiv();
    setFetchAgain(!fetchAgain)
  }

  // console.log(isProfileOpen)

  return (
    <div>
      <div className='w-full h-[5vw] flex justify-between items-center p-[1vw]  border-b-[1px] border-black'>
        <Button
          variant='light'
          startContent={<Avatar src={loggedUser?.profileImg} size="md" />}
          onClick={()=>setIsProfileOpen(!isProfileOpen)}
        >
          <span className='text-white'>{loggedUser?.userName}</span>
        </Button>
        <div className='flex gap-4 text-3xl text-[#8E9297]' >
          <Button isIconOnly className='mt-2 bg-gradient-to-br from-purple-500  to-cyan-500' variant="faded" onClick={() => setgroupDrawerOpen(!groupDrawerOpen)} aria-label="Take a photo">
            <HiOutlineUserGroup className='text-xl' />
          </Button>
          <Logout />
        </div>
      </div>

      <div className='h-[5vw] flex flex-col gap-10 w-full items-center p-2 border-b-[1px] border-white'>
        <Input
          autoComplete='off'
          size="sm"
          isRequired
          className='w-full h-[2vh]'
          type="text"
          placeholder="Add new conversation...."
          // onChange={(e) => search_users(e.target.value)}
          onClick={(e) => {
            toggleDiv();
            search_users('')
          }}
          onInput={(e) => search_users(e.target.value)}
          startContent={
            <HiSearch />
          }
        />
        {showDiv && (
          <div className="bg-white w-full z-[9999] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
            <Listbox >

              {users.map((item) => (
                <ListboxItem key={item._id} textValue={item.userName} onClick={() => create_chat(item._id)}>
                  <div className="flex gap-2 items-center">
                    <Avatar alt={item.userName} className="flex-shrink-0" size="sm" src={item.profileimg} />
                    <div className="flex flex-col">
                      <span className="text-small">{item.userName}</span>
                      <span className="text-tiny text-default-400">{item.userEmail}</span>
                    </div>
                  </div>
                </ListboxItem>
              ))}

              {users.length === 0 && (
                <ListboxItem key="new">
                  <span>No results</span>
                </ListboxItem>
              )}

            </Listbox>
          </div>
        )}

      </div>

      <ProfilePage isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} user={loggedUser} />
    </div>
  )
}

export default AddChatNav