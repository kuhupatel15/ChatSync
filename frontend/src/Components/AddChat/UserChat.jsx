import React from 'react'
import { Avatar,Badge } from 'flowbite-react'
const UserChat = () => {
  return (
    <div className='w-full text-left text-[#e2e8f0] flex p-4 justify-between'>
    <Avatar img="/images/people/profile-picture-5.jpg" rounded  >
    <div className="space-y-1 font-medium dark:text-white">
      <div>Jese Leos</div>
      <div className="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>
    </div>
  </Avatar>
  <small className=' text-gray-400'>1234</small>
  <Badge size="sm" color='purple'>2
    </Badge>


  </div>
  )
}

export default UserChat