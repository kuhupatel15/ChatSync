import AddChatNav from '../components/add-chat/AddChatNav.jsx'
import UserChatsContainer from '../components/add-chat/UserChatsContainer.jsx'
import NewGrpDrawer from '../components/group-chat/NewGrpDrawer.jsx'

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <div className='flex h-screen overflow-hidden'>
        <div className='w-full md:w-[40vw] h-full relative bg-[#2F3136]'>
          <AddChatNav />
          <UserChatsContainer />
          <NewGrpDrawer />
        </div>
        <div className='md:w-[60vw] overflow-y-auto h-full bg-[#36393F]'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout;
