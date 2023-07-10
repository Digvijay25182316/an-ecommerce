import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { SERVER_URL } from '../../App'
import { CartContext } from '../../context/store';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

const ENCRYPTION_KEY = "364653a4df41c97226029c7f516ff88b"

const loginuser = async(email,password)=>{
    const data = await axios.post(`${SERVER_URL}/login`,{email,password},{
        withCredentials:true
    })
    return data
}

function LoginPage() {
    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const {storeUser} = useContext(CartContext)
    const handleLogin=(event)=>{
        event.preventDefault()
        loginuser(email,password).then(({data})=>{
            Cookies.set('token', data.token, { expires: 7 }); // Expires in 7 days
            Cookies.set('user',JSON.stringify(data.user), { expires: 7 }); // Expires in 7 days
            toast.success(data.message)
            storeUser(data.user)
            navigate("/")
        }
        ).catch(err=>toast.error(err.response.data.message||err.message))
    }       
  return (
    <Container h={'95vh'}>
        <VStack h={"full"} justifyContent={'center'} spacing={'16'}>
            <Heading children="Login"/>
            <form style={{width:"100%"}} onSubmit={handleLogin}>
                <Box my={"4"}>
                    
                <FormLabel htmlFor='email' children="email Address"/>
                <Input required id='email' value={email} onChange={e=>setEmail(e.target.value)}
                focusBorderColor='yellow.400'
                placeholder='abc@gmail.com'
                type='email'
                autoComplete='on'
                />
                </Box>
                <Box my={"4"}>

                <FormLabel htmlFor='password' children="password"/>
                <Input required id='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='Enter your password' type='password' focusBorderColor='yellow.400' autoComplete='on'/>
                </Box>
                <Box>
                    <Link to={'/forgetpassword'}><Button fontSize={'sm'} variant={'link'}>Forget Password</Button></Link>
                </Box>
                <Button my={'4'} colorScheme='yellow' type='submit'>Login</Button>
                
                <Box my={'4'}>
                    New User?<Link to={'/register'} ><Button colorScheme={'yellow'} variant={'link'}> Sign Up</Button>{" "}here</Link>
                </Box>
            </form>
        </VStack>
    </Container>
  )
}

export default LoginPage