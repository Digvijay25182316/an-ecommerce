import { Box, Button, HStack, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/store';
export const categories = [
  "Solapur Chadar",
  "Solapur Satranji",
  "Galicha",
  "Turkish Towel",
  "Pancha Towel",
  "Baithak Patti",
  "Napkin",
  "Bedsheet Blanket",
  "Handmade Purse",
  "Travel Bags",
  "Freeze Cover"
]
function Categories() {
  const {storeQuery}=useContext(CartContext)
    const [category,setCategory] =useState(categories)

    const handleClickCategory =(item)=>{
       // Pass the selected category as an object with the 'keyword' property
      const queryString = {
        keyword: item,
      };

      storeQuery(queryString); // Update the query state and append to the URL
    }
  return (
    <Box maxWidth={"90vw"} borderBottom={"0.5px solid #e4e2e2"} mt={"2"}>
        <HStack overflowX={"scroll"} paddingY={"2"} css={{"&::-webkit-scrollbar":{
  display:"none"
}}} gap={"1"}>
  {
  category&&category.map((item,index)=>
  <Button key={index} onClick={()=>handleClickCategory(item)} minW={"fit-content"} size={"sm"} variant={"ghost"}>
    <Text children={item} borderBottom={"1px"} color={"purple.500"}/>
  </Button>
  )}
</HStack>
</Box>
    
  )
}

export default Categories
