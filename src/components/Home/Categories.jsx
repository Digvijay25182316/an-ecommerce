import { Box, Button, HStack, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
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
    const [category,setCategory] =useState(categories)
  return (
    <Box maxWidth={"90vw"} borderBottom={"0.5px solid #e4e2e2"} mt={"4"}>
        <HStack overflowX={"scroll"} paddingY={"2"} css={{"&::-webkit-scrollbar":{
  display:"none"
}}}>
  {
  category&&category.map((item,index)=>
  <Button key={index} onClick={()=>setCategory(item)} minW={"fit-content"} size={"sm"}>
    <Text children={item}/>
  </Button>
  )}
</HStack>
</Box>
    
  )
}

export default Categories
