import React, { useEffect, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { GroupChatState } from '../../context/GroupChatProvider.jsx';
import { Button, Input, Avatar, Divider, CheckboxGroup, Checkbox, Link, User, Chip, cn } from "@nextui-org/react";
import { Get_all_users, Create_group } from "../../utils/FetchData.js"
import UserChat from '../add-chat/UserChat.jsx';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import GrpDetsDrawer from './GrpDetsDrawer.jsx';
import toast from 'react-hot-toast';


const NewGrpDrawer = () => {
  const { groupDrawerOpen, setgroupDrawerOpen, grpDetsDrawerOpen, setgrpDetsDrawerOpen } = GroupChatState();
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [grpName, setgrpName] = useState("");

  const getAllusers = async () => {
    const response = await Get_all_users();
    setUsers(response.data)
  }

  useEffect(() => {
    getAllusers();
  }, []);

  const addToGroup = (user) => {
    setMembers([...members, user])
  }

  const createGroup = async (e) => {
    e.preventDefault();
    if (grpName.length > 0 && members.length > 0) {
      const response = await Create_group({ users: members, grpname: grpName });
      console.log(response.data);
      setMembers([]);
      setgrpName('');
    }
  };

  return (
    <div className='bg-[#2F3136]' style={{ position: "absolute", height: "100vh", transform: `translateX(${!groupDrawerOpen ? "0%" : "-100%"})`, width: "100%", transition: "ease-in-out 0.5s", top: "0%", zIndex: "99999999" }}>
      <div className='flex flex-col h-screen'>
        <div className='bg-[#36393F] p-4 text-white flex justify-between items-center'>
          <span className='text-lg text-white'>Create Group</span>
          <RxCross1 className='hover:cursor-pointer' onClick={() => {setgroupDrawerOpen(!groupDrawerOpen);setMembers([])}} />
        </div>

        <div className='px-2 h-full overflow-y-auto'>
          <div className='h-full pt-8 overflow-y-scroll'>
            <CheckboxGroup
              value={members}
              onChange={setMembers}
              classNames={{
                base: "w-full",
              }}
            >
              {users?.length > 0 ?users.map((user) => (
                <CustomCheckbox key={user._id} user={user} />
              )):<span> No users found !</span>}
            </CheckboxGroup>
          </div>
        </div>

        <div className='mt-auto py-2 flex justify-center'>
          {members.length > 1 ? (
            <Button
              onClick={() => setgrpDetsDrawerOpen(!grpDetsDrawerOpen)}
              isIconOnly
              color="primary"
              variant="faded"
              className='cursor-pointer'
            >
              <ArrowRightIcon className='text-xl' />
            </Button>
          ) : (
            <Button
              isIconOnly
              onPress={() => alert('At least 2 members need to be selected to create the group.')}
              color="primary"
              variant="faded"
              className='cursor-pointer'
            >
              <ArrowRightIcon className='text-xl' />
            </Button>
          )}
        </div>
      </div>

      <GrpDetsDrawer members={members} />
    </div>
  );

}

export default NewGrpDrawer




const CustomCheckbox = ({ user }) => {
  return (
    <Checkbox
      aria-label={user.userName}
      classNames={{ 
        base: cn(
          "inline-flex max-w-md w-full bg-content1 m-0",
          "hover:bg-content2 items-center justify-start",
          "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
        label: "w-full",
      }}
      value={user._id}
    >
      <div className="w-full flex justify-between gap-2">
        <User
          avatarProps={{ size: "md", src: user.profileImg }}
          description={
            // <Link isExternal href={user.url} size="sm">
            <span>
              {user.userEmail}
            </span>
            // </Link>
          }
          name={user.userName}
        />
      </div>
    </Checkbox>
  );
};