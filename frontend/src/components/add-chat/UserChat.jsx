import { Avatar ,Chip} from "@nextui-org/react";
import { Link } from 'react-router-dom'
import { getTime } from '../../utils/msg.js'
import {getOppUserName ,getOppUser} from '../../utils/ChatLogics.js'
import {UserState} from '../../context/UserProvider.jsx'
import { ChatState} from '../../context/ChatProvider.jsx'
const UserChat = (chat) => {
  const {loggedUser} = UserState();
  var chat = chat.chat;
  // console.log(chat)
  const {notifications,setNotifications}=ChatState();
  console.log(notifications.has(chat._id))
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
                    <p className="text-small text-foreground/80">{chat.latestMessage?.content}</p>
                    <p>{notifications.has(chat._id)}</p>
                  </div>
                  
                    <small className=' text-gray-400'>{notifications.has(chat._id)?<Chip color="primary">{notifications.get(chat._id).length}</Chip>:
 getTime(chat.latestMessage?.createdAt)}</small>
                  
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
                    <p className="text-small text-foreground/80">{chat.latestMessage?.content}</p>
                  </div>
                  
                    <small className=' text-gray-400'>{notifications.has(chat._id)?<Chip color="primary">{notifications.get(chat._id).length}</Chip>:
 getTime(chat.latestMessage?.createdAt)}</small>
                  
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