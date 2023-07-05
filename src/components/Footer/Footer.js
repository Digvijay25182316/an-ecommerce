import { Box, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

function Footer() {
  return (
    <section>
      <Stack height={'300px'} bg={'#393838'} marginTop={'30px'}>
        <VStack>
          <Box>
            <Text
              children="Ecommerce"
              fontFamily={'cursive'}
              fontSize={'50px'}
              color={'coral'}
            />
          </Box>
        </VStack>
      </Stack>
    </section>
  );
}

export default Footer;
