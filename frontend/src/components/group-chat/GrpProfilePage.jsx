import React, { useEffect } from 'react';
import { Divider, Avatar } from '@nextui-org/react';
import { ChatState } from '../../context/ChatProvider.jsx';

const GrpProfilePage = () => {
  const { selectedChat } = ChatState();

  useEffect(() => {
  }, []);

  return (
    <div className='min-h-[200vh]'>
      <div className="w-full h-[5vw] flex justify-between items-center p-[2vw]">
        <span className="text-white">Group info</span>
      </div>
      <Divider />
      <div className="w-full flex flex-col justify-center items-center">
        <Avatar src={selectedChat.grpProfileimg} className="mt-6 w-20 h-20 text-large" />
        <span className="text-white mt-4">{selectedChat.chatName}</span>
      </div>
      <div className="w-full mt-6 flex flex-col justify-center items-center">
        <span className="text-white">Group members</span>
        <div className="flex flex-col gap-4 mt-2">
          {selectedChat.users.map((item) => (
            <div key={item._id} className="flex gap-2 items-center">
              <Avatar alt={item.userName} className="flex-shrink-0" size="sm" src={item.profileimg} />
              <div className="flex flex-col">
                <span className="text-small text-white">{item.userName}</span>
                <span className="text-tiny text-gray-500">{item.userEmail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GrpProfilePage;
