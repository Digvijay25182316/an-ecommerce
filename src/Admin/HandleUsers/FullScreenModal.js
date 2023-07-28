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
  Select,
  FormLabel,
} from '@chakra-ui/react';
import { CartContext } from '../../context/store';
import CookieFields from '../../context/utils';
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
  const { loadingHandler, successHandler, ErrorHandler } =
    useContext(CartContext);
  const [role, setRole] = useState(userRole);
  const Closehandler = e => {
    const token = CookieFields.getToken();
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
                    <Select
                      type="text"
                      value={role}
                      onChange={e => setRole(e.target.value)}
                      focusBorderColor="purple.400"
                      placeholder={role}
                    >
                      <option value={role === 'user' ? 'admin' : 'user'}>
                        {role === 'user' ? 'admin' : 'user'}
                      </option>
                    </Select>
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
