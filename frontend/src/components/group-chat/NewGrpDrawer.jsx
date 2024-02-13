import React, { useEffect, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { GroupChatState } from '../../context/GroupChatProvider.jsx';
import {Avatar,TextInput,Label} from 'flowbite-react'
import {Get_all_users,Create_group} from "../../utils/FetchData.js"
// import UserChatsContainer from '../add-chat/UserChatsContainer.jsx';
import UserChat from '../add-chat/UserChat.jsx';
// import { set } from 'react-hook-form';
const NewGrpDrawer = () => {
  const { groupDrawerOpen, setgroupDrawerOpen } = GroupChatState();
  const [users,setUsers]=useState([]);
  const [members,setMembers]=useState([]);
  const [grpName,setgrpName]=useState("");
  const getAllusers = async ()=>{
    const response = await Get_all_users();
    setUsers(response.data)
    console.log(response.data)
  }
  useEffect(()=>{
    getAllusers();
  },[])
  const addToGroup = (user)=>{
    console.log(user)
    setMembers([...members,user])
  }
  const createGroup = async ({members,grpName},e)=>{
    e.preventDefault();
    // if( grpName.length>0&&members.length>0 )
    {const response = await Create_group({users:members,grpname:grpName})
    console.log(response.data)
  }
  }
  console.log(members)
  return (
    <div style={{ position: "absolute",height:"100vh", transform: `translateX(${!groupDrawerOpen ? "0%" : "-100%"})`, width: "100%", transition: "ease-in-out 0.5s", top: "0%", zIndex: "99999999" }}>
      <div className='h-[10vh] bg-gray-300 flex justify-between items-center px-4 text-xl'>
        <span>Add Group</span>
        <RxCross1 onClick={() => setgroupDrawerOpen(!groupDrawerOpen)} />
      </div>
      <div className='h-[90vh] bg-red-200 p-2'>
        <form onSubmit={createGroup}>
          <Avatar></Avatar>
          <Label>Group Title</Label>
          <TextInput onChange={(e)=>setgrpName(e.target.value)} ></TextInput>
          <div className='h-[6vh] bg-blue-200 text-black flex gap-2'>
              {members&&members.map((item)=>(
                <h6>{item.userName}</h6>
              ))}
          </div>
          <button type='submit'>create</button>
        </form>
        <div className='max-h-[40vw] overflow-scroll scrollbar-hide' >
      {users && users.length > 0 && users.map((user) => (
        <div key={user._id} onClick={(e)=>{e.preventDefault();addToGroup(user)}}>
          <UserChat name={user.userName} 
          />
        </div>
       ))} 
     </div>
      </div>
    </div>
  )
}

export default NewGrpDrawer