import React, { useContext, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading } from '@chakra-ui/react';
import { CartContext } from '../../context/store';
import axios from 'axios';
import { SERVER_URL } from '../../App';

const forgetPassword=async(email,token)=>{
  const response=await axios.post(`${SERVER_URL}/forgetpassword`,{email},{headers:{
    Authorization:`Bearer <${token}>`
  }})
  return response
}

function ForgetPassword() {
  const {token}=useContext(CartContext)
    const [email,setEmail] =useState("")
  const handleSubmit = (event) => {
    event.preventDefault();
    if(token){
      forgetPassword(email,token).then((data)=>console.log(data))
      
    }
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
          <Input type="email" placeholder="Enter your email" focusBorderColor={"coral"} value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </FormControl>
        <Button mt="4" colorScheme="orange" type="submit">
          Reset Password
        </Button>
      </form>
    </Box>
  );
}

export default ForgetPassword;
