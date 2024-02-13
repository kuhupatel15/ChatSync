import { Avatar, Badge } from 'flowbite-react'
import { Link, } from 'react-router-dom'
import { getTime } from '../../utils/msg.js'

const UserChat = (props) => {

  return (
    // <Link to={`/chat/${props.chatid}`} className='w-full text-left text-[#e2e8f0] flex p-4 justify-between hover:bg-gray-400 cursor-pointer'>
     <div> <Avatar img="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" rounded  >
        <div className="space-y-1 font-medium dark:text-white">
          <div>{props.name}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{props.lastmsg}</div>
        </div>
      </Avatar>
      {props.lastmsg&&<small className=' text-gray-400'>{getTime(props.lastmsgtime)}</small>}</div>
    // </Link>
  )
}

export default UserChat