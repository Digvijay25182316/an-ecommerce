import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { SERVER_URL } from '../../App'
import { useNavigate, useParams } from 'react-router-dom'
import { CartContext } from '../../context/store'

const resetPassword=async(token,password)=>{
  const data = await axios.put(`${SERVER_URL}/resetpassword/${token}`,{password},{
    withCredentials:true
  })
  return data
}

function ResetPassword() {
  const {loadingHandler,successHandler,ErrorHandler}=useContext(CartContext)
  const navigate=useNavigate()
  const {token }=useParams()
    const [password,setPassword] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const submitHandler=(e)=>{
      e.preventDefault()
      if(password!==newPassword){
        toast.error("\"password and new Password\" Fields are not matching")
      }else{
        loadingHandler(true)
        resetPassword(token,password).then(data=>{
          successHandler(data.data)
          navigate("/")
        }).catch(err=>ErrorHandler(err))
      }
    }
  return (
    <Container h={'95vh'}>
        <VStack h={"full"} justifyContent={'center'} spacing={'16'}>
            <Heading children="Reset Password"/>
            <form style={{width:"100%"}} onSubmit={submitHandler}>
                <Box my={"4"}>
                <FormLabel htmlFor='password' children="new password"/>
                <Input required id='password' value={password} onChange={e=>setPassword(e.target.value)}
                focusBorderColor='yellow.400'
                placeholder="new Password"
                type='password'
                />
                </Box>
                <Box my={"4"}>

                <FormLabel htmlFor='password' children="re-enter password"/>
                <Input required id='#password' value={newPassword} onChange={e=>setNewPassword(e.target.value)} placeholder='Re enter your password' type='password' focusBorderColor='yellow.400'/>
                </Box>
                <Button my={'4'} colorScheme='yellow' type='submit'>Reset Password</Button>
                
            </form>
        </VStack>
    </Container>
  )
}

export default ResetPassword