import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, Avatar, Divider, CheckboxGroup, Checkbox, Link, User, Chip, cn } from "@nextui-org/react";
import {Upload_profileimg } from "../../utils/FetchData.js"
import { useNavigate } from 'react-router-dom';
import { MdOutlinePersonAdd, MdDone} from "react-icons/md";

import { RxCross1 } from "react-icons/rx";
import { MdOutlineModeEdit } from "react-icons/md";
import { CameraIcon } from '@radix-ui/react-icons'
import { UserState } from '../../context/UserProvider.jsx';
import { Rename_user } from '../../utils/FetchData.js';
import { ChatState } from '../../context/ChatProvider.jsx';
const ProfilePage = ({ isProfileOpen, setIsProfileOpen, user }) => {

  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { setLoggedUser } = UserState();
  const [edit, setEdit] = useState(false)
  const [username, setUsername] = useState("")
const {fetchAgain,setFetchAgain}=ChatState();
  const rename = async (userid, editName) => {
    let response = await Rename_user({ userId: userid, newusername: editName })
    console.log(response.data.updatedChat)
    setLoggedUser(response.data.updatedChat)
    setEdit(!edit)
  }
// console.log(loggeduser)
  const handleUpload = async (e) => {
    e.preventDefault();
    // console.log(e.target.files[0])
    if (e.target.files[0]) {
      // console.log(e.target.files[0])
      let response = await Upload_profileimg({ file: e.target.files[0] });
      setLoggedUser(response.data.user)
    }
  };

  return (
    <div className='bg-white' style={{ position: "absolute", height: "100vh", transform: `translateX(${!isProfileOpen ? "0%" : "-100%"})`, width: "100%", transition: "ease-in-out 0.5s", top: "0%", zIndex: "99999999" }}>
      <div className='h-[15vh] bg-[#36393F] text-white flex justify-between  items-center px-4 text-xl'>
        <span>Profile</span>
        <RxCross1 className='hover:cursor-pointer' onClick={() => setIsProfileOpen(!isProfileOpen)} />
      </div>

      <div className='h-[120vh]'>
        <div className="w-full flex flex-col justify-center text-white text-[1.5vw] bg-[#2F3136] items-center py-6 px-10 ">
          <div className=" w-[15vw] h-[15vw] relative">
            <Avatar src={user?.profileImg} className="w-full h-full absolute top-0 left-0 opacity-70" />
            <div className="w-full h-full flex flex-col items-center justify-center absolute top-0 left-0 rounded-full opacity-0 bg-black hover:opacity-50 hover: hover:cursor-pointer" onClick={() => inputRef.current.click()}>
              <input type="file" name='file' onChange={handleUpload} ref={inputRef} className='hidden' />
              <CameraIcon />
              <span className='text-sm mt-2'>CHANGE</span>
              <span className='text-sm'>PROFILE PHOTO</span>
            </div>
          </div>
          <div className='flex items-center h-[7vh] justify-center gap-4 mt-4'><h6 inputMode='text' onInput={(e) => setUsername(e.currentTarget.textContent)} contentEditable={edit} className={edit ? 'grpname' : "min-w-[8vw] duration-100 ease-in-out"}>{user?.userName}</h6>
                {edit && <Button isIconOnly onClick={() => rename(user._id, username)} className='mt-2 bg-gradient-to-br from-purple-500  to-cyan-500' variant="faded" aria-label="Take a photo">
                  <MdDone></MdDone>
                </Button> }
                <MdOutlineModeEdit onClick={() => setEdit(!edit)}></MdOutlineModeEdit>
              </div>
          {/* <div className='flex items-center justify-center gap-4 mt-4'><span>{user.userName}</span><MdOutlineModeEdit></MdOutlineModeEdit></div> */}
        </div>

      </div>
    </div>
  )
}

export default ProfilePage



