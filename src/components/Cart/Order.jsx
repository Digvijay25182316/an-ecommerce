import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { Link } from 'react-router-dom';

function OrderPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    if (!name || !email || !address) {
      setError('Please fill in all fields.');
      return;
    }

    // Clear error message
    setError('');

    // Perform order submission logic
    // ...
  };

  return (
    <Box maxWidth="600px" mx="auto" p={4} minHeight={"80vh"}>
        <Heading children="Place Order" color={'#4f4c4c'} textAlign={"center"} my={"30px"}/>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Shipping Address</FormLabel>
          <Input placeholder="123 Main St" focusBorderColor='yellow.400'/>
        </FormControl>
        <FormControl>
          <FormLabel>City</FormLabel>
          <Input placeholder="New York" focusBorderColor='yellow.400'/>
        </FormControl>
        <FormControl>
          <FormLabel>Postal Code</FormLabel>
          <Input placeholder="12345" focusBorderColor='yellow.400'/>
        </FormControl>
        <Link to="/confirmorder">
        <Button colorScheme="yellow" size="lg" mt={4}>
          Place Order
        </Button>
        </Link>
      </Stack>
    </Box>
  );
}

export default OrderPage;
