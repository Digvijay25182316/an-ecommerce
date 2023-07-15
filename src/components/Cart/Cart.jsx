import { Box, Button,  Flex, HStack, Heading, Image,  Tag, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import {AiFillDelete} from "react-icons/ai"
import { Link } from "react-router-dom";

function Cart() {
  // Example data for cart items
  const cartItems = [
    {
      "id": 1,
      "image": "https://example.com/images/bluetooth_speaker.jpg",
      "title": "Premium Portable Bluetooth Speaker",
      "price": 49.99,
      "quantity": 50,
      "description": "Enjoy high-quality sound on the go with our premium portable Bluetooth speaker. With advanced Bluetooth technology, this speaker delivers rich and powerful audio. It's perfect for parties, outdoor adventures, or simply relaxing at home. Get yours today and experience music like never before."
    },
    {
      "id": 2,
      "image": "https://example.com/images/fitness_tracker.jpg",
      "title": "Smart Fitness Tracker",
      "price": 79.99,
      "quantity": 100,
      "description": "Stay motivated and track your progress with our smart fitness tracker. This sleek device monitors your heart rate, counts steps, and tracks your sleep patterns. It also connects to your smartphone to receive notifications and control music playback. Start your fitness journey with our reliable and stylish tracker."
    },
    {
      "id": 3,
      "image": "https://example.com/images/wireless_earbuds.jpg",
      "title": "True Wireless Earbuds",
      "price": 99.99,
      "quantity": 200,
      "description": "Experience true freedom with our wireless earbuds. These earbuds provide exceptional sound quality and a comfortable fit. With the latest Bluetooth technology, they offer a seamless connection to your devices. The charging case ensures extended playtime on the go. Enjoy your favorite music or take calls without any wires holding you back."
    },
    {
      "id": 4,
      "image": "https://example.com/images/digital_camera.jpg",
      "title": "Digital Camera",
      "price": 199.99,
      "quantity": 30,
      "description": "Capture life's precious moments with our high-quality digital camera. With advanced features and a user-friendly interface, this camera allows you to take stunning photos and videos. Whether you're a professional photographer or an enthusiastic beginner, our digital camera is the perfect companion for any occasion."
    },
    {
      "id": 5,
      "image": "https://example.com/images/wireless_headphones.jpg",
      "title": "Wireless Headphones",
      "price": 129.99,
      "quantity": 150,
      "description": "Immerse yourself in music with our wireless headphones. These headphones offer superior sound quality and a comfortable over-ear design. With Bluetooth connectivity and a long battery life, you can enjoy your favorite tunes without any distractions. Say goodbye to tangled wires and hello to an elevated audio experience."
    },
    {
      "id": 6,
      "image": "https://example.com/images/smart_watch.jpg",
      "title": "Smart Watch",
      "price": 149.99,
      "quantity": 80,
      "description": "Stay connected and track your fitness with our smartwatch. This stylish device features a vibrant touchscreen display, fitness tracking capabilities, and smartphone integration. Receive notifications, monitor your heart rate, and track your daily activity with ease. Enhance your lifestyle with our feature-packed smartwatch."
    },
    {
      "id": 7,
      "image": "https://example.com/images/portable_charger.jpg",
      "title": "Portable Charger",
      "price": 39.99,
      "quantity": 250,
      "description": "Never run out of battery again with our portable charger. This compact and lightweight charger provides a high-capacity power bank that can charge your devices multiple times on a single charge. It's perfect for travel, outdoor activities, or emergencies. Stay powered up wherever you go."
    },
    {
      "id": 8,
      "image": "https://example.com/images/wireless_keyboard.jpg",
      "title": "Wireless Keyboard",
      "price": 59.99,
      "quantity": 120,
      "description": "Experience the convenience of a wireless keyboard. Our ergonomic keyboard offers a comfortable typing experience without the hassle of wires. With a reliable wireless connection and long battery life, you can work or play with ease. Enhance your productivity and eliminate clutter on your desk."
    },
    {
      "id": 9,
      "image": "https://example.com/images/virtual_reality_headset.jpg",
      "title": "Virtual Reality Headset",
      "price": 299.99,
      "quantity": 20,
      "description": "Step into a new world of immersive entertainment with our virtual reality headset. Dive into 3D games, virtual tours, or watch movies in a whole new way. With adjustable straps and a comfortable design, our VR headset provides a thrilling and comfortable experience for hours of virtual exploration."
    },
    {
      "id": 10,
      "image": "https://example.com/images/smart_plug.jpg",
      "title": "Smart Plug",
      "price": 24.99,
      "quantity": 300,
      "description": "Control your devices with a simple voice command using our smart plug. This Wi-Fi-enabled plug allows you to turn on or off your appliances remotely using your smartphone or voice assistant. Set schedules, monitor energy usage, and make your home smarter and more efficient."
    },
    {
      "id": 11,
      "image": "https://example.com/images/wireless_mouse.jpg",
      "title": "Wireless Mouse",
      "price": 29.99,
      "quantity": 200,
      "description": "Experience freedom and convenience with our wireless mouse. Say goodbye to tangled cords and enjoy precise tracking and ergonomic design. With a reliable wireless connection, this mouse allows you to work or play with ease. Boost your productivity and make computing effortless."
    }
  ]
  ;
  
const [products,setProduct]  =useState(cartItems)

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const qtytotal = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleDeletecartItem = id => {
    const updatedUsers = products.filter(user => user.id !== id);
    setProduct(updatedUsers);
  };

  return (
    <Box maxWidth="600px" mx="auto" p={4} minHeight={["60vh","80vh"]} my={"30px"} display="flex" flexDirection={"column"} alignItems={"center"} gap={"30px"}>
      <Heading children="Shopping Cart" color={'#4f4c4c'}/>
      {products?products.map((item)=>(
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
            <Image src={item.image} alt={"image"} height="23px" width={"25px"}/>
          </Box>
          <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
            <Text children={item.title} fontSize="lg" fontWeight="semibold"/>
            <Text children= {`$ ${item.price}`} fontSize="lg" fontWeight="bold" color="green.500"/>
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
      )) : (
        <Text>Your cart is empty.</Text>
      )}
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
