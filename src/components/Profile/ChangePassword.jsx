import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { SERVER_URL } from '../../App'
import CookieFields from '../../context/utils'
import { CartContext } from '../../context/store'

const changePassword=async(oldPassword,newPassword,token)=>{
  const data = await axios.put(`${SERVER_URL}/changepassword`,{oldPassword,newPassword},{headers:{
    Authorization: `Bearer <${token}>`
  },withCredentials:true})
  return data
}

function ChangePassword() {
  const {loadingHandler,successHandler,ErrorHandler}  =useContext(CartContext)
    const [oldPassword,setOldPassword] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const submitHandler=(e)=>{
      e.preventDefault()
      const token =CookieFields.getToken()
      if(token){
        loadingHandler(true)
      changePassword(oldPassword,newPassword,token).then(data=>{successHandler(data.data)}).catch(err=>ErrorHandler(err))}
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