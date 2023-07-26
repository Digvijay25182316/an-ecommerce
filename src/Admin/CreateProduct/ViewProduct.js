import React, { useContext, useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Box,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { RiDeleteBinLine } from 'react-icons/ri';
import FullScreenModal from './FullScreenModal';
import axios from 'axios';
import { SERVER_URL } from '../../App';
import { CartContext } from '../../context/store';
import CookieFields from '../../context/utils';

const deleteProduct = async (id, token) => {
  const data = await axios.delete(`${SERVER_URL}/admin/product/${id}`, {
    headers: {
      Authorization: `Bearer <${token}>`,
    },
    withCredentials: true,
  });
  return data;
};

const ProductTable = ({ productArray }) => {
  const [products, setproducts] = useState(productArray);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { loadingHandler, successHandler, ErrorHandler } =
    useContext(CartContext);

  const token = CookieFields.getToken();

  const handleDeleteProduct = id => {
    const updatedproducts = products.filter(Product => Product._id !== id);
    loadingHandler(true);
    deleteProduct(id, token)
      .then(data => {
        successHandler(data.data);
        setproducts(updatedproducts);
      })
      .catch(err => ErrorHandler(err));
  };

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <Box display={'flex'} flexDirection={'column'} m={'20px'}>
        <Stack
          overflowX={'scroll'}
          overflowY={'hidden'}
          width={'90vw'}
          textAlign={'center'}
        >
          <Table>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>Category</Th>
                <Th>Quantity</Th>
                <Th>Price</Th>
                <Th>Brand</Th>
                <Th>Ratings</Th>
                <Th>Material</Th>
                <Th>Created At</Th>
                <Th>Edit Product</Th>
                <Th>Delete Product</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((Product, i) => (
                <Tr key={Product._id}>
                  <Td>{i + 1}</Td>
                  <Td>{Product.name}</Td>
                  <Td>
                    <Text children={Product.description} noOfLines={1} />
                  </Td>
                  <Td>{Product.category}</Td>
                  <Td>{Product.quantity}</Td>
                  <Td>{Product.price}</Td>
                  <Td>{Product.brand}</Td>
                  <Td>{Product.ratings}</Td>
                  <Td>{Product.material}</Td>
                  <Td>{Product.createdAt.split('T')[0]}</Td>

                  <Td>
                    <Button
                      variant={'outline'}
                      textColor={'purple.400'}
                      onClick={onOpen}
                    >
                      <Text>Edit Product</Text>
                      <FullScreenModal
                        isOpen={isOpen}
                        onClose={onClose}
                        id={Product._id ? Product._id : ''}
                        prename={Product.name ? Product.name : ''}
                        predescription={
                          Product.description ? Product.description : ''
                        }
                        preimage={Product.poster.url ? Product.poster.url : ''}
                        preprice={Product.price ? Product.price : ''}
                        prestock={Product.quantity ? Product.quantity : ''}
                      />
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      color={'purple.400'}
                      onClick={() => handleDeleteProduct(Product._id)}
                    >
                      <RiDeleteBinLine />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProductTable;
