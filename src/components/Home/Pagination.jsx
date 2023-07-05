import React, { useState } from 'react';
import { Button, Stack, } from '@chakra-ui/react';

const Pagination = ({ products, productsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let page = 1; page <= totalPages; page++) {
      buttons.push(
        <Button
          key={page}
          size="sm"
          variant={currentPage === page ? 'solid' : 'outline'}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <Stack direction="row" align="center" justify="center" spacing={2} mt={4}>
      {renderPaginationButtons()}
    </Stack>
  );
};

export default Pagination;
