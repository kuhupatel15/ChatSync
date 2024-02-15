import {Avatar} from "@nextui-org/react";

const GroupChatMessage = () => {
    return (
        <div className='flex gap-2'>
            <Avatar rounded size='sm' className='self-start mt-2' />
            <div className='max-w-[40vw] text-[1.1vw] bg-[#7388D9] rounded text-gray-300 message flex flex-col p-2 mb-2'>
                <h6>Hello, Good morning</h6>
                <small className='self-end text-[#e2e8f0]'>1234</small>
            </div>
        </div>
    )
}

export default GroupChatMessage