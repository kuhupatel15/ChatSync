import React, { useEffect, useRef, useState } from 'react';
import { Divider, Avatar, Chip, Button } from '@nextui-org/react';
import { ChatState } from '../../context/ChatProvider.jsx';
import { RxCross1 } from "react-icons/rx";
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineModeEdit } from "react-icons/md";
import { getAdmin } from "../../utils/ChatLogics.js"
import { MdOutlinePersonAdd } from "react-icons/md";
import { Get_all_users, Upload_profileimg_of_group } from "../../utils/FetchData.js"
import { CameraIcon } from '@radix-ui/react-icons'

const GrpProfilePage = () => {
  const { selectedChat } = ChatState();
  const { chatid } = useParams();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
  }, []);

  const getAllusers = async () => {
    let response = await Get_all_users();
    console.log(response.data)
    let filteredUsers = response.data.filter(idAdded)
    setUsers(filteredUsers)
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    // console.log(e.target.files[0])
    if (e.target.files[0]) {
      let response = await Upload_profileimg_of_group({ chatId: selectedChat._id, file: e.target.files[0] });
      // console.log(response)
      window.location.reload();
    }
  };

  return (
    <div>
      {selectedChat && selectedChat.isGroupChat ?
        (
          <div className='h-[120vh]'>
            <div className="w-full h-[5vw] flex gap-6 justify-start items-center text-white p-[2vw] border-b-[1px] border-black">
              <RxCross1 onClick={() => navigate(`/chat/${selectedChat._id}`)} className='hover:cursor-pointer' />
              <span className="text-xl">Group info</span>
            </div>

            <div className="w-full flex flex-col justify-center text-white text-[1.5vw] bg-[#2F3136] items-center py-2 px-10 ">
              <div className=" w-[12vw] h-[12vw] relative">
                <Avatar src={selectedChat.grpProfileimg} className="w-full h-full absolute top-0 left-0 opacity-70" />
                <div className="w-full h-full flex flex-col items-center justify-center absolute top-0 left-0 rounded-full opacity-0 bg-black hover:opacity-50 hover: hover:cursor-pointer" onClick={() => inputRef.current.click()}>
                  <input type="file" name='file' onChange={handleUpload} ref={inputRef} className='hidden' />
                  <CameraIcon />
                  <span className='text-sm mt-2'>CHANGE</span>
                  <span className='text-sm'>PROFILE PHOTO</span>
                </div>
              </div>
              <div className='flex items-center justify-center gap-4 mt-4'><span>{selectedChat.chatName}</span><MdOutlineModeEdit></MdOutlineModeEdit></div>
            </div>

            <div className="w-full mt-2 flex flex-col  p-10 ">
              <div className='flex justify-between w-full text-xl text-white'><span>Group members</span><span>{selectedChat.users.length} members</span></div>
              <Button onClick={getAllusers} className='flex items-center mt-4 gap-6 w-full text-white bg-gradient-to-br from-purple-500  to-cyan-500'><MdOutlinePersonAdd className='text-2xl  '></MdOutlinePersonAdd><span>Add Members</span></Button>

              <div className="flex flex-col gap-4 mt-6">
                {selectedChat.users.map((item) => (
                  <div key={item._id} className="flex gap-2 items-center">
                    <Avatar alt={item.userName} className="flex-shrink-0" size="md" src={item.profileimg} />
                    <div className="flex flex-col text-[1.2vw]">
                      <span className=" text-white">{item.userName}</span>
                      <span className="text-small text-gray-500">{item.userEmail}</span>
                    </div>
                    {getAdmin(selectedChat.groupAdmin, item._id) ? <Chip className='bg-gradient-to-br from-purple-500  to-cyan-500'>Admin</Chip> : <></>}

                  </div>
                ))}
              </div>
              {/* <div className='h-[50vh] w-[30vw] bg-white'> */}
              {/* <span>{users}</span> */}
              {/* </div> */}
            </div>
          </div>
        ) : (
          <div className='h-[120vh]'>
            <div className="w-full h-[5vw] flex gap-6 justify-start items-center text-white p-[2vw] border-b-[1px] border-black">
              <RxCross1 onClick={() => navigate(`/chat/${selectedChat._id}`)} className='hover:cursor-pointer' />
              <span className="text-xl">Profile</span>
            </div>

            <div className="w-full flex flex-col justify-center text-white text-[1.5vw] bg-[#2F3136] items-center py-2 px-10 ">
              <div className=" w-[12vw] h-[12vw] relative">
                <Avatar src={selectedChat.users[1].profileImg} className="w-full h-full absolute top-0 left-0 opacity-70" />
              </div>
              <div className='flex items-center justify-center gap-4 mt-4'>
                <span>{selectedChat.users[1].userName}</span>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default GrpProfilePage;
