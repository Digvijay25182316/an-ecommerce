import { Box, Button, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import React, {useEffect, useState } from 'react'
import { RxCross1 } from 'react-icons/rx';
import Sidebar from './Sidebar';
import ProductGrid from './ProductGrid';
import Categories from './Categories';


function Home() {
  const [sidebarOpen,setSideBarOpen] =useState(false)
  const [products,setProducts] = useState("")

  useEffect(()=>{
      fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>setProducts(json))
  },[])
  
  return (
    <section>
      <Stack minHeight={"100vh"}>
      <VStack alignItems={"center"} justifyContent={"center"}>
      <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} alignItems={"center"}>
      <Categories/>

<Button variant={"outline"} border={"0.2px solid yellow"} my={"3"} _hover={{ backgroundColor: "yellow.400"}} onClick={()=>setSideBarOpen(!sidebarOpen)}>Filters</Button>
      </Box>
</VStack>
<HStack>
  {sidebarOpen&&<Box width={["80vw","20vw"]} height={"100vh"} alignSelf={"flex-start"} position={"absolute"} boxShadow={"lg"} rounded={"lg"} ml={"20px"}>
    <Box display={"flex"} justifyContent={"space-between"} bg={"yellow.400"} alignItems={"center"} borderRadius={"10px 10px 0 0"}>
    <Text children="Filter" width={"full"} p={"5"} fontWeight={"bold"} fontFamily={"sans-serif"}/>
      <Button onClick={()=>setSideBarOpen(!sidebarOpen)} variant={"unstyled"} colorScheme='orange' color={"black"} >
    <RxCross1 fontSize={"sm"}/>
    </Button>
    </Box>
          <Sidebar/>
    </Box>}
    
      <ProductGrid products={products} productsPerPage={30}/>
    
    </HStack>
    </Stack>
    </section>
  )
}

export default Home