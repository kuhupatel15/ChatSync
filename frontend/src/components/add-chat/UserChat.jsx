import { Avatar, Badge } from "@nextui-org/react";
import { Card, CardBody, Button } from "@nextui-org/react";
import { Link, } from 'react-router-dom'
import { getTime } from '../../utils/msg.js'
import { Divider } from "@nextui-org/react";

const UserChat = (props) => {

  return (

    <div className="hover:bg-zinc-800 px-2 py-4">
      <div className="flex px-4 w-full items-center gap-6">
        <div className="relative col-span-6 md:col-span-4">
          <Avatar src={props.grpProfileimg} size="lg" />
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

    </div>

  )
}

export default UserChat