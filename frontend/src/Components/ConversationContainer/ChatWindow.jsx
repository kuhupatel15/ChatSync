import React, { useEffect } from 'react'
import { HiOutlinePaperClip } from "react-icons/hi2";
import { Label, TextInput } from 'flowbite-react'
import { IoIosSend } from "react-icons/io";
import { Avatar, Button } from 'flowbite-react';
import { HiEllipsisVertical } from "react-icons/hi2";
import ConversationNav from '../ConversationContainer/ConversationNav'
import ConversationBox from '../ConversationContainer/ConversationBox';
import BottomNav from '../ConversationContainer/BottomNav'

const ChatWindow = () => {

    return (
        <div className='w-[60vw] bg-[#36393F] flex flex-col h-screen'>
            <ConversationNav />
            <ConversationBox />
            <BottomNav />
        </div>
    )
}

export default ChatWindow;