import { Box, Button, HStack, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
export const categories = [
  "Electronics",
  "Computers and Accessories",
  "Mobile Phones and Tablets",
  "Home Appliances",
  "Furniture",
  "Home Decor",
  "Kitchen and Dining",
  "Bedding and Bath",
  "Clothing and Apparel",
  "Shoes and Accessories",
  "Beauty and Personal Care",
  "Health and Wellness",
  "Sports and Fitness",
  "Toys and Games",
  "Books and Media",
  "Automotive and Tools",
  "Baby and Maternity",
  "Jewelry and Watches",
  "Bags and Luggage",
  "Pet Supplies",
  "Office and School Supplies",
  "Party and Celebration",
  "Crafts and Hobbies",
  "Outdoor and Gardening",
  "Travel and Luggage"
];
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
