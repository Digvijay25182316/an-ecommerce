import { Avatar, Button, Container, HStack, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { fileuploadStyle } from '../Auth/Register'

function Profile() {
    const user = {
        name:"Digvijay",
        email:"user@gmail.com",
        CreatedAt:String(new Date().toISOString()),
        role:'user',
        subscription:{
            status:"active"
        },
        playlist:[
            {
                course:"shdfgsjd",poster:"hdgfjdsfhge"
            }
        ]
    }

    const changeImageSubmitHandler=({e,image})=>{
        e.preventDefault()
        console.log(image)
    }

    const {isOpen,onClose , onOpen} =useDisclosure()
  return (
    <Container minH={'95vh'} maxW={'container.lg'} py={'8'}>
        <Heading children='Profile' m={'8'} textTransform={'uppercase'}/>
        <Stack justifyContent={'flex-start '} direction={['column','row']} alignItems={'center'} spacing={['8','16']} padding={'8'}>
            <VStack>
                <Avatar boxSize={'48'}/>
                <Button onClick={onOpen} colorScheme='orange' variant={'ghost'}>
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
                    <Text children={user.CreatedAt.split('T')[0]}/>
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

    const Closehandler=(e)=>{
        e.preventDefault();
        console.log(image)
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
                                        <Button onClick={Closehandler} w={'full'} colorScheme='orange' type='submit'>Close</Button>
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