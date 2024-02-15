import React from 'react'
import '../../index.css'
import { useDispatch } from 'react-redux'
import { logout } from "../../../store/reducers/AuthSlice.js"
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { HiOutlineLogout } from "react-icons/hi";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";


const LogoutBtn = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const submithandler = async () => {
        toast.success("Log out successfully.")
        localStorage.removeItem("jwt_token");
        dispatch(logout());
        navigate('/login')
    }

    return (
        <div>
            <Button isIconOnly onPress={onOpen} color="default" variant="faded" aria-label="Take a photo">
                <HiOutlineLogout className='text-xl' />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
    )
}

export default LogoutBtn