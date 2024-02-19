import React, { useEffect, useState } from 'react';
import { Divider, Avatar,Chip ,Button} from '@nextui-org/react';
import { ChatState } from '../../context/ChatProvider.jsx';
import { RxCross1 } from "react-icons/rx";
import { useParams } from 'react-router-dom';
import { MdOutlineModeEdit } from "react-icons/md";
import {getAdmin} from "../../utils/ChatLogics.js"
import { MdOutlinePersonAdd } from "react-icons/md";
import {Get_all_users} from "../../utils/FetchData.js"
const GrpProfilePage = () => {
  const { selectedChat } = ChatState();
  const { chatid } = useParams();
  const [users,setUsers]=useState([]);
  useEffect(() => {
  }, []);
  const idAdded=(user) => {return !selectedChat.users.includes(user)}
  const getAllusers = async ()=>{
    let response = await Get_all_users();
    console.log(response.data)
    let filteredUsers = response.data.filter(idAdded)
    setUsers(filteredUsers)
  }
  // console.log(users)
  return (
    <div className='h-[120vh]'>
      <div className="w-full h-[5vw] flex gap-6 justify-start items-center text-white p-[2vw] border-b-[1px] border-black">
        <RxCross1></RxCross1><span className="text-xl">Group info</span>
      </div>
      
      <div className="w-full flex flex-col justify-center text-white text-[1.5vw] bg-[#2F3136] items-center py-2 px-10">
        <Avatar  src={selectedChat.grpProfileimg} className=" w-[12vw] h-[12vw] text-large" />
        <div className='flex items-center justify-center  gap-4 mt-4'><span >{selectedChat.chatName}</span><MdOutlineModeEdit></MdOutlineModeEdit></div>
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
              {getAdmin(selectedChat.groupAdmin,item._id)?<Chip className='bg-gradient-to-br from-purple-500  to-cyan-500'>Admin</Chip>:<></>}

            </div>
          ))}
        </div>
        <div className='h-[50vh] w-[30vw] bg-white'>
            {/* <span>{users}</span> */}
        </div>
      </div>
    </div>
  );
};

export default GrpProfilePage;
