import { useEffect, useState } from 'react'
import UserChat from './UserChat.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setAllChats } from '../../../store/reducers/AllChatsSlice.js'
import { setchat } from '../../../store/reducers/chatSlice.js'
import { Fetch_chat } from '../../routes/ChatRoutes.js'

const UserChatsContainer = () => {
  const dispatch = useDispatch();
  const allchats = useSelector(({chats}) => chats.chats)


  const notifications = useSelector((state)=> state.notifications.notifications)


  const getallchats = async () => {
    const response = await Fetch_chat();
    dispatch(setAllChats(response.data.chat))
  }

  useEffect(() => {
    getallchats();
  }, [notifications])

  return (
    <div className='max-h-[40vw]  flex flex-col  overflow-scroll scrollbar-hide' >
      {allchats && allchats.length > 0 && allchats.map((user) => (

        <div
          key={user._id}
          onClick={() => {
            dispatch(setchat(user))
            if (notifications.has(user._id)) {
              notifications.delete(user._id)
            }
          }}>
          <UserChat chat={user} />
        </div>

      ))}
    </div>
  )
}

export default UserChatsContainer