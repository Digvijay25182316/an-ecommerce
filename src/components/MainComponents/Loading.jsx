import React, { useContext } from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import { CartContext } from '../../context/store';

const Loading = () => {
  const { isloading } = useContext(CartContext);

  if (!isloading) {
    return null; // If loading state is false, don't render the modal
  }

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor="rgba(0, 0, 0, 0.5)"
      zIndex="9999"
    >
      <Spinner color="white" size="xl" />
    </Box>
  );
};

export default Loading;
