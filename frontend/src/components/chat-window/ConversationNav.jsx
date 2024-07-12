import React, { useEffect, useState } from 'react'
import { Avatar, Button, Divider } from "@nextui-org/react";
import { CiMenuKebab } from "react-icons/ci";
import { ChatState } from '../../context/ChatProvider.jsx';
import { getOppUserName, getOppUser } from '../../utils/ChatLogics.js';
import { UserState } from '../../context/UserProvider.jsx'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const ConversationNav = () => {
  const { chatid } = useParams();
  const { loggedUser } = UserState();
  const { selectedChat, setmessages, messages, setFetchAgain, socketConnected, setSocketConnected, fetchAgain, passsocket } = ChatState();
  const [oppchat, setoppchat] = useState();

  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);


  useEffect(() => {
    passsocket.on("typing", (data) => {
      setoppchat(data)
      // console.log("Received typinginroom event:", data);
      // if (data === selectedChat._id) {
      //   console.log("chat typing is ",data, " -- ","selectedchat is" ,selectedChat._id)
      setIsTyping(true);
      // }
    });

    passsocket.on("stop typing", (data) => {
      // console.log("Received stop typing event:", data);
      // if (data === selectedChat._id) {
      setIsTyping(false);
      //   // console.log(data, " --", selectedChat._id)
      // }
    });
  }, []);


  // console.log(selectedChat)

  return (
    <div>
      <div className='w-full h-[5vw] flex justify-between items-center p-[2vw]'>
        {selectedChat &&
          <div className='flex gap-4 items-center'>
            <Avatar src={selectedChat.isGroupChat ? selectedChat.grpProfileimg : getOppUser(loggedUser, selectedChat.users).profileImg} size="sm" />
            <div className='flex flex-col'>
              <Link to={`/profile/${chatid}`} className='text-white'>{!selectedChat.isGroupChat ? getOppUserName(loggedUser, selectedChat.users) : selectedChat.chatName}
              </Link>
              <div>
                {console.log(
                oppchat , selectedChat._id
                )}

                {oppchat === selectedChat._id ?
                  (
                    istyping ? (
                      <div>
                        <span className='text-white text-sm'>is typing .... </span>
                      </div>
                    ) : (
                      <></>
                    )
                  )
                  :
                  (
                    <></>
                  )}
              </div>
            </div>
          </div>

        }

        <div className='flex gap-4 text-3xl text-[#8E9297]'>
          <Button isIconOnly className='mt-2 bg-gradient-to-br from-purple-500  to-cyan-500' variant="faded" aria-label="Take a photo">
            <CiMenuKebab className='text-xl' />
          </Button>
        </div>
      </div>

    </div>
  )
}

export default ConversationNav