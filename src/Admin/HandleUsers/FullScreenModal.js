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
import axios from 'axios';
import { SERVER_URL } from '../../App';

const updaterole = async (id, role, token) => {
  const data = await axios.put(
    `${SERVER_URL}/updaterole`,
    { id, role },
    {
      headers: {
        Authorization: `Bearer <${token}>`,
      },
      withCredentials: true,
    }
  );
  return data;
};

const FullScreenModal = ({ isOpen, onClose, userRole, id }) => {
  const { loadingHandler, successHandler, ErrorHandler, token } =
    useContext(CartContext);
  const [role, setRole] = useState(userRole);
  const Closehandler = e => {
    e.preventDefault();
    if (token) {
      loadingHandler(true);
      updaterole(id, role, token)
        .then(data => successHandler(data.data))
        .catch(err => ErrorHandler(err));
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
