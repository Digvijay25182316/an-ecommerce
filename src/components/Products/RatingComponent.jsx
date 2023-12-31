import React, { useState } from 'react';
import { Box, Icon, Stack } from '@chakra-ui/react';
import { BsStarFill as StarIcon } from 'react-icons/bs';

const Rating = ({ initialRating }) => {
  const [rating, setRating] = useState(initialRating[0]&&initialRating[0].rating);

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <Stack direction="row" spacing={1}>
      {[1, 2, 3, 4, 5].map((value) => (
        <Box key={value} color={value <= rating ? 'coral' : 'gray.300'} cursor="pointer">
          <Icon
            as={StarIcon}
            boxSize={4}
            onClick={() => handleRatingClick(value)}
          />
        </Box>
      ))}
    </Stack>
  );
};

export default React.memo(Rating);
