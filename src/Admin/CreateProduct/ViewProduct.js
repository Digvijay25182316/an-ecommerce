import React, { useEffect, useState } from 'react';
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

const ProductTable = ({ productArray }) => {
  const [products, setproducts] = useState(productArray);
  const { onOpen, isOpen, onClose } = useDisclosure();

  const handleDeleteProduct = id => {
    // const updatedproducts = products.filter(Product => Product._id !== id);
    // setproducts(updatedproducts);
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
