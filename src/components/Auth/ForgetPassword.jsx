import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading } from '@chakra-ui/react';

function ForgetPassword() {
    const [email,setEmail] =useState("")
  const handleSubmit = (event) => {
    event.preventDefault();
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
