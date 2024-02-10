import React from 'react'
import {getTime} from'../../utils/msg'
// import { get } from 'react-hook-form'
const Message = (props) => {
  return (
    <div className='flex '>
    <div className='max-w-[40vw] bg-[#303339] rounded text-white message flex p-2 mb-[0.5vw]'>
        <h6 >{props.content}</h6>
        <small className='self-end text-gray-400 ml-2 mt-2'>{getTime(props.time)}</small>
    </div>
    </div>
  )
}

export default Message