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
  Select,
  Input,
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
  const [FilterOpen, setFilterOpen] = useState(false);
  const [products, setproducts] = useState(productArray);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { loadingHandler, successHandler, ErrorHandler } =
    useContext(CartContext);
  const [filterName, setFilterName] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [filterStock, setFilterStock] = useState('');
  const [filterCreatedAt, setFilterCreatedAt] = useState('');
  const [filterMaterial, setFilterMaterial] = useState('');
  const [filterRatings, setFilterRatings] = useState('');

  // Update the filteredProducts array whenever any filter changes
  const applyFilters = () => {
    const filtered = productArray.filter(product => {
      // Custom filtering logic based on selected filter values
      const priceMatch = filterPrice
        ? product.price === parseInt(filterPrice)
        : true;
      const stockMatch = filterStock
        ? product.quantity === parseInt(filterStock)
        : true;
      const nameMatch = filterName
        ? product.name.toLowerCase().includes(filterName.toLowerCase())
        : true;
      const createdAtMatch = filterCreatedAt
        ? product.createdAt.includes(filterCreatedAt)
        : true;
      const materialMatch = filterMaterial
        ? product.material.toLowerCase().includes(filterMaterial.toLowerCase())
        : true;
      const ratingsMatch = filterRatings
        ? product.reviews.rating === parseInt(filterRatings)
        : true;

      return (
        priceMatch &&
        stockMatch &&
        nameMatch &&
        createdAtMatch &&
        materialMatch &&
        ratingsMatch
      );
    });

    setproducts(filtered);
  };
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
      <Box width={'90vw'}>
        <Button size={'sm'} onClick={() => setFilterOpen(!FilterOpen)}>
          Filters
        </Button>
        {FilterOpen && (
          <Box
            display={'flex'}
            flexDirection={'column'}
            position={'absolute'}
            height={'fit-content'}
            width={['50vw', '20vw']}
            gap={'2px'}
          >
            <Box
              display={'flex'}
              alignItems={'center'}
              gap={'5'}
              p={'5px'}
              rounded={'lg'}
              bg={'background'}
            >
              <Text children="Name" />
              <Input
                value={filterName}
                onChange={e => setFilterName(e.target.value)}
                size={'sm'}
              />
            </Box>
            <Box
              display={'flex'}
              alignItems={'center'}
              gap={'5'}
              p={'5px'}
              rounded={'lg'}
              bg={'background'}
            >
              <Text children="Stock" />
              <Input
                value={filterStock}
                onChange={e => setFilterStock(e.target.value)}
                size={'sm'}
              />
            </Box>
            <Box
              display={'flex'}
              alignItems={'center'}
              gap={'5'}
              p={'5px'}
              rounded={'lg'}
              bg={'background'}
            >
              <Text children="Price" />
              <Input
                value={filterPrice}
                onChange={e => setFilterPrice(e.target.value)}
                size={'sm'}
              />
            </Box>
            <Box
              display={'flex'}
              alignItems={'center'}
              gap={'5'}
              p={'5px'}
              rounded={'lg'}
              bg={'background'}
            >
              <Text children="CreatedAt" />
              <Input
                value={filterCreatedAt}
                onChange={e => setFilterCreatedAt(e.target.value)}
                size={'sm'}
              />
            </Box>
            <Box
              display={'flex'}
              alignItems={'center'}
              gap={'5'}
              p={'5px'}
              rounded={'lg'}
              bg={'background'}
            >
              <Text children="Ratings" />
              <Input
                value={filterRatings}
                onChange={e => setFilterRatings(e.target.value)}
                size={'sm'}
              />
            </Box>
            <Box
              display={'flex'}
              alignItems={'center'}
              gap={'5'}
              p={'5px'}
              rounded={'lg'}
              bg={'background'}
            >
              <Text children="Material" />
              <Input
                value={filterMaterial}
                onChange={e => setFilterMaterial(e.target.value)}
                size={'sm'}
              />
            </Box>
            <Button onClick={() => applyFilters()} size={'sm'}>
              Apply Filters
            </Button>
          </Box>
        )}
      </Box>
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
                  <Td>{Product.reviews.rating}</Td>
                  <Td>{Product.material}</Td>
                  <Td>
                    {Product.createdAt ? Product.createdAt.split('T')[0] : ''}
                  </Td>

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
