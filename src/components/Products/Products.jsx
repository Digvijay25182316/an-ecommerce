import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import {useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const ProductPage = () => {
  const [product,setProduct] =useState({})
  const {id} =useParams()
  useEffect(()=>{
    fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res=>res.json())
            .then(json=>{setProduct(json)}).catch(err=>console.error(err))
  },[id])

  if(product){
  return (
    <Box maxW={"90vw"} p={8} gap={["10px","20px"]} display={"flex"} flexDirection={"column"} alignItems={"center"} key={id}>
    <Flex align="center"direction={["column","row"]}>
      <Box>
      <Image src={product.image} alt="Product" borderRadius="md" w={[300,400]}/>
      </Box>
      <Box ml={8} display={"flex"} gap={["10px","50px"]} flexDirection={["column","row"]} alignItems={"center"}>
        <Box maxW={"200px"}>
        <Heading fontSize="3xl" fontWeight="bold">{product.title}</Heading>
        <Text fontSize="2xl" fontWeight="bold" mt={4} color={"green.500"}>$ {product.price}</Text>
        </Box>
        <Box display={"flex"} flexDirection={"column"} ml={[0,"50px"]}>
        <Button colorScheme="gray" mt={4} size="lg">Add to Cart</Button>
        <Button colorScheme="yellow" mt={4} size="lg">Buy Now</Button>
        </Box>
      </Box>
    </Flex>
    <Box mt={"10px"} textAlign={"center"}>
    <Text fontSize="lg" fontWeight={"bold"} colorScheme="brand">Product Details:</Text>
    <Text fontSize="md" mt={2} maxHeight={'100px'} fontWeight={"medium"} color="gray.600"overflow={"scroll"} css={{"&::-webkit-scrollbar":{
      display:"none"
    }}}>{product.description}</Text>
    </Box>
  </Box>
  );
  }else{
    return(
    <Box>
      <Text children="No Product To Show Here"/>
    </Box>)
  }
  
};

export default ProductPage;
