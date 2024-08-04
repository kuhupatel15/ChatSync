import React, { useRef, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { Button, Input, Avatar } from "@nextui-org/react";
import { Create_group } from "../../routes/GroupRoutes.js"
import { CameraIcon } from '@radix-ui/react-icons'
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';

const GrpDetsDrawer = ({ grpDetsDrawerOpen, setgrpDetsDrawerOpen, members }) => {
  const [grpName, setgrpName] = useState("");
  const [fileName, setfileName] = useState('')
  const [selectedFile, setselectedFile] = useState()
  const [isuploading, setisuploading] = useState(false)

  const inputRef = useRef(null);

  const createGroup = async (e) => {
    setisuploading(true)
    e.preventDefault();
    if (grpName.length > 0 && members.length > 0) {
      await Create_group({ users: members, grpname: grpName, file: e.target.file.files[0] });
      setgrpName('');
      setgrpDetsDrawerOpen(false);
    }
    setisuploading(false)
  };

  const preview = selectedFile ? URL.createObjectURL(selectedFile) : null;

  return (
    <div className='bg-pri' style={{ position: "absolute", height: "100%", transform: `translateX(${grpDetsDrawerOpen ? "0%" : "-100%"})`, width: "100%", transition: "ease-in-out 0.5s", top: "0%", zIndex: "99999999" }} >
      <div className='bg-sec h-[15%] flex justify-between items-center px-6'>
        <span className='text-white font-bold text-2xl tracking-wider'>Create Group</span>
        <MdKeyboardDoubleArrowLeft className='hover:cursor-pointer text-white text-xl' onClick={() => setgrpDetsDrawerOpen(false)} />
      </div>

      <form onSubmit={createGroup}>
        <div className="w-full flex flex-col py-6 px-10 items-center">
          <div className='flex flex-col items-center w-full'>
            <div className="relative h-[30vh] w-[30vh]">
              <Avatar src={preview ? preview : "https://www.tenniscall.com/images/chat.jpg"} className="w-full h-full absolute top-0 left-0 opacity-70" />
              <div
                className="w-full h-full flex flex-col items-center justify-center absolute top-0 left-0 rounded-full opacity-0 bg-black hover:opacity-50 hover: hover:cursor-pointer"
                onClick={() => inputRef.current.click()}
              >
                <input
                  type="file"
                  name='file'
                  ref={inputRef}
                  onChange={(e) => {
                    const fileName = e.target.files[0].name;
                    setselectedFile(e.target.files[0])
                    setfileName(fileName);
                  }}
                  className='hidden'
                />
                <CameraIcon />
                <span className='text-sm mt-2'>CHANGE</span>
                <span className='text-sm'>PROFILE PHOTO</span>
              </div>
            </div>
            <span className='text-sm text-gray-400 my-4'>{fileName}</span>
          </div>

          <div className='w-full'>
            <Input
              size='md'
              onChange={(e) => setgrpName(e.target.value)}
              placeholder='Enter the group name'
              label="Group name"
              className='mb-2'
            />
            <span className='text-sm text-gray-400'>This will be your group name, which will be visible to the other users.</span>
          </div>

          {grpName.length > 0 ? (
            <Button
              startContent={<ClipLoader
                loading={isuploading}
                color='white'
                size={20}
              />}
              className='mt-6' size='lg' color="primary" type='submit'>Create</Button>
          ) : (
            <Button isDisabled className='mt-6' size='lg' color="primary" type='submit'>Create</Button>
          )}
        </div>
      </form>
    </div>
  )
}

export default GrpDetsDrawer




