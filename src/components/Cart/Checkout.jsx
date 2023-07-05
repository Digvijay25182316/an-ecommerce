import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack} from "@chakra-ui/react";

function Checkout() {
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
    <Box maxWidth="600px" mx="auto" p={4}>
        <Heading children="Place Order" color={'#4f4c4c'} textAlign={"center"} my={"30px"}/>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Full Name</FormLabel>
          <Input placeholder="John Doe" />
        </FormControl>
        <FormControl>
          <FormLabel>Email Address</FormLabel>
          <Input type="email" placeholder="john.doe@example.com" />
        </FormControl>
        <FormControl>
          <FormLabel>Shipping Address</FormLabel>
          <Input placeholder="123 Main St" />
        </FormControl>
        <FormControl>
          <FormLabel>City</FormLabel>
          <Input placeholder="New York" />
        </FormControl>
        <FormControl>
          <FormLabel>Postal Code</FormLabel>
          <Input placeholder="12345" />
        </FormControl>
        <Button colorScheme="orange" size="lg" mt={4}>
          Place Order
        </Button>
      </Stack>
    </Box>
  );
}

export default Checkout;
