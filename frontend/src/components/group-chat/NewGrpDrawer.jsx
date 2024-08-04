import React, { useEffect, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { Button, CheckboxGroup, Checkbox, User, cn } from "@nextui-org/react";
import { Get_all_users } from "../../routes/UserRoutes.js"
import { ArrowRightIcon } from '@radix-ui/react-icons';
import GrpDetsDrawer from './GrpDetsDrawer.jsx';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import toast from 'react-hot-toast';


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
            <span>
              {user.userEmail}
            </span>
          }
          name={user.userName}
        />
      </div>
    </Checkbox>
  );
};

const NewGrpDrawer = ({ isGrpOpen, setisGrpOpen }) => {
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [grpDetsDrawerOpen, setgrpDetsDrawerOpen] = useState(false)

  const getAllusers = async () => {
    const response = await Get_all_users();
    setUsers(response.data)
  }

  useEffect(() => {
    getAllusers();
  }, []);

  return (
    <div className='bg-pri' style={{ position: "absolute", height: "100%", transform: `translateX(${isGrpOpen ? "0%" : "-100%"})`, width: "100%", transition: "ease-in-out 0.5s", top: "0%", zIndex: "99999999" }} >
      <div className='bg-sec h-[15%] flex justify-between items-center px-6'>
        <span className='text-white font-bold text-2xl tracking-wider'>Create Group</span>
        <MdKeyboardDoubleArrowLeft className='hover:cursor-pointer text-white text-xl' onClick={() => setisGrpOpen(false)} />
      </div>

      <div className="w-full h-full flex flex-col px-10 justify-between py-12">
        <div className='w-full h-[80%] overflow-y-auto'>
          <CheckboxGroup
            value={members}
            onChange={setMembers}
            classNames={{
              base: "w-full",
            }}
          >
            {users?.length > 0 ? users.map((user) => (
              <CustomCheckbox key={user._id} user={user} />
            )) : <span className='text-lg text-gray-400'> No users found !</span>}
          </CheckboxGroup>
        </div>

        <div className='h-[20%] flex justify-center'>
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
              onPress={() => toast.error('At least 2 members need to be selected to create the group.')}
              color="primary"
              variant="faded"
              className='cursor-pointer'
            >
              <ArrowRightIcon className='text-xl' />
            </Button>
          )}
        </div>
      </div>

      <GrpDetsDrawer grpDetsDrawerOpen={grpDetsDrawerOpen} setgrpDetsDrawerOpen={setgrpDetsDrawerOpen} members={members} />
    </div>
  );

}

export default NewGrpDrawer