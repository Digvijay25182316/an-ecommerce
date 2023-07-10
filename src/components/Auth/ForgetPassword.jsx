import React, {useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading } from '@chakra-ui/react'
import axios from 'axios';
import { SERVER_URL } from '../../App';
import { toast } from 'react-hot-toast';

const forgetPassword = async(email)=>{
  const data = await axios.post(`${SERVER_URL}/forgetpassword`,{email},{
      withCredentials:true
  })
  return data
}

function ForgetPassword() {
  
    const [email,setEmail] =useState("")
  const handleSubmit = (event) => {
    event.preventDefault();
      forgetPassword(email).then((data)=>toast.success(data.data.message)).catch(err=>{toast.error(err.response.data.message)})
    // Perform password reset logic here
  };

  return (
    <Box width={'90vw'} mx="auto" mt="20px" height={["80vh","65vh"]} my={"40px"}>
      <Heading size="lg" mb="10" textAlign={"center"}>
        Forgot Password
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input type="email" placeholder="Enter your email" focusBorderColor={"yellow.400"} value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </FormControl>
        <Button mt="4" colorScheme="yellow" type="submit">
          Reset Password
        </Button>
      </form>
    </Box>
  );
}

export default ForgetPassword;
