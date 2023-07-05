import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

function ResetPassword() {
    const [password,setPassword] = useState("")
    const [newPassword,setNewPassword] = useState("")
  return (
    <Container h={'95vh'}>
        <VStack h={"full"} justifyContent={'center'} spacing={'16'}>
            <Heading children="Login"/>
            <form style={{width:"100%"}}>
                <Box my={"4"}>
                    
                <FormLabel htmlFor='password' children="new password"/>
                <Input required id='password' value={password} onChange={e=>setPassword(e.target.value)}
                focusBorderColor='coral'
                placeholder="new Password"
                type='password'
                />
                </Box>
                <Box my={"4"}>

                <FormLabel htmlFor='password' children="re-enter password"/>
                <Input required id='password' value={newPassword} onChange={e=>setNewPassword(e.target.value)} placeholder='Re enter your password' type='password' focusBorderColor='coral'/>
                </Box>
                <Button my={'4'} colorScheme='orange' type='submit'>Login</Button>
                
            </form>
        </VStack>
    </Container>
  )
}

export default ResetPassword