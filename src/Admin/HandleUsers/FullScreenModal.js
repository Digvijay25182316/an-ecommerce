import React from 'react';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
} from '@chakra-ui/react';

const FullScreenModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent bg="transparent" boxShadow="none">
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex={9999}
        >
          <Box bg="white" p={8} width="100vw" height={'100vh'}>
            {/* Add your modal content here */}
            <Box mb={4}>
              <h2>Modal Content</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Box>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default FullScreenModal;
