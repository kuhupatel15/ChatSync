import React, { useEffect } from 'react'
import { Avatar, Badge } from 'flowbite-react'
import { Get_all_users } from '../../utils/Fetch_data'
import { Link, useNavigate } from 'react-router-dom'


const UserChat = (props) => {

  return (
      <Link to={`/chat/${props.chatid}`} className='w-full text-left text-[#e2e8f0] flex p-4 justify-between hover:bg-gray-400 cursor-pointer'>
        <Avatar img="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" rounded  >
          <div className="space-y-1 font-medium dark:text-white">
            <div>{props.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>
          </div>
        </Avatar>
        <small className=' text-gray-400'>1234</small>
        <Badge size="sm" color='purple'>2</Badge>
      </Link>
  )
}

export default UserChat