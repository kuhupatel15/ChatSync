import { useEffect, useRef, useState } from 'react';
import { Avatar, Chip, Button, CheckboxGroup, Checkbox, cn, User, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { ChatState } from '../../context/ChatProvider.jsx';
import { RxCross1 } from "react-icons/rx";
import { useNavigate, useParams } from 'react-router-dom';
import { getAdmin } from "../../utils/ChatLogics.js"
import { MdOutlinePersonAdd, MdDone, MdOutlineModeEdit } from "react-icons/md";
import { Remove_member_from_group, Upload_profileimg_of_group, Add_to_group, Rename_group,Exit_from_group } from "../../Routes/GroupRoutes.js"
import { Get_all_users } from "../../Routes/UserRoutes.js"
import { SelectedChatInfo } from "../../Routes/ChatRoutes.js"
import { CameraIcon } from '@radix-ui/react-icons'
import "../../index.css"
import { IoIosArrowDown } from "react-icons/io";
import { getOppUserName, getOppUser } from '../../utils/ChatLogics.js';
import { useDispatch, useSelector } from 'react-redux';
import { setchat } from '../../../store/reducers/chatSlice.js';

const CustomCheckbox = ({ user, member }) => {
  return (
    <Checkbox
      aria-label={user.userName}
      classNames={{
        base: cn(
          "inline-flex max-w-md w-full bg-content1 bg-black m-0",
          "hover:bg-zinc-900 items-center justify-start",
          "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary",
          `${member.length === 1 && member != user._id ? "pointer-events-none bg-gray-500" : "pointer-events-auto"}`
        ),
        label: "w-full",

      }}
      value={user._id}
    >
      <div className="w-full flex justify-between  text-white gap-2">
        <User
          avatarProps={{ size: "md", src: user.profileImg }}
          name={user.userName}
        />
      </div>
    </Checkbox>
  );
};

const GrpProfilePage = () => {
  const { chatid } = useParams();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.selectedchat.chat)
  const user = useSelector((state) => state.auth.userData);
  const allchats = useSelector((state) => state.chats.chats)


  const [users, setUsers] = useState([]);
  const [commonchat, setCommonchat] = useState([]);
  const [edit, setEdit] = useState(false)
  const [member, setMember] = useState([]);
  const [grpname, setGrpname] = useState("")

  const getSelectedChat = async () => {
    let response = await SelectedChatInfo({ chatId: chatid })
    dispatch(setchat(response.data))
  }

  useEffect(() => {
    getSelectedChat();
    groupIncommon();
  }, []);

  const getAllusers = async () => {
    onOpen();
    let response = await Get_all_users();
    let filteredUsers = response.data.filter(user => !selectedChat.users.some(item => item._id === user._id))
    setUsers(filteredUsers)
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      await Upload_profileimg_of_group({ chatId: selectedChat._id, file: e.target.files[0] });
      window.location.reload();
    }
  };

  const addToGroup = async (chatid, member) => {
    await Add_to_group({ chatId: chatid, memberid: member });
    getSelectedChat();
  }

  const rename = async (chatid, grpname) => {
    await Rename_group({ chatId: chatid, newgrpname: grpname })
    setEdit(!edit)
  }

  const removeFromGroup = async (memberId) => {
    await Remove_member_from_group({ chatId: selectedChat._id, memberId: memberId })
    getSelectedChat();
  }

  const exitFromGroup = async (memberId) => {
    await Exit_from_group({ chatId: selectedChat._id, memberId: memberId })
    navigate('/home')
    dispatch(setchat())
  }

  const contact=getOppUser(user,selectedChat?.users)?._id;

  const groupIncommon = () => {
    const commonChats = allchats.filter(chat =>
      chat.isGroupChat && (chat.users.some(item => (item._id === user._id) && chat.users.some(item => item._id === contact)))
    )
    setCommonchat(commonChats);
  }

  return (
    <div>
      {selectedChat && selectedChat.isGroupChat ?
        (
          <div className='h-[120vh]'>
            <div className="w-full h-[5vw] flex gap-6 justify-start items-center text-white p-[2vw] border-b-[1px] border-black">
              <RxCross1 onClick={() => navigate(`/chat/${selectedChat._id}`)} className='hover:cursor-pointer' />
              <span className="text-xl">Group info</span>
            </div>

            <div className="w-full flex flex-col justify-center h-[40vh] text-white text-[1.5vw] bg-[#2F3136] items-center py-2 px-10 ">
              <div className=" w-[12vw] h-[12vw] relative">
                <Avatar src={selectedChat.grpProfileimg} className="w-full h-full absolute top-0 left-0 opacity-70" />
                <div className="w-full h-full flex flex-col items-center justify-center absolute top-0 left-0 rounded-full opacity-0 bg-black hover:opacity-50 hover: hover:cursor-pointer" onClick={() => inputRef.current.click()}>
                  <input type="file" name='file' onChange={handleUpload} ref={inputRef} className='hidden' />
                  <CameraIcon />
                  <span className='text-sm mt-2'>CHANGE</span>
                  <span className='text-sm'>PROFILE PHOTO</span>
                </div>
              </div>

              <div className='flex items-center h-[7vh] justify-center gap-4 mt-4'>
                <h6
                  inputMode='text'
                  onInput={(e) => setGrpname(e.currentTarget.textContent)}
                  contentEditable={edit}
                  className={edit ? 'grpname' : "min-w-[8vw] duration-100 ease-in-out"}
                >
                  {selectedChat.chatName}
                </h6>

                {
                  edit &&
                  <Button
                    isIconOnly
                    onClick={() => rename(selectedChat._id, grpname)}
                    className='mt-2 bg-gradient-to-br from-purple-500  to-cyan-500'
                    variant="faded"
                    aria-label="Take a photo">
                    <MdDone />
                  </Button>
                }

                <MdOutlineModeEdit onClick={() => setEdit(!edit)} />
              </div>
            </div>

            <div className="w-full mt-2 flex flex-col  p-10 ">
              <div className='flex justify-between w-full text-xl text-white'>
                <span>Group members</span>
                <span>{selectedChat.users.length} members</span>
              </div>

              <Button
                onClick={getAllusers}
                className='flex items-center mt-4 gap-6 w-full text-white bg-gradient-to-br from-purple-500  to-cyan-500'>
                <MdOutlinePersonAdd className='text-2xl' />
                <span>Add Members</span>
              </Button>

              <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                classNames={{
                  backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
                  base: "bg-white max-h-[70vh] overflow-auto"
                }}
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">Add Member</ModalHeader>
                      <ModalBody>
                        <CheckboxGroup
                          value={member}
                          onChange={setMember}
                          classNames={{
                            base: "w-full",
                          }}
                        >
                          {users && users.length > 0 && users.map((user) => (
                            <CustomCheckbox key={user._id} user={user} member={member} />
                          ))}
                        </CheckboxGroup>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                          Close
                        </Button>
                        <Button color="primary" onClick={() => addToGroup(selectedChat._id, member)}>
                          Add
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>

              <div className="flex flex-col gap-4 mt-6">
                {selectedChat.users.map((item) => (
                  <div key={item._id} className="flex gap-2 items-center ">
                    <Avatar alt={item.userName} className="flex-shrink-0" size="md" src={item.profileImg} />
                    <div className="flex flex-col text-[1.2vw]">
                      <span className=" text-white">{item.userName}</span>
                      <span className="text-small text-gray-500">{item.userEmail}</span>
                    </div>

                    {
                      getAdmin(selectedChat.groupAdmin, item._id)
                      &&
                      <Chip className='bg-gradient-to-br from-purple-500  to-cyan-500'>Admin</Chip>
                    }

                    <Dropdown className='bg-black text-white' >
                      <DropdownTrigger>
                        <Button isIconOnly variant='light' >
                          <IoIosArrowDown className='text-white' />
                        </Button>
                      </DropdownTrigger>

                      <DropdownMenu aria-label="Dynamic Actions"  >
                        <DropdownItem key="remove" onClick={() => removeFromGroup(item._id)}>
                          Remove
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                ))}
              </div>

              <Button
                className='mt-6'
                onClick={() => exitFromGroup(user._id)}
                color="danger" variant="bordered"
                startContent={<RxCross1 />}
              >
                Exit Group
              </Button>
            </div>
          </div>
        )
        :
        (
          <div className='h-min-[100vh]'>
            <div className="w-full h-[5vw] flex gap-6 justify-start items-center text-white p-[2vw] border-b-[1px] border-black">
              <RxCross1 onClick={() => navigate(`/chat/${selectedChat._id}`)} className='hover:cursor-pointer' />
              <span className="text-xl">Contact info</span>
            </div>

            <div className="w-full flex flex-col mb-6 justify-center text-white text-[1.5vw] bg-[#2F3136] items-center py-2 px-10 ">
              <div className=" w-[12vw] h-[12vw] relative">
                <Avatar src={getOppUser(user, selectedChat?.users).profileImg} className="w-full h-full absolute top-0 left-0 opacity-70" />
              </div>

              <div className='flex items-center justify-center gap-4 mt-4'>
                <span>{getOppUserName(user, selectedChat?.users)}</span>
              </div>

            </div>

            <span className='text-xl text-white px-10 '>Groups in Common</span>
            <div className='w-full bg-[#2F3136] px-10 py-6 flex flex-col gap-4 mt-6'>
              {
                commonchat.map((item) => (
                  <div key={item._id} className="flex gap-2 items-center ">
                    <Avatar alt={item.userName} className="flex-shrink-0" size="md" src={item.grpProfileimg} />
                    <div className="flex flex-col text-[1.2vw]">
                      <span className=" text-white">{item.chatName}</span>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        )
      }
    </div>
  )
}

export default GrpProfilePage;