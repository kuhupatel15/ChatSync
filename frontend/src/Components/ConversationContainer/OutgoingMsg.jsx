import React from 'react'
import {getTime} from'../../utils/msg.js'

const OutgoingMsg = (props) => {
  return (
    <div className='flex self-end' >
    <div className='max-w-[40vw] bg-[#7388D9] rounded text-white message flex p-2 mb-[0.5vw] ' >
        <h6 >{props.content}</h6>
        <small className='self-end text-gray-300 ml-2 mt-2'>{getTime(props.time)}</small>
    </div>
    </div>
  )
}

export default OutgoingMsg
