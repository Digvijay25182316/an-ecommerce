import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  VStack,
  Container,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  FormLabel,
} from '@chakra-ui/react';
import { CartContext } from '../../context/store';
import CookieFields from '../../context/utils';

const FullScreenModal = ({ isOpen, onClose, userRole }) => {
  const { loadingHandler, successHandler, ErrorHandler } =
    useContext(CartContext);
  const [role, setRole] = useState(userRole);
  const Closehandler = e => {
    const token = CookieFields.getToken();
    e.preventDefault();
    if (token) {
      loadingHandler(true);
    }

    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter={'inherit'}>
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <ModalHeader textAlign={'center'}>Cange Profile</ModalHeader>
            <Container>
              <form>
                <VStack spacing={'8'}>
                  <Box width={'100%'}>
                    <FormLabel children={'User Role'} />
                    <Input
                      type="text"
                      value={role}
                      onChange={e => setRole(e.target.value)}
                      focusBorderColor="purple.400"
                    />
                  </Box>
                  <Button
                    onClick={Closehandler}
                    w={'full'}
                    colorScheme="purple"
                    type="submit"
                  >
                    Submit and Close
                  </Button>
                </VStack>
              </form>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button mr={'3'} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default FullScreenModal;
