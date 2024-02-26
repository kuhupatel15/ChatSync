import { Avatar, Badge } from "@nextui-org/react";
import { Card, CardBody, Button } from "@nextui-org/react";
import { Link } from 'react-router-dom'
import { getTime } from '../../utils/msg.js'
import { Divider } from "@nextui-org/react";
import {getOppUserName ,getOppUser} from '../../utils/ChatLogics.js'
import {UserState} from '../../context/UserProvider.jsx'
const UserChat = (chat) => {
  const {loggedUser} = UserState();
  var chat = chat.chat;
  // console.log(chat)

  return (
    <div className="hover:bg-zinc-800 hover:cursor-pointer px-2 py-4">
      {!chat.isGroupChat ?
        (
          <Link to={`/chat/${chat._id}`}>
            <div className="flex px-4 w-full items-center gap-6">
              <div className="relative col-span-6 md:col-span-4">
                <Avatar src={getOppUser(loggedUser,chat.users).profileImg} size="lg" />
              </div>
              <div className="w-full flex flex-col col-span-6 md:col-span-8">
                <div className="flex justify-between">
                  <div className="w-full flex flex-col gap-2">
                    <h3 className="font-semibold text-white">{getOppUserName(loggedUser,chat.users)}</h3>
                    <p className="text-small text-foreground/80">{chat.latestMessage.content}</p>
                  </div>
                  {chat.latestMessage &&
                    <small className=' text-gray-400'>{getTime(chat.latestMessage.createdAt)}</small>
                  }
                </div>
              </div>
            </div>
          </Link>
        )
        :
        (
          <Link to={`/chat/${chat._id}`}>
            <div className="flex px-4 w-full items-center gap-6">
              <div className="relative col-span-6 md:col-span-4">
                <Avatar src={chat.grpProfileimg} size="lg" />
              </div>
              <div className="w-full flex flex-col col-span-6 md:col-span-8">
                <div className="flex justify-between">
                  <div className="w-full flex flex-col gap-2">
                    <h3 className="font-semibold text-white">{chat.chatName}</h3>
                    <p className="text-small text-foreground/80">{chat.latestMessage && chat.latestMessage.content}</p>
                  </div>
                  {chat.latestMessage &&
                    <small className=' text-gray-400'>{getTime(chat.latestMessage.createdAt)}</small>
                  }
                </div>
              </div>
            </div>
          </Link>
        )
      }
    </div >

  )
}

export default UserChat