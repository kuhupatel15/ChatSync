import React from 'react'
import { Avatar, Button } from "@nextui-org/react";
import { CiMenuKebab } from "react-icons/ci";
import { getOppUserName, getOppUser } from '../../utils/ChatLogics.js';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ConversationNav = () => {
  const user = useSelector(({auth}) => auth.userData)
  const selectedChat = useSelector(({selectedchat}) => selectedchat.chat)

  const { chatid } = useParams();

  return (
    <div>
      <div className='w-full h-[5vw] flex justify-between items-center p-[2vw]'>
        {selectedChat &&
          <div className='flex gap-4 items-center'>
            <Avatar
              src={selectedChat.isGroupChat ? selectedChat.grpProfileimg : getOppUser(user, selectedChat.users).profileImg}
              size="md"
            />
            <Link
              to={`/profile/${chatid}`}
              className='text-white'>
              {!selectedChat.isGroupChat ? getOppUserName(user, selectedChat.users) : selectedChat.chatName}
            </Link>
          </div>
        }

        <div className='flex gap-4 text-3xl text-[#8E9297]'>
          <Button
            isIconOnly
            className='mt-2 bg-gradient-to-br from-purple-500  to-cyan-500'
            variant="faded"
            aria-label="Take a photo">
            <CiMenuKebab className='text-xl' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConversationNav