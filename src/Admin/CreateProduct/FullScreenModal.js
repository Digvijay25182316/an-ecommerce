import React, { useContext, useState } from 'react';
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
import axios from 'axios';
import { SERVER_URL } from '../../App';
import { CartContext } from '../../context/store';
import CookieFields from '../../context/utils';

const updateProductDetails = async (id, token, formdata) => {
  const data = await axios.put(
    `${SERVER_URL}/admin/productupdate/${id}`,
    formdata,
    {
      headers: {
        Authorization: `Bearer <${token}>`,
      },
      withCredentials: true,
    }
  );
  return data;
};

const convertToWebP = imageFile => {
  return new Promise(resolve => {
    const img = new Image();
    img.src = URL.createObjectURL(imageFile);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      // Convert to WebP format
      canvas.toBlob(blob => {
        // Create a new File object with the converted Blob and the same name as the original file
        const convertedImageFile = new File([blob], imageFile.name, {
          type: 'image/webp',
        });
        resolve(convertedImageFile);
      }, 'image/webp');
    };
  });
};

const FullScreenModal = ({
  id,
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
  const [convertedWebpImage, setConvertedWebpImage] = useState(null);
  const { loadingHandler, successHandler, ErrorHandler } =
    useContext(CartContext);

  const formdata = new FormData();
  formdata.append('name', name);
  formdata.append('price', price);
  formdata.append('description', description);
  formdata.append('quantity', Stock);

  const token = CookieFields.getToken();

  const handleImageUpload = event => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = e => {
      setPreviewImage(e.target.result);
    };

    reader.readAsDataURL(file);
    //converting the image to webp
    convertToWebP(file).then(webpFile => {
      setConvertedWebpImage(webpFile);
    });
  };
  const handleSubmit = e => {
    const imageToUse = convertedWebpImage || Prevewimage;
    formdata.append('file', imageToUse);
    e.pereventDefault();
    loadingHandler(true);
    updateProductDetails(id, token, formdata)
      .then(data => {
        successHandler(data.data);
      })
      .catch(err => ErrorHandler(err));
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full" bg={'white'}>
      <ModalOverlay />
      <ModalContent boxShadow="none">
        <ModalBody maxHeight={'90vh'}>
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
                    loading="lazy"
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
