import React, { useEffect, useRef, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { GroupChatState } from '../../context/GroupChatProvider.jsx';
import { Button, Input, Avatar, Divider, CheckboxGroup, Checkbox, Link, User, Chip, cn } from "@nextui-org/react";
import { Get_all_users, Create_group, Upload_profileimg_of_group } from "../../utils/FetchData.js"
import UserChat from '../add-chat/UserChat.jsx';
import { ChatState } from '../../context/ChatProvider.jsx';
import { CameraIcon } from '@radix-ui/react-icons'


const GrpDetsDrawer = ({ members }) => {
  const { groupDrawerOpen, setgroupDrawerOpen, grpDetsDrawerOpen, setgrpDetsDrawerOpen } = GroupChatState();
  const { fetchAgain, setFetchAgain } = ChatState();
  const [grpName, setgrpName] = useState("");
  const [fileName, setfileName] = useState('')

  const inputRef = useRef(null);

  // const handleUpload = async (e) => {
  //   e.preventDefault();
  //   if (e.target.files[0]) {
  //     let response = await Upload_profileimg_of_group({ chatId: selectedChat._id, file: e.target.files[0] });
  //     window.location.reload();
  //   }
  // };

  const createGroup = async (e) => {
    e.preventDefault();
    // console.log(e.target.file.files[0])
    if (grpName.length > 0 && members.length > 0) {
      const response = await Create_group({ users: members, grpname: grpName, file: e.target.file.files[0] });
      console.log(response.data);
      setgrpName('');
      setgroupDrawerOpen(!groupDrawerOpen);
      setgrpDetsDrawerOpen(!grpDetsDrawerOpen);
      setFetchAgain(!fetchAgain)
    }
  };


  return (
    <div className='bg-white' style={{ position: "absolute", height: "100vh", transform: `translateX(${!grpDetsDrawerOpen ? "0%" : "-100%"})`, width: "100%", transition: "ease-in-out 0.5s", top: "0%", zIndex: "99999999" }}>
      <div className='flex flex-col h-screen'>
        <div className='bg-gray-300 p-4 flex justify-between items-center'>
          <span className='text-lg'>Create Group</span>
          <RxCross1 className='hover:cursor-pointer' onClick={() => setgrpDetsDrawerOpen(!grpDetsDrawerOpen)} />
        </div>

        <div className='h-full p-2'>
          <form onSubmit={createGroup} className='h-full flex flex-col gap-6 items-center py-6'>
            <div className=" w-[12vw] h-[12vw] relative">
              <Avatar
                className="w-full h-full absolute top-0 left-0 opacity-70"
                src='https://www.tenniscall.com/images/chat.jpg'
              />
              <div className="w-full h-full flex flex-col items-center justify-center absolute top-0 left-0 rounded-full opacity-0 bg-black hover:opacity-80 hover: hover:cursor-pointer"
                onClick={() => inputRef.current.click()}
              >
                <input type="file" name='file' ref={inputRef}
                  onChange={(e) => {
                    const fileName = e.target.files[0].name;
                    setfileName(fileName);
                  }}
                  className='hidden' />
                <CameraIcon />
                <span className='text-sm text-white mt-2'>CHANGE</span>
                <span className='text-sm text-white'>PROFILE PHOTO</span>
              </div>
            </div>
              <span className='text-sm text-black'>{fileName}</span>
            <Input
              size='md'
              onChange={(e) => setgrpName(e.target.value)}
              placeholder='Enter the group name'
              label="Group name"
            />
            <Button color="primary" type='submit'>Create</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default GrpDetsDrawer




