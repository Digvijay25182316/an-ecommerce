import React, { useContext, useState } from 'react'
import { Avatar, Box, Button, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, VStack, useDisclosure } from '@chakra-ui/react'
import {RxHamburgerMenu}  from "react-icons/rx"
import {BsCart2,BsCartCheckFill}  from "react-icons/bs"
import {AiOutlineSearch}  from "react-icons/ai"
import {ColorModeSwitcher} from "../../ColorModeSwitcher"
import { Link, useLocation} from 'react-router-dom'
import OverlayMenu from './OverlayMenu'
import {FcSettings} from "react-icons/fc"
import { CartContext } from '../../context/store'
import Cookies from 'js-cookie'
import axios from 'axios'
import { SERVER_URL } from '../../App'
import { toast } from 'react-hot-toast'
  const logoutfunc=async()=>{
    const response = await axios.get(`${SERVER_URL}/logout`)
    return response
  }
function Header() {  
  
  const {user,isAuthenticated,isAdmin,loggedout}=useContext(CartContext)
  const location = useLocation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isSearch,setIsSearch] = useState(false)
  const onClickSearch =()=>{
    setIsSearch(!isSearch)
  }
  const logoutHandler=()=>{
    Cookies.remove("user")
    Cookies.remove("token")
    logoutfunc().then(data=>{toast.success(data.data.message);loggedout()}).catch(err=>toast.error(err.response.message))
  }
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <Stack flexDirection={'row'} alignItems={"center"} justifyContent={"center"}>
      <VStack>        
        <Link to={"/"}>
        <Text children={"Ecommerce"} textColor={"brown"} fontFamily={"cursive"} fontSize={"2xl"} padding={"2.5"} fontWeight={"bold"}/>
        </Link>
        <HStack boxShadow={isAdminRoute?"0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(107, 70, 193, 0.5)":"lg"} width={["90vw","80vw"]} justifyContent={"space-between"} px={"5"} alignItems={"center"}>
        <Box alignItems={"center"}>
          <Button mt={3} onClick={onOpen} variant={"unstyled"} style={{paddingBottom:'8px'}}>
          <RxHamburgerMenu fontSize={"23px"}/>   
          </Button>
          <Button color={"yellow.400"} onClick={onClickSearch} variant={"unstyled"}>
          <AiOutlineSearch fontSize={"23px"}/>     
          </Button>
          </Box>
          <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg={"yellow.400"} textAlign={"center"}>Hi! {user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody >
            <Stack height={"60vh"}>
            <OverlayMenu onClose={onClose} isAdmin={isAdmin}/>
            </Stack>
          </ModalBody>
          <ModalFooter display={"flex"} alignItems={"center"} flexDirection={"column"}>
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={"20px"}>
            <Box display={"flex"} gap={"23px"}>
          {!isAuthenticated?(
              <Link to={"/login"}>
                <Button variant={"solid"} colorScheme='yellow' onClick={onClose}>
                  <Text children={"LOGIN"}/>            
                </Button>
              </Link>
            ):(
              <Link to={"/myprofile"}>
            <Button variant={"solid"} onClick={onClose} colorScheme="yellow" gap={"10px"}>
              <Avatar size={"sm"}/>
            <Text children={"Profile"}/>
            </Button>             
            </Link>
            )
            }  
            <Stack>
              
              <Button gap={"10px"} colorScheme='yellow'>
              <FcSettings fontSize={"30px"}/>
                <Text children="Settings"/>
              </Button>
        
            </Stack>
            </Box>
            {isAuthenticated&&<Box>
              <Button colorScheme='yellow' onClick={logoutHandler}>
                <Text children="LOGOUT"/>
              </Button>
            </Box>}
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
        <Box display={"flex"} alignItems={"center"} gap={"5px"}>
            {!isAuthenticated?(
              <Link to={"/login"}>
                <Button variant={"solid"} colorScheme='yellow' onClick={onClose}>
                  <Text children={"LOGIN"}/>            
                </Button>
              </Link>
            ):(
              <Link to={"/myprofile"}>
            <Button variant={"ghost"}>
            <Avatar size={"sm"}/>
            </Button>             
            </Link>
            )
            }    
            <Link to="/cart">
            <Button variant={"ghost"}>
            {location.pathname !=="/cart"?<BsCart2 fontSize={"23px"}/>:<BsCartCheckFill fontSize={"23px"}/>}
            </Button>
            </Link>
           <ColorModeSwitcher/>
           </Box>
        </HStack>
        {isSearch&&<Box display={"flex"} position={"absolute"} border={"0.2px solid yellow"} rounded={"lg"} top={"20vh"} bg={"background"} zIndex={"1000"} width={"70%"} alignItems={"center"} boxShadow={"xl"}>
            <Input placeholder='Search . . .' border={"none"} focusBorderColor='none'/>
            <Button color={"yellow.400"} onClick={onClickSearch} variant={"unstyled"}>
          <AiOutlineSearch fontSize={"23px"}/>     
          </Button>
          </Box>}
      </VStack>        
    </Stack>
  )
}

export default Header