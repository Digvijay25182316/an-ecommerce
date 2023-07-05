import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

function UpdateProfile() {
    const [name,setName] = useState()
    const [email,setEmail] = useState()
  return (
    <Container py={'16'} minH={'95vh'}>
        <form>
            <VStack spacing={'8'}>
            <Heading textTransform={'uppercase'} children="Update Profile" my={'16'} textAlign={['center','left']}/>
            <Input required value={name} onChange={e=>setName(e.target.value)} placeholder='name' type='text' focusBorderColor='yellow.400'/>
            <Input required value={email} onChange={e=>setEmail(e.target.value)} placeholder='email' type='text' focusBorderColor='yellow.400'/>
            
            <Button w={'full'} colorScheme='yellow' type='submit'>Update </Button>
            </VStack>
        </form>
    </Container>
  )
}

export default UpdateProfile