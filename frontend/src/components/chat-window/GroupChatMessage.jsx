import { Avatar } from "@nextui-org/react";
import { getTime } from '../../utils/msg.js'

const GroupChatMessage = (props) => {
    return (
        <div className='flex gap-2 ' >
            <Avatar rounded size='sm' className='self-start mt-2' src={props.profileImg} />
            
            <div className={'max-w-[40vw] text-[1.1vw] bg-[#303339] rounded text-gray-300  flex flex-col p-2 mb-[0.5vw]'}>
                <h6 className="text-purple-600">{props.sender}</h6>

                <div className="flex ">
                    <h6 className='message max-w-[35vw]'>{props.msg}</h6>
                    <small className='self-end text-gray-400 ml-2 mt-2'>{getTime(props.time)}</small>
                </div>
            </div>
        </div>
    )
}

export default GroupChatMessage