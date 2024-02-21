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
    <div className='bg-white' style={{ position: "absolute", height: "100vh", transform: `translateX(${!groupDrawerOpen ? "0%" : "-100%"})`, width: "100%", transition: "ease-in-out 0.5s", top: "0%", zIndex: "99999999" }}>
      <div className='h-[10vh] bg-gray-300 flex justify-between items-center px-4 text-xl'>
        <span>Create Group</span>
        <RxCross1 className='hover:cursor-pointer' onClick={() => setgroupDrawerOpen(!groupDrawerOpen)} />
      </div>

      <div className='h-max px-2 py-6'>
        {/* <form onSubmit={createGroup}>
          <Avatar />
          <Input
            size='md'
            onChange={(e) => setgrpName(e.target.value)}
            label="Group name"
            placeholder='Enter the group name'
          />
          <Button color="primary" type='submit'>Create</Button>
        </form> */}

        <div className='max-h-[40vw] overflow-scroll scrollbar-hide' >
          <p className="mt-4 ml-1 text-black">
            Selected:
            {members.map((member, index) => (
              <Chip key={index} color="primary" size="sm" variant="flat" className='mx-1'>
                {member}
              </Chip>
            ))}
          </p>

          <CheckboxGroup
            label="Add group members: "
            value={members}
            onChange={setMembers}
            classNames={{
              base: "w-full",
            }}
          >
            {users && users.length > 0 && users.map((user) => (
              <CustomCheckbox key={user._id} user={user} />
            ))}
          </CheckboxGroup>

          {members.length > 1 ? (
            <Button
              onClick={() => setgrpDetsDrawerOpen(!grpDetsDrawerOpen)}
              isIconOnly
              color="primary"
              variant="faded"
              aria-label="Take a photo"
            >
              <ArrowRightIcon className='text-xl' />
            </Button>
          ) : (
            <Button
              disabled
              isIconOnly
              onClick={()=>toast.error(`Atleast 2 members needs to be selected to create the group. `)}
              color="primary"
              variant="faded"
              aria-label="Take a photo"
            >
              <ArrowRightIcon className='text-xl' />
            </Button>
          )}
        </div>

      </div>
      <GrpDetsDrawer members={members} />

    </div>
  )
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
          avatarProps={{ size: "md", src: user.profileimg }}
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