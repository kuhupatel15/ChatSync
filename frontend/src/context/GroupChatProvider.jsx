import { createContext, useState, useContext } from 'react'
const GroupChatContext = createContext();

const GroupChatProvider = ({ children }) => {
  const [groupDrawerOpen, setgroupDrawerOpen] = useState(true);
  const [grpDetsDrawerOpen, setgrpDetsDrawerOpen] = useState(true)

  return (
    <GroupChatContext.Provider
      value={
        {
          groupDrawerOpen,
          setgroupDrawerOpen,
          grpDetsDrawerOpen,
          setgrpDetsDrawerOpen
        }
      }>
      {children}
    </GroupChatContext.Provider>
  )
}

export const GroupChatState = () => {
  return useContext(GroupChatContext)
}

export default GroupChatProvider