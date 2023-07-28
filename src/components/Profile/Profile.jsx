import { Avatar, Button, Container, HStack, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fileuploadStyle } from '../Auth/Register'
import axios from 'axios'
import { SERVER_URL } from '../../App'
import CookieFields from '../../context/utils'
import { CartContext } from '../../context/store'
import Cookies from 'js-cookie'

const changeProfileImage = async(formdata,token)=>{
    const data = await axios.put(`${SERVER_URL}/updateprofilepicture`,formdata,{
        headers:{
        "Content-Type":"multipart/form-data",
        Authorization: `Bearer <${token}>`
      },
      withCredentials:true})
      return data
    }

const getProfile=async(token)=>{
    const data = await axios.get(`${SERVER_URL}/me`,{
        headers:{
        Authorization: `Bearer <${token}>`
      },
      withCredentials:true
    })
      return data
    }

function Profile() {
const  userDetails=JSON.parse(CookieFields.getUser())
    const [user,setUser]=useState(userDetails?userDetails:{})
    const {ErrorHandler,successHandler} = useContext(CartContext)

    const changeImageSubmitHandler=({e,image})=>{
        e.preventDefault()
    }
    useEffect(()=>{
        const token = CookieFields.getToken()
        if(token){
        getProfile(token).then(data=>{
            setUser(data.data.user)
            CookieFields.userInCookie(data.data.user)
            successHandler(data.data)        
        }).catch(err=>ErrorHandler(err))
    }
    },[user])

    const {isOpen,onClose , onOpen} =useDisclosure()
  return (
    <Container minH={'95vh'} maxW={'container.lg'} py={'8'}>
        <Heading children='Profile' m={'8'} textTransform={'uppercase'}/>
        <Stack justifyContent={'flex-start '} direction={['column','row']} alignItems={'center'} spacing={['8','16']} padding={'8'}>
            <VStack>
                &&<Avatar boxSize={'48'} src={user.avatar&&`${user.avatar.url}`} loading='lazy'/>
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
                    <Text children={new Date(user.createdAt).toString().split("G")[0]}/>
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
    const {loadingHandler,successHandler,ErrorHandler,storeUser}=useContext(CartContext)
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
        const token = CookieFields.getToken()
        e.preventDefault();
        if(token){
        loadingHandler(true)
        changeProfileImage(formdata,token).then((data)=>{
            successHandler(data.data);
            CookieFields.userInCookie(data.data)
            storeUser(data.data.user)
        }).catch(err=>ErrorHandler(err))}
        
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