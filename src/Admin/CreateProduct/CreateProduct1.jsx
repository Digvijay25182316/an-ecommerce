import { Box, Button, HStack, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BiSolidDashboard, BiSolidUser } from 'react-icons/bi'
import { BsPlusCircleFill } from 'react-icons/bs'
import { FaCartArrowDown } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ProductTable from './ViewProduct'
import CreateProductForm from './CreateProductForm'

function CreateProduct() {
  const [isViewOn,setIsViewOff] = useState(false)
  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <HStack m={'20px'}>
        <Link to={'/admin/dashboard'}>
          <Button
            variant={'ghost'}
            gap={'2px'}
            boxShadow={
              '0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(107, 70, 193, 0.5)'
            }
            size={'sm'}
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.05)' }}
          >
            <BiSolidDashboard />
            <Text children="Dashboard" />
          </Button>
        </Link>
        <Link to={'/admin/product'}>
          <Button
            variant={'ghost'}
            gap={'2px'}
            boxShadow={
              '0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(107, 70, 193, 0.5)'
            }
            size={'sm'}
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.05)' }}
            color={'purple.400'}
          >
            <BsPlusCircleFill />
            <Text children="Product" />
          </Button>
        </Link>
        <Link to={'/admin/users'}>
          <Button
            variant={'ghost'}
            gap={'2px'}
            boxShadow={
              '0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(107, 70, 193, 0.5)'
            }
            size={'sm'}
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.05)' }}
          >
            <BiSolidUser />
            <Text children="Users" />
          </Button>
        </Link>
        <Link to={'/admin/orders'}>
          <Button
            variant={'ghost'}
            gap={'2px'}
            size={'sm'}
            boxShadow={
              '0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(107, 70, 193, 0.5)'
            }
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.05)' }}
          >
            <FaCartArrowDown />
            <Text children="Orders" />
          </Button>
        </Link>
      </HStack>
      <Box display={'flex'} flexDirection={'column'} m={'20px'}>
        <Box margin={'23px'}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Button variant={"unstyled"} onClick={()=>setIsViewOff(!isViewOn)}>
          <Text fontWeight={'bold'} fontSize={'34px'} bg={!isViewOn&&"purple.400"} rounded={"lg"} p={"2px 5px"}>Create</Text>
          </Button>
          <Button variant={"unstyled"} onClick={()=>setIsViewOff(!isViewOn)}>
          <Text fontWeight={'bold'} fontSize={'34px'} bg={isViewOn&&"purple.400"} rounded={"lg"} p={"2px 5px"}>View</Text>
          </Button>
          </Box>
        </Box>
        {!isViewOn&&(<Stack
          width={'90vw'}
          textAlign={'center'}
        >
         <CreateProductForm/> 
        </Stack>)}
        {isViewOn&&(<Stack
          width={'90vw'}
          textAlign={'center'}
        >
          <ProductTable/>
        </Stack>)}
      </Box>
    </Box>
  )
}

export default CreateProduct