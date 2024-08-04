import React, { useRef, useState } from 'react'
import { Button, Avatar } from "@nextui-org/react";
import { MdDone } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { CameraIcon } from '@radix-ui/react-icons'
import { useDispatch } from 'react-redux';
import { login } from '../../../store/reducers/UserSlice.js';
import { Rename_user, Upload_profileimg } from '../../routes/UserRoutes.js';

const ProfilePage = ({ isProfileOpen, setIsProfileOpen, user }) => {
  const inputRef = useRef(null);

  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false)
  const [username, setUsername] = useState("")

  const rename = async (userid, editName) => {
    let response = await Rename_user({ userId: userid, newusername: editName })
    dispatch(login(response.data.updatedChat))
    setEdit(!edit)
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      let response = await Upload_profileimg({ file: e.target.files[0] });
      dispatch(login(response.data.user))
    }
  };

  return (
    <div className='bg-pri' style={{ position: "absolute", height: "100%", transform: `translateX(${isProfileOpen ? "0%" : "-100%"})`, width: "100%", transition: "ease-in-out 0.5s", top: "0%", zIndex: "99999999" }} >
      <div className='bg-sec h-[15%] flex justify-between items-center px-6'>
        <span className='text-white font-bold text-2xl tracking-wider'>Profile</span>
        <MdKeyboardDoubleArrowLeft className='hover:cursor-pointer text-white text-xl' onClick={() => setIsProfileOpen(false)} />
      </div>

      <div className="w-full flex flex-col justify-center text-white text-[1.5vw] bg-pri items-center py-6 px-10 ">
        <div className="relative h-[30vh] w-[30vh]">
          <Avatar src={user?.profileImg} className="w-full h-full absolute top-0 left-0 opacity-70" />
          <div
            className="w-full h-full flex flex-col items-center justify-center absolute top-0 left-0 rounded-full opacity-0 bg-black hover:opacity-50 hover: hover:cursor-pointer"
            onClick={() => inputRef.current.click()}
          >
            <input type="file" name='file' onChange={handleUpload} ref={inputRef} className='hidden' />
            <CameraIcon />
            <span className='text-sm mt-2'>CHANGE</span>
            <span className='text-sm'>PROFILE PHOTO</span>
          </div>
        </div>

        <div className='flex flex-col gap-2 mt-12'>
          <span className='text-md font-light text-gray-400'>Your username</span>

          <div className='flex items-center gap-6 mb-2'>
            <h6
              inputMode='text'
              onInput={(e) => setUsername(e.currentTarget.textContent)}
              contentEditable={edit}
              className={edit ? 'grpname tracking-wider' : "text-lg tracking-wider duration-100 ease-in-out"}
            >
              {user?.userName}
            </h6>
            <div className='flex gap-6 items-center text-blue-500'>
              {edit ?
                <>
                  <MdOutlineDone
                    className={`${username?.length === 0 ? 'pointer-events-none opacity-20' : 'cursor-pointer'}`}
                    onClick={() => rename(user._id, username)}
                  />
                  <RxCross1 className='cursor-pointer ' onClick={() => setEdit(false)} />
                </>
                :
                <MdEdit className='cursor-pointer' onClick={() => setEdit(true)} />
              }
            </div>
          </div>

          <div>
            <span className='text-sm text-gray-400'>This is your username, which will be visible to the other users.</span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProfilePage




