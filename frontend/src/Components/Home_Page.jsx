import React, { useEffect } from 'react'
import Logout from './Logout_btn'
import { Add_chat, Create_group, Fetch_chat, Get_all_messages, Get_all_users, Rename_group, Send_message } from '../utils/Fetch_data'

const Home_Page = () => {


  const getdata = async () => {
    // const response = await Get_all_users();
    // const response = await Add_chat("65bbb355740a25af8d0d32e2")
    // const response = await Fetch_chat()
    // const response = await Send_message("hello sarthak", "65bbc361d42d5ac5949b8c2e")
    // const response = await Get_all_messages("")
    // const response = await Create_group({ 
    //   users: ["65bbb355740a25af8d0d32e2", "65bbc6d9d9e8a9b627af8c30"], 
    //   grpname: "mc" 
    // });
    // const response = await Rename_group({ chatId: "65bbc9d6e09f5e95cbd1dfd7", newgrpname: "asdadsa" })
    console.log(response)
  }

  useEffect(() => {
    // getdata();
  }, [])

  return (
    <div className='flex h-[100vh]'>
      <div className='w-[40vw] h-full bg-[#37393F]'>
        <button onClick={getdata}>Send</button>
      </div>
      <div className='w-[60vw] h-full'>
        <Logout />
      </div>
    </div>
  )
}

export default Home_Page