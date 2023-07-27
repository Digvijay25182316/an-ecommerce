import { Box, Button, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import React, {Suspense, useContext, useEffect, useState } from 'react'
import { RxCross1 } from 'react-icons/rx';
import Sidebar from './Sidebar';
import Categories from './Categories';
import axios from 'axios';
import { SERVER_URL } from '../../App';
import { CartContext } from '../../context/store';
import CookieFields from '../../context/utils';
const  ProductGrid =React.lazy(()=>import('./ProductGrid'));

const getProducts = async (query) => {
  const data = await axios.get(`${SERVER_URL}/products`,{
    params:query
  })
  return data;
};

function Home() {
  const {ErrorHandler,query}=useContext(CartContext)
  const ProductsArr=CookieFields.ProductsArrFromLocalStorage()
  const [sidebarOpen,setSideBarOpen] =useState(false)
  const [products,setProducts]=useState(ProductsArr?ProductsArr:[])

  useEffect(() => {
    getProducts(query).then(({ data }) => {
      CookieFields.ProductsArrInLocalStorage(data.products)
      setProducts(data.products);
    }).catch(err=>ErrorHandler(err));
  },[query]);
  
  return (
    <section>
      <Stack minHeight={"100vh"}>
      <VStack alignItems={"center"} justifyContent={"center"}>
      <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} alignItems={"center"}>
      <Categories/>

<Button variant={"outline"} borderColor={"yellow.400"} my={"3"} _hover={{ backgroundColor: "yellow.400"}} onClick={()=>setSideBarOpen(!sidebarOpen)} size={"sm"}>Click Here For Search Filters</Button>
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
    <Suspense fallback={<VStack alignItems={"center"} justifyContent={"center"}><Text children="Loading Products..."/></VStack>}>
      {<ProductGrid products={products}/>}
      </Suspense>
    
    </HStack>
    </Stack>
    </section>
  )
}

export default Home