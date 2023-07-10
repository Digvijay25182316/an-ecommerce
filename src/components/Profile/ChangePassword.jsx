import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { SERVER_URL } from '../../App'
import { toast } from 'react-hot-toast'
import Cookies from 'js-cookie'

const changePassword=async(oldPassword,newPassword,token)=>{
  const data = await axios.put(`${SERVER_URL}/changepassword`,{oldPassword,newPassword},{headers:{
    Authorization: `Bearer <${token}>`
  }})
  return data
}
const getToken=()=>{
  const token=Cookies.get("token")
  return token
}

function ChangePassword() {
  
    const [oldPassword,setOldPassword] = useState()
    const [newPassword,setNewPassword] = useState()
    const submitHandler=(e)=>{
      e.preventDefault()
      const token =getToken()
      if(token){
      changePassword(oldPassword,newPassword,token).then(data=>toast.success(data.data.message)).catch(err=>toast.error(err.response.data.message||err.message))}
    }
    
  return (
    <Container py={'16'} minH={'95vh'}>
        <form onSubmit={submitHandler}>
            <VStack spacing={'8'}>
            <Heading textTransform={'uppercase'} children="Change Password" my={'16'} textAlign={['center','left']}/>
            <Input required value={oldPassword} onChange={e=>setOldPassword(e.target.value)} placeholder='Enter your old password' type='password' focusBorderColor='yellow.400'/>
            <Input required value={newPassword} onChange={e=>setNewPassword(e.target.value)} placeholder='Enter your new password' type='password' focusBorderColor='yellow.400'/>
            <Button w={'full'} colorScheme='yellow' type='submit'>Change </Button>
            </VStack>
        </form>
    </Container>
  )
}

export default ChangePassword