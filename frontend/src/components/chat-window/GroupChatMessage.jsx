import {Avatar} from "@nextui-org/react";
import { getTime } from '../../utils/msg.js'

const GroupChatMessage = (props) => {
    return (
        <div className= {props.user?'flex gap-2 ':'flex gap-2 self-end'} >
            <Avatar rounded size='sm' className='self-start mt-2' src={props.profileImg} />
            <div className={props.user?'max-w-[40vw] text-[1.1vw] bg-[#303339] rounded text-gray-300 message flex flex-col p-2 mb-[0.5vw]':'max-w-[40vw] text-[1.1vw] bg-[#7388D9] rounded text-gray-300 message flex flex-col p-2 mb-[0.5vw]'}>
                <h6>{props.msg}</h6>
                <small className='self-end text-gray-300 ml-2 '>{getTime(props.time)}</small>
            </div>
        </div>
    )
}

export default GroupChatMessage