import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  Input,
  Heading,
  Image,
  Text,
  ModalBody,
  FormLabel,
  VStack,
} from '@chakra-ui/react';
import RatingComponent from '../../components/Products/RatingComponent';
import { fileuploadStyle } from './CreateProductForm';

const FullScreenModal = ({
  isOpen,
  onClose,
  prename,
  predescription,
  preprice,
  prestock,
  preimage,
}) => {
  const [name, setName] = useState(prename);
  const [Prevewimage, setPreviewImage] = useState(preimage);
  const [description, setDescription] = useState(predescription);
  const [price, setPrice] = useState(preprice);
  const [Stock, setStock] = useState(prestock);

  const handleImageUpload = event => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = e => {
      setPreviewImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };
  const handleSubmit = e => {
    e.pereventDefault();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full" bg={'white'}>
      <ModalOverlay />
      <ModalContent boxShadow="none">
        <ModalBody maxHeight={'100vh'}>
          <Box display={'flex'} flexDirection={['column', 'row']}>
            <VStack
              h={'full'}
              justifyContent={'center'}
              spacing={'16'}
              width={['90vw', '50vw']}
            >
              <Heading children="Edit Product Details" />
              <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                <Box>
                  <FormLabel htmlFor="name" children="Name" />
                  <Input
                    required
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    focusBorderColor="purple.400"
                    placeholder="Product name"
                    type="text"
                  />
                </Box>
                <Box my={'4'}>
                  <FormLabel htmlFor="description" children="description" />
                  <Input
                    required
                    id="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    focusBorderColor="purple.400"
                    placeholder="update description"
                    type="text"
                  />
                </Box>
                <Box my={'4'}>
                  <FormLabel htmlFor="price" children="price" />
                  <Input
                    required
                    id="price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="Enter your price"
                    type="number"
                    focusBorderColor="purple.400"
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor="Stock" children="Stock" />
                  <Input
                    required
                    id="#price"
                    value={Stock}
                    onChange={e => setStock(e.target.value)}
                    placeholder="Stock"
                    type="number"
                    focusBorderColor="purple.400"
                  />
                </Box>
                <Box my={'4'}>
                  <FormLabel htmlFor="chooseAvtar" children="chooseAvatar" />
                  <Input
                    accept={'image/*'}
                    required
                    id="chooseAvatar"
                    onChange={handleImageUpload}
                    type="file"
                    focusBorderColor="purple.400"
                    css={{ '&::file-selector-button': fileuploadStyle }}
                  />
                </Box>
                <Button my={'4'} colorScheme="purple" type="submit">
                  Save Changes
                </Button>
              </form>
            </VStack>
            <VStack
              width={['90vw', '50vw']}
              display={['none', 'flex']}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Text children="Preview" top={0} />
              <Box
                p="4"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                display={['none', 'flex']}
                flexDirection={'column'}
                alignItems={'center'}
                transition="transform 0.2s"
                _hover={{ transform: 'scale(1.05)' }}
                bg={'ButtonShadow'}
              >
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  alignItems={'center'}
                >
                  <Image
                    src={Prevewimage}
                    alt={name}
                    height="200px"
                    objectFit="cover"
                  />
                  <Heading size="sm" mt="2" color={!'Background'}>
                    {name}
                  </Heading>
                </Box>
                <Box
                  display="flex"
                  flexDirection={'column'}
                  alignItems="center"
                >
                  <Text fontSize="sm" color="purple.400">
                    Rating:
                  </Text>
                  <Box display="flex" alignItems="center">
                    <RatingComponent initialRating={0} />
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection={'column'}
                  alignItems="center"
                >
                  <Text fontSize="sm" color="purple.400">
                    Price:
                  </Text>
                  <Text color="yellow" mt="1">
                    $ {price}
                  </Text>
                </Box>
              </Box>
            </VStack>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FullScreenModal;
