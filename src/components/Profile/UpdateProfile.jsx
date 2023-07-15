import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { SERVER_URL } from '../../App'
import CookieFields from '../../context/utils'
import { CartContext } from '../../context/store'
import Cookies from 'js-cookie'
const changeDetails=async(name,email,token)=>{
  const data = await axios.put(`${SERVER_URL}/updateprofile`,{name,email},{
    headers:{
      "Content-Type":"application/json",
      Authorization: `Bearer <${token}>`
    },
    withCredentials:true
  })
  return data
}
function UpdateProfile() {
const {loadingHandler,successHandler,ErrorHandler,storeUser}=useContext(CartContext)
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const submitHandler=(e)=>{

      e.preventDefault()
      const token = CookieFields.getToken()

      if(token){
        loadingHandler(true)
      changeDetails(name,email,token).then(data=>{
        Cookies.remove("user")
        successHandler(data.data)
        CookieFields.userInCookie(data.data.user)
        storeUser(data.data.user)
        
      }).catch(err=>ErrorHandler(err))}
    }
  return (
    <Container py={'16'} minH={'95vh'}>
        <form onSubmit={submitHandler}>
            <VStack spacing={'8'}>
            <Heading textTransform={'uppercase'} children="Update Profile Details" my={'16'} textAlign={['center','left']}/>
            <Input required value={name} onChange={e=>setName(e.target.value)} placeholder='name' type='text' focusBorderColor='yellow.400'/>
            <Input required value={email} onChange={e=>setEmail(e.target.value)} placeholder='email' type='text' focusBorderColor='yellow.400'/>
            
            <Button w={'full'} colorScheme='yellow' type='submit'>Update </Button>
            </VStack>
        </form>
    </Container>
  )
}

export default UpdateProfile