import React from 'react'

const Message = (props) => {
  return (
    <div className='max-w-[40vw] bg-[#303339] rounded text-white message flex flex-col p-2 mb-2'>
        <h6 >{props.content}</h6>
        <small className='self-end text-gray-400'>1234</small>
    </div>
  )
}

export default Message