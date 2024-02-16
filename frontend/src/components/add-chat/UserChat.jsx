import { Avatar, Badge } from "@nextui-org/react";
import { Card, CardBody, Button } from "@nextui-org/react";
import { Link, } from 'react-router-dom'
import { getTime } from '../../utils/msg.js'
import { Divider } from "@nextui-org/react";

const UserChat = (props) => {

  return (
    <Link to={`/chat/${props.chatid}`}>
      <div className="hover:bg-zinc-800 px-2 py-4">
        <div className="flex px-4 w-full items-center gap-6">
          <div className="relative col-span-6 md:col-span-4">
            <Avatar src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" size="lg" />
          </div>
          <div className="w-full flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between">
              <div className="w-full flex flex-col gap-2">
                <h3 className="font-semibold text-white">{props.name}</h3>
                <p className="text-small text-foreground/80">{props.lastmsg}</p>
              </div>
              {props.lastmsg &&
                <small className=' text-gray-400'>{getTime(props.lastmsgtime)}</small>
              }
            </div>
          </div>
        </div>
        {/* <Divider className="my-3" /> */}
      </div>
    </Link>
  )
}

export default UserChat