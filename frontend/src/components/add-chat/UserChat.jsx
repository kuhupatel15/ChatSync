import { Avatar, Chip } from "@nextui-org/react";
import { Link } from 'react-router-dom'
import { getTime, compareTime, getMsgTime } from '../../utils/msg.js'
import { getOppUserName, getOppUser } from '../../utils/ChatLogics.js'
import { useSelector } from "react-redux";

const UserChat = (chat) => {
  const user = useSelector(({auth}) => auth.userData);
  const notifications = useSelector((state)=> state.notifications.notifications)


  var chat = chat.chat;

  return (
    <div className="hover:bg-zinc-800 hover:cursor-pointer px-2 py-4">
      {!chat.isGroupChat ?
        (
          <Link to={`/chat/${chat._id}`}>
            <div className="flex px-4 w-full items-center gap-6">
              <div className="relative col-span-6 md:col-span-4">
                <Avatar src={getOppUser(user, chat.users).profileImg} size="lg" />
              </div>

              <div className="w-full flex flex-col col-span-6 md:col-span-8">
                <div className="flex justify-between">
                  <div className="w-full flex flex-col gap-2">
                    <h3 className="font-semibold text-white">{getOppUserName(user, chat.users)}</h3>
                    <p className="text-small text-foreground/80">{chat.latestMessage?.content.length > 50 ? chat.latestMessage?.content.substr(0, 50) + "..." : chat.latestMessage?.content}</p>
                  </div>

                  <small className=' text-gray-400'>
                    {/* {
                      notifications?.has(chat._id) ?
                        <Chip color="primary">{notifications?.get(chat._id)?.length}</Chip>
                        :
                        chat.latestMessage?.createdAt && getMsgTime(chat.latestMessage?.createdAt)
                    } */}
                  </small>
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
                    <p className="text-small text-foreground/80">{chat.latestMessage?.content.length > 50 ? chat.latestMessage?.content.substr(0, 50) + "..." : chat.latestMessage?.content}</p>
                  </div>

                  <small className=' text-gray-400'>
                    {/* {
                      notifications.has(chat._id) ?
                        <Chip color="primary">{notifications.get(chat._id).length}</Chip>
                        :
                        chat.latestMessage?.createdAt && getTime(chat.latestMessage?.createdAt)
                    } */}
                  </small>
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