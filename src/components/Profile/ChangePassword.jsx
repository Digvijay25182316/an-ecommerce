import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

function ChangePassword() {
    const [oldPassword,setOldPassword] = useState()
    const [newPassword,setNewPassword] = useState()
  return (
    <Container py={'16'} minH={'95vh'}>
        <form>
            <VStack spacing={'8'}>
            <Heading textTransform={'uppercase'} children="Change Password" my={'16'} textAlign={['center','left']}/>
            <Input required value={oldPassword} onChange={e=>setOldPassword(e.target.value)} placeholder='Enter your old password' type='password' focusBorderColor='coral'/>
            <Input required value={newPassword} onChange={e=>setNewPassword(e.target.value)} placeholder='Enter your new password' type='password' focusBorderColor='coral'/>
            <Button w={'full'} colorScheme='orange' type='submit'>Change </Button>
            </VStack>
        </form>
    </Container>
  )
}

export default ChangePassword