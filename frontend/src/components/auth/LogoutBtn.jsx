import React from 'react'
import '../../index.css'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { HiOutlineLogout } from "react-icons/hi";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useDispatch } from 'react-redux'
import { logout } from "../../../store/reducers/UserSlice.js"
import { clearAllChats} from "../../../store/reducers/AllChatsSlice.js"
import { clearchat } from "../../../store/reducers/chatSlice.js"
import { clearmessages } from "../../../store/reducers/messagesSlice.js"
import { clearnotifications } from "../../../store/reducers/notificationsSlice.js"


const LogoutBtn = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const submithandler = async () => {
        toast.success("Log out successfully.")
        // localStorage.removeItem("jwt_token");
        // localStorage.removeItem("userInfo");
        dispatch(logout());
        dispatch(clearmessages())
        dispatch(clearAllChats())
        dispatch(clearchat())
        dispatch(clearnotifications())
        navigate('/login')
    }

    return (
        <div>
            <Button
                isIconOnly
                onPress={onOpen}
                className='bg-gradient-to-br from-purple-500  to-cyan-500'
                variant="faded"
                aria-label="Take a photo"
            >
                <HiOutlineLogout className='text-2xl' />
            </Button>

            <div className='absolute'>
                <Modal placement='top-center' isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Log out account</ModalHeader>
                                <ModalBody>
                                    <p>
                                        Are you sure you want to log out your account ?
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={() => {
                                        onClose();
                                        submithandler();
                                    }}>
                                        Log out
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </div>
    )
}

export default LogoutBtn