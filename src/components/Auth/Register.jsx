import { Avatar, Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SERVER_URL } from '../../App'
import { toast } from 'react-hot-toast'
import Cookies from 'js-cookie'
import { CartContext } from '../../context/store'
export const fileuploadStyle={
        cursor:"pointer",
        marginLeft:"-5%",
        width:'110%',
        height:"100%",
        border:"none",
        color:"yellow",
        backgroundColor:"white",
}
    const registerUser = async (formData) => {
        const data = await axios.post(`${SERVER_URL}/register`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials:true
        });
        return data;
    }
function Register() {
    const navigate =useNavigate()
    const {storeUser} = useContext(CartContext)
    const [name,setName] = useState("")
    const [imagePrev,setImagePrev] = useState('')
    const [file,setFile] = useState('')
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmpassword,setConfirmpassword] = useState("")

    const formdata=new FormData()
    formdata.append('name',name)
    formdata.append('email',email)
    formdata.append('password',password)
    formdata.append('file',file)
    const changeImageHandler=(e)=>{
        const file=e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            setImagePrev(reader.result)
            setFile(file)
        }
    }
    const handleRegister =(e)=>{
        e.preventDefault()      
        if(password!==confirmpassword) {
            toast.error(
                "\"Confirm password and password\" fields does not match",
                {
                  duration: 3000,
                }
              );
        }else{
            
        registerUser(formdata).then((data)=>{
            toast.success(data.data.message)
            Cookies.set('token', data.data.token, { expires: 7 }); // Expires in 7 days
            Cookies.set('user',JSON.stringify(data.data.user), { expires: 7 }); // Expires in 7 days
            storeUser(data.data)
            navigate("/")
        }).catch((err)=>toast.error(err.response.data.message))}
    }
  return (
    <Container h={'100%'} my={"20px"}>
        <VStack h={"full"} justifyContent={'center'} spacing={'16'}>
            <Heading children="Registeration"/>
            <form style={{width:"100%"}} onSubmit={handleRegister}>
                <Box my={'4'} display={'flex'} justifyContent={'center'}>
                    <Avatar size={'2xl'} display={'flex'} justifyContent={'center'} src={imagePrev}/>
                </Box>
                <Box my={"4"}>
                    
                <FormLabel htmlFor='name' children="Name"/>
                <Input required id='name' value={name} onChange={e=>setName(e.target.value)}
                focusBorderColor='yellow.400'
                placeholder='Enter your name'
                type='text'
                />
                </Box>
                <Box my={"4"}>
                    
                <FormLabel htmlFor='email' children="email Address"/>
                <Input required id='email' value={email} onChange={e=>setEmail(e.target.value)}
                focusBorderColor='yellow.400'
                placeholder='abc@gmail.com'
                type='email'
                />
                </Box>
                <Box my={"4"}>

                <FormLabel htmlFor='password' children="password"/>
                <Input required id='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='Enter your password' type='password' focusBorderColor='yellow.400'/>
                </Box>
                <Box>
                <FormLabel htmlFor='confirm password' children="Confirm Password"/>
                <Input required id='#password' value={confirmpassword} onChange={e=>setConfirmpassword(e.target.value)} placeholder='Confirm Password' type='password' focusBorderColor='yellow.400'/>
                </Box>
                <Box my={"4"}>

                <FormLabel htmlFor='chooseAvtar' children="chooseAvatar"/>
                <Input accept={"image/*"} required id='chooseAvatar' onChange={changeImageHandler} type='file' focusBorderColor='yellow.400' css={{"&::file-selector-button":fileuploadStyle}}/>
                </Box>
                <Button my={'4'} colorScheme='yellow' type='submit'>Register</Button>
                <Box my={'4'}>
                    Alredy Signed Up?<Link to={'/login'} ><Button colorScheme={'yellow'} variant={'link'}> Login</Button>{" "}here</Link>
                </Box>
            </form>
        </VStack>
    </Container>
  )
}

export default Register