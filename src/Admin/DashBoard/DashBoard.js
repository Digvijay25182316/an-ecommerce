import { Box, Button, Grid, HStack, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { BiSolidDashboard, BiSolidUser } from 'react-icons/bi';
import { BsPlusCircleFill } from 'react-icons/bs';
import { FaCartArrowDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
} from 'recharts';

function DashBoard() {
  const totalRevenue = 5000;
  const totalProfit = 2000;

  const data = [
    { name: 'Category 1', value: 400 },
    { name: 'Category 2', value: 300 },
    { name: 'Category 3', value: 200 },
    { name: 'Category 4', value: 100 },
  ];
  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <HStack m={'20px'}>
        <Link to={'/admin/dashboard'}>
          <Button
            variant={'ghost'}
            gap={'2px'}
            boxShadow={
              '0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(107, 70, 193, 0.5)'
            }
            size={'sm'}
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.05)' }}
            color={'purple.400'}
          >
            <BiSolidDashboard />
            <Text children="Dashboard" />
          </Button>
        </Link>
        <Link to={'/admin/product'}>
          <Button
            variant={'ghost'}
            gap={'2px'}
            boxShadow={
              '0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(107, 70, 193, 0.5)'
            }
            size={'sm'}
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.05)' }}
          >
            <BsPlusCircleFill />
            <Text children="Product" />
          </Button>
        </Link>
        <Link to={'/admin/users'}>
          <Button
            variant={'ghost'}
            gap={'2px'}
            boxShadow={
              '0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(107, 70, 193, 0.5)'
            }
            size={'sm'}
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.05)' }}
          >
            <BiSolidUser />
            <Text children="Users" />
          </Button>
        </Link>
        <Link to={'/admin/orders'}>
          <Button
            variant={'ghost'}
            gap={'2px'}
            size={'sm'}
            boxShadow={
              '0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(107, 70, 193, 0.5)'
            }
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.05)' }}
          >
            <FaCartArrowDown />
            <Text children="Orders" />
          </Button>
        </Link>
      </HStack>
      <Box display={'flex'} flexDirection={'column'} m={'20px'}>
        <Box fontWeight={'bold'} fontSize={'34px'} margin={'23px'}>
          <Text>DashBoard</Text>
        </Box>
        <Stack width={'90vw'} textAlign={'center'} color={'black'}>
          <Box p={4}>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <Box p={4} borderWidth="1px" borderRadius="md" bg="white">
                <Text fontSize="xl" mb={2}>
                  Total Revenue
                </Text>
                <Text fontSize="3xl">${totalRevenue}</Text>
              </Box>
              <Box p={4} borderWidth="1px" borderRadius="md" bg="white">
                <Text fontSize="xl" mb={2}>
                  Total Profit
                </Text>
                <Text fontSize="3xl">${totalProfit}</Text>
              </Box>
            </Grid>

            <Box mt={6} p={4} borderWidth="1px" borderRadius="md" bg="white">
              <Text fontSize="xl" mb={4}>
                Sales Graph
              </Text>
              {/* Replace the following ResponsiveContainer with your own sales graph component */}
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  {/* Add the necessary components, such as XAxis, YAxis, Line, Tooltip, etc. */}
                </LineChart>
              </ResponsiveContainer>
            </Box>

            <Box mt={6} p={4} borderWidth="1px" borderRadius="md" bg="white">
              <Text fontSize="xl" mb={4}>
                Sales Distribution
              </Text>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie dataKey="value" data={data} outerRadius={80} label>
                    {/* Customize the appearance of each segment */}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default DashBoard;
