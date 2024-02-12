import React, { useState } from 'react'
// import UserChatsContainer from '../AddChat/UserChatsContainer'
import { RxCross1 } from "react-icons/rx";
import { GroupChatState } from '../../Context/GroupChatProvider.jsx';
const NewGroupDrawer = () => {
    const {groupDrawerOpen,setgroupDrawerOpen}=GroupChatState();
  return (
    
        <div style={{position:"absolute",transform:`translateX(${!groupDrawerOpen?"0%":"-100%"})`,width:"100%",transition:"ease-in-out 0.5s",top:"0%",zIndex:"99999999"}}>
            <div className='h-16 bg-gray-300 flex justify-between items-center px-4 text-xl'>
              <span>  Add participents</span><RxCross1 onClick={()=>setgroupDrawerOpen(!groupDrawerOpen) }></RxCross1>
            </div>

            {/* <UserChatsContainer></UserChatsContainer> */}
        </div>

    
  )
}

export default NewGroupDrawer