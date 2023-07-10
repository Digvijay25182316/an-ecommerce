import { Avatar, Button, Container, HStack, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fileuploadStyle } from '../Auth/Register'
import axios from 'axios'
import { SERVER_URL } from '../../App'

import Cookies from 'js-cookie'
import { toast } from 'react-hot-toast'

const changeProfileImage = async(formdata,token)=>{
    const data =await axios.put(`${SERVER_URL}/updateprofilepicture`,formdata,{
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer <${token}>`
          },
          withCredentials:true
    })
    return data
}

const getUser =()=>{
    const user =Cookies.get("user")
    return user
}

function Profile() {
    const [user,setUser]=useState({})

    useEffect(()=>{
        const user=getUser()
        if(user){
            setUser(user)
            setUser(JSON.parse(user))
        }
    },[])

    const changeImageSubmitHandler=({e,image})=>{
        e.preventDefault()
    }

    const {isOpen,onClose , onOpen} =useDisclosure()
  return (
    <Container minH={'95vh'} maxW={'container.lg'} py={'8'}>
        <Heading children='Profile' m={'8'} textTransform={'uppercase'}/>
        <Stack justifyContent={'flex-start '} direction={['column','row']} alignItems={'center'} spacing={['8','16']} padding={'8'}>
            <VStack>
                &&<Avatar boxSize={'48'} src={user.avatar&&`${user.avatar.url}`}/>
                <Button onClick={onOpen} colorScheme='yellow' variant={'ghost'} color={"yellow.400"}>
                    Change Photo
                </Button>
            </VStack>
            <VStack spacing={'4'} alignItems={['center','flex-start']}>
                <HStack>
                    <Text children='Name' fontWeight={'bold'}/>
                    <Text children={user.name}/>
                </HStack>{" "}
                <HStack>
                    <Text children="Email" fontWeight={'bold'}/>
                    <Text children={user.email}/>
                </HStack>
                <HStack>
                    <Text children="Created At" fontWeight={'bold'}/>
                    <Text children={new Date(user.createdAt).toUTCString()}/>
                </HStack>
                    <Stack direction={['column','row']} alignItems={'center'}>
                        <Link to={'/updateprofile'}>
                            <Button>Update Profile</Button>
                        </Link>
                        
                        <Link to={'/changepassword'}>
                            <Button>Change Password</Button>
                        </Link>                        
                    </Stack>
            </VStack>
        </Stack>
        <ChangePhotoBox changeImageSubmitHandler={changeImageSubmitHandler} isOpen={isOpen} onClose={onClose} />
    </Container>
  )
}

export default Profile

function ChangePhotoBox({isOpen,onClose,changeImageSubmitHandler}){
    const getToken=()=>{
        const token = Cookies.get("token")
        return token
    }
    const [image,setImage] = useState()
    const [imagePrev,setImagePrev] = useState()
    const changeImage=(e)=>{
        e.preventDefault(0)
        const file=e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            setImagePrev(reader.result)
            setImage(file)
        }
    }
    const formdata=new FormData()
    formdata.append("file",image)
    

    const Closehandler=(e)=>{
        const token = getToken()
        e.preventDefault();
        if(token){
        changeProfileImage(image,token).then(data=>console.log(data)).catch(err=>{toast.error(err.response.data.message||err.message);console.log(err)})}
        onClose();
        setImage('')
        setImagePrev('')
    }
    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay backdropFilter={`blur(10px)`}>
                <ModalContent>
                    <ModalCloseButton/>
                        <ModalBody>
                            <ModalHeader>Cange Profile</ModalHeader>
                            <Container>
                                <form onSubmit={e=>changeImageSubmitHandler(e,image)}>
                                    <VStack spacing={'8'}>
                                        {imagePrev&&<Avatar src={imagePrev} boxSize={'48'}/>}
                                        <Input  type='file' css={{"&::file-selector-button":fileuploadStyle}} onChange={changeImage}/>
                                        <Button onClick={Closehandler} w={'full'} colorScheme='yellow' type='submit'>Submit and Close</Button>
                                    </VStack>
                                </form>
                            </Container>
                        </ModalBody>
            <ModalFooter>
                <Button mr={'3'} onClick={onClose}>Cancel</Button>
            </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    )
}