
import { createContext, useState,useContext } from 'react'
const GroupChatContext = createContext();
const GroupChatProvider = ({children}) => {
  const [groupDrawerOpen,setgroupDrawerOpen]  =useState(false)
  return (
    <GroupChatContext.Provider
        value={
            {
                groupDrawerOpen,
                setgroupDrawerOpen
            }
        } 
    >{children}</GroupChatContext.Provider>
  )
}
export const GroupChatState =()=>{
        return useContext(GroupChatContext)
}

export default GroupChatProvider