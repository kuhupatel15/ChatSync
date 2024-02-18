import React, { useEffect, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { GroupChatState } from '../../context/GroupChatProvider.jsx';
import { Button, Input, Avatar, Divider, CheckboxGroup, Checkbox, Link, User, Chip, cn } from "@nextui-org/react";
import { Get_all_users, Create_group } from "../../utils/FetchData.js"
import UserChat from '../add-chat/UserChat.jsx';
import { ChatState } from '../../context/ChatProvider.jsx';

const GrpDetsDrawer = ({ members }) => {
  const { groupDrawerOpen, setgroupDrawerOpen, grpDetsDrawerOpen, setgrpDetsDrawerOpen } = GroupChatState();
  const { fetchAgain, setFetchAgain } = ChatState();
  const [grpName, setgrpName] = useState("");

  const createGroup = async (e) => {
    e.preventDefault();
    if (grpName.length > 0 && members.length > 0) {
      const response = await Create_group({ users: members, grpname: grpName });
      console.log(response.data);
      setgrpName('');
      setgroupDrawerOpen(!groupDrawerOpen);
      setgrpDetsDrawerOpen(!grpDetsDrawerOpen);
      setFetchAgain(!fetchAgain)
    }
  };

  return (
    <div className='bg-white' style={{ position: "absolute", height: "100vh", transform: `translateX(${!grpDetsDrawerOpen ? "0%" : "-100%"})`, width: "100%", transition: "ease-in-out 0.5s", top: "0%", zIndex: "99999999" }}>
      <div className='h-[10vh] bg-gray-300 flex justify-between items-center px-4 text-xl'>
        <span>Create Group</span>
        <RxCross1 className='hover:cursor-pointer' onClick={() => setgrpDetsDrawerOpen(!grpDetsDrawerOpen)} />
      </div>

      <div className='h-[90vh] p-2'>
        <form onSubmit={createGroup}>
          <Avatar />
          <Input
            size='md'
            onChange={(e) => setgrpName(e.target.value)}
            label="Group name"
            placeholder='Enter the group name'
          />
          <Button color="primary" type='submit'>Create</Button>
        </form>
      </div>
    </div>
  )
}

export default GrpDetsDrawer




