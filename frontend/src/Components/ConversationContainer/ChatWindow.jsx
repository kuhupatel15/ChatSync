import React, { useEffect } from 'react'
import { HiOutlinePaperClip } from "react-icons/hi2";
import { Label, TextInput } from 'flowbite-react'
import { IoIosSend } from "react-icons/io";
import { Avatar, Button } from 'flowbite-react';
import { HiEllipsisVertical } from "react-icons/hi2";

const ChatWindow = () => {

    return (
        <div className='w-[60vw] bg-[#36393F] flex flex-col h-screen'>

            {/* Chat header */}
            <div className='w-full h-[5vw] flex border-b-[1px] border-black justify-between items-center p-[2vw]'>
                <div className='flex gap-4 items-center'>
                    <Avatar rounded size="md" />
                    <h6 className='text-white'>Kuhu</h6>
                </div>
                <div className='flex gap-4 text-3xl text-[#8E9297]'>
                    <Button outline gradientDuoTone="purpleToBlue" className='text-3xl'>
                        <HiEllipsisVertical className='text-[1.5vw]'></HiEllipsisVertical>
                    </Button>
                </div>
            </div>

            {/* Chat body */}
            <div className='h-[41vw] p-2 overflow-scroll scrollbar-hide'>
                <div className='max-w-[40vw] bg-[#303339] rounded text-white message flex flex-col p-2 mb-2'>
                    <h6 >dkjhjgfbjhvdkjhjgfbjhvdkjhjgfbjhvdkjhjgfbjhvdkjhjgfbjhvdkjhjgfbjhvdkjhjgfbjhvdkjhjgfbjhvdkjhjgfbjhv</h6>
                    <small className='self-end text-gray-400'>1234</small>
                </div>
            </div>

            {/* Message Input */}
            <div className='flex items-center gap-2 p-2'>
                <HiOutlinePaperClip className='text-2xl ' />
                <TextInput id="message" className='w-full' type="text" placeholder="Type a new message...." required />
                <IoIosSend className='text-2xl'></IoIosSend>
            </div>

        </div>
    )
}

export default ChatWindow;