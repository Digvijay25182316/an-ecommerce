import { Box, Button,  Flex, HStack, Heading, Image,  Tag, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {AiFillDelete} from "react-icons/ai"
import { Link } from "react-router-dom";
import CookieFields from "../../context/utils";

function Cart() {
  // Example data for cart items
  const cartItem = [
    {
      "id": 1,
      "poster": "https://example.com/images/bluetooth_speaker.jpg",
      "name": "Premium Portable Bluetooth Speaker",
      "price": 49.99,
      "quantity": 50
    },
    {
      "id": 2,
      "poster": "https://example.com/images/fitness_tracker.jpg",
      "name": "Smart Fitness Tracker",
      "price": 79.99,
      "quantity": 100
    },
    {
      "id": 3,
      "poster": "https://example.com/images/wireless_earbuds.jpg",
      "name": "True Wireless Earbuds",
      "price": 99.99,
      "quantity": 200
    },
    {
      "id": 4,
      "poster": "https://example.com/images/digital_camera.jpg",
      "name": "Digital Camera",
      "price": 199.99,
      "quantity": 30
    },
    {
      "id": 5,
      "poster": "https://example.com/images/wireless_headphones.jpg",
      "name": "Wireless Headphones",
      "price": 129.99,
      "quantity": 150
    },
    {
      "id": 6,
      "poster": "https://example.com/images/smart_watch.jpg",
      "name": "Smart Watch",
      "price": 149.99,
      "quantity": 80
    },
    {
      "id": 7,
      "poster": "https://example.com/images/portable_charger.jpg",
      "name": "Portable Charger",
      "price": 39.99,
      "quantity": 250
    },
    {
      "id": 8,
      "poster": "https://example.com/images/wireless_keyboard.jpg",
      "name": "Wireless Keyboard",
      "price": 59.99,
      "quantity": 120
    },
    {
      "id": 9,
      "poster": "https://example.com/images/virtual_reality_headset.jpg",
      "name": "Virtual Reality Headset",
      "price": 299.99,
      "quantity": 20
    },
    {
      "id": 10,
      "poster": "https://example.com/images/smart_plug.jpg",
      "name": "Smart Plug",
      "price": 24.99,
      "quantity": 300
    },
    {
      "id": 11,
      "poster": "https://example.com/images/wireless_mouse.jpg",
      "name": "Wireless Mouse",
      "price": 29.99,
      "quantity": 200
    }
  ]
  ;
  
    const [products,setProduct]  =useState([])
    useEffect(() => {
      const cartItems = CookieFields.getCartItem();
      if (cartItems) {
        setProduct(cartItems);
      }
    }, []);

  const subtotal = products.reduce((total, item) => total + item.price * item.quantity, 0);
  const qtytotal = products.reduce((total, item) => total + item.quantity, 0);

  const handleDeletecartItem = id => {
    const updatedUsers = products.filter(user => user.id !== id);
    setProduct(updatedUsers);
  };

  return (
    <Box maxWidth="600px" mx="auto" p={4} minHeight={["60vh","80vh"]} my={"30px"} display="flex" flexDirection={"column"} alignItems={"center"} gap={"30px"}>
      <Heading children="Shopping Cart" color={'#4f4c4c'}/>
      {products&&products.map((item)=>(
        <VStack key={item.id}>
          <HStack
          w={["90vw","70vw"]} // Adjust the width as per your preference
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="md"
          justifyContent={"space-between"}
          px={["5px",'20px']}
          py={"10px"}
          transition="transform 0.2s"
          _hover={{ transform: 'scale(1.05)' }}
          cursor={"pointer"}
          >
            <HStack gap={["20px","100px"]}>
          <Box>
            <Image src={item.poster} alt={"poster"} height="90px" objectFit={"contain"}/>
          </Box>
          <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
            <Text children={item.name} fontSize="lg" fontWeight="semibold"/>
            <Text children={`$ ${item.price}`} fontSize="lg" fontWeight="bold" color="green.500"/>
          </Box>
          </HStack>
          <HStack gap={["10px","100px"]} justifyContent={"center"}>
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Text children="Qty"  color="gray.500"/>
            <Box display={"flex"} alignItems={"center"} gap={"2px"}>
            <Text children={item.quantity} color={"green.800"} fontSize={"20px"} fontWeight={"bold"}/>
            </Box>
          </Box>
          <Box>
          <Button onClick={()=>handleDeletecartItem(item.id)}>
          <AiFillDelete color="Red" fontSize={"23px"}/>
          </Button>
          </Box>
          </HStack>
          </HStack>
        </VStack>
      ))}
      <Box width={["90vw","60vw"]} boxShadow={"lg"} border={"0.2px solid lightgray"} rounded={"lg"} display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Text children="Go To Checkout" textAlign={"center"} mb={"10px"} fontWeight={"bold"} bg={"yellow.400"} p={"10px"} width={"full"} rounded={"lg"}/>
        <Box display={"flex"} flexDirection={["column","row"]} gap={"30px"} alignItems={["left","center"]} py={["20px",'40px']} justifyContent={["center","space-evenly"]}>
        <Flex>
          <Tag children="Total Price : " color={'yellow.400'} fontSize={"xl"} mx={"20px"}/>
      <Text children={`$ ${subtotal}`} fontSize="lg" fontWeight="bold" color="green.500"/>
      </Flex>
        <Flex>
          <Tag children="Total Items : " color={'yellow.400'} fontSize={"xl"} mx={"20px"}/>
      <Text children={`${qtytotal}`} fontSize="lg" fontWeight="bold" color="green.500"/>
      </Flex>
      </Box>
      <Link to={"/order"}>
      <Button colorScheme="yellow" my={"23px"} >Confirm</Button>
      </Link>
      </Box>
    </Box>
  );
}

export default Cart;
