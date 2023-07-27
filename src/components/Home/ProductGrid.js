import React, { useContext, useState } from 'react';
import {
  Box,
  SimpleGrid,
  Image,
  Heading,
  Text,
  Button,
  HStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import RatingComponent from '../Products/RatingComponent';
import { CartContext } from '../../context/store';

const ProductGrid = ({ products, onPageChange }) => {
  const { loadingHandler } = useContext(CartContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(30);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = page => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const startIndex = (currentPage - 1) * productsPerPage;
  const visibleProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      w={'95vw'}
      top={'100px'}
      m={'auto'}
    >
      <SimpleGrid columns={[2, 2, 3, 4, 5]} spacing={6}>
        {visibleProducts &&
          visibleProducts.map(product => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              onClick={() => loadingHandler(true)}
            >
              <Box
                id={product._id}
                key={product._id}
                p="4"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                maxH={'450px'}
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
                    src={product.poster.url}
                    alt={product.name}
                    height="200px"
                    objectFit="cover"
                    loading="lazy"
                  />
                  <Heading size="sm" mt="2" color={!'Background'}>
                    {product.name}
                  </Heading>
                </Box>
                <Box
                  display="flex"
                  flexDirection={'column'}
                  alignItems="center"
                >
                  <Text fontSize="sm" color="gray.800">
                    Rating:
                  </Text>
                  <Box display="flex" alignItems="center">
                    <RatingComponent initialRating={product.reviews} />
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection={'column'}
                  alignItems="center"
                >
                  <Text fontSize="sm" color="gray.800">
                    Price:
                  </Text>
                  <Text color="gray.800" mt="1" fontWeight={'bold'}>
                    $ {product.price}
                  </Text>
                </Box>
              </Box>
            </Link>
          ))}
      </SimpleGrid>
      <HStack mt={4} spacing={2}>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            size="sm"
            colorScheme={currentPage === index + 1 ? 'yellow.400' : 'gray'}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </HStack>
    </Box>
  );
};

export default ProductGrid;
