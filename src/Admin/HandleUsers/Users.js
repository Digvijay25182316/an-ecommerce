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
  HStack,
  Input,
} from '@chakra-ui/react';
import { RiDeleteBinLine } from 'react-icons/ri';
import FullScreenModal from './FullScreenModal';
import { BiSolidDashboard, BiSolidUser } from 'react-icons/bi';
import { BsPlusCircleFill } from 'react-icons/bs';
import { FaCartArrowDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../../App';
import CookeiFields from '../../context/utils.js';
import { CartContext } from '../../context/store';
import CookieFields from '../../context/utils.js';

const getUsers = async token => {
  const data = await axios.get(`${SERVER_URL}/users`, {
    headers: {
      Authorization: `Bearer <${token}>`,
    },
    withCredentials: true,
  });
  return data;
};

const deleteUser = async (id, token) => {
  const data = await axios.delete(`${SERVER_URL}/deleteuser/${id}`, {
    headers: {
      Authorization: `Bearer <${token}>`,
    },
    withCredentials: true,
  });
  return data;
};

function Users() {
  const { ErrorHandler, loadingHandler, successHandler } =
    useContext(CartContext);
  const usersArr = CookieFields.usersArrFromLocalStorage('users');
  const token = CookeiFields.getToken();
  const [currentuser, setCurrentuser] = useState({});
  const [users, setUsers] = useState(usersArr ? usersArr : []);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filterOpen, setFilterOpen] = useState(false);

  const [filterUsername, setFilterUsername] = useState('');
  const [filterEmail, setFilterEmail] = useState('');
  const [filterCurrentOrders, setFilterCurrentOrders] = useState('');
  const [filterCreatedAt, setFilterCreatedAt] = useState('');
  const [filterRole, setFilterRole] = useState('');

  // Function to apply filters
  const applyFilters = () => {
    const filtered = usersArr.filter(user => {
      // Custom filtering logic based on selected filter values
      const emailMatch = filterEmail
        ? user.email?.toLowerCase().includes(filterEmail.toLowerCase())
        : true;
      const usernameMatch = filterUsername
        ? user.name?.toLowerCase().includes(filterUsername.toLowerCase())
        : true;
      const currentOrdersMatch = filterCurrentOrders
        ? user.currentOrders === parseInt(filterCurrentOrders)
        : true;
      const createdAtMatch = filterCreatedAt
        ? user.createdAt.includes(filterCreatedAt)
        : true;
      const roleMatch = filterRole
        ? user.role?.toLowerCase() === filterRole.toLowerCase()
        : true;

      return (
        emailMatch &&
        usernameMatch &&
        currentOrdersMatch &&
        createdAtMatch &&
        roleMatch
      );
    });

    setUsers(filtered);
  };

  useEffect(() => {
    if (token) {
      getUsers(token)
        .then(({ data }) => {
          CookieFields.usersArrInLocalStorage(data.users);
          setUsers(data.users);
          if (!users) {
            setUsers(data.users);
          }
        })
        .catch(err => ErrorHandler(err));
    }
    if (CookeiFields.getUser() !== undefined) {
      setCurrentuser(JSON.parse(CookeiFields.getUser()));
    }
  }, [token]);

  const handleDeleteuser = id => {
    const updatedUsers = users.filter(item => item._id !== id);
    loadingHandler(true);
    deleteUser(id, token)
      .then(data => {
        setUsers(updatedUsers);
        CookieFields.usersArrInLocalStorage(updatedUsers);
        successHandler(data.data);
      })
      .catch(err => ErrorHandler(err));
  };
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
            color={'purple.400'}
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
          <Text>Users</Text>
        </Box>
        <Box width={'90vw'}>
          <Button size={'sm'} onClick={() => setFilterOpen(!filterOpen)}>
            Filters
          </Button>
          {filterOpen && (
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
                bg={'Background'}
              >
                <Text children="Name" />
                <Input
                  value={filterUsername}
                  onChange={e => setFilterUsername(e.target.value)}
                  size={'sm'}
                />
              </Box>
              <Box
                display={'flex'}
                alignItems={'center'}
                gap={'5'}
                p={'5px'}
                rounded={'lg'}
                bg={'Background'}
              >
                <Text children="Email" />
                <Input
                  value={filterEmail}
                  onChange={e => setFilterEmail(e.target.value)}
                  size={'sm'}
                />
              </Box>
              <Box
                display={'flex'}
                alignItems={'center'}
                gap={'5'}
                p={'5px'}
                rounded={'lg'}
                bg={'Background'}
              >
                <Text children="CurrentOrders" />
                <Input
                  value={filterCurrentOrders}
                  onChange={e => setFilterCurrentOrders(e.target.value)}
                  size={'sm'}
                />
              </Box>
              <Box
                display={'flex'}
                alignItems={'center'}
                gap={'5'}
                p={'5px'}
                rounded={'lg'}
                bg={'Background'}
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
                bg={'Background'}
              >
                <Text children="Role" />
                <Input
                  value={filterRole}
                  onChange={e => setFilterRole(e.target.value)}
                  size={'sm'}
                />
              </Box>
              <Button onClick={() => applyFilters()} size={'sm'}>
                Apply Filters
              </Button>
            </Box>
          )}
        </Box>
        <Stack
          overflowX={'scroll'}
          overflowY={'hidden'}
          width={'90vw'}
          textAlign={'center'}
        >
          <Table>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Username</Th>
                <Th>Email</Th>
                <Th>Payment History</Th>
                <Th>Order History</Th>
                <Th>currentOrders</Th>
                <Th>Created At </Th>
                <Th>Role</Th>
                <Th>Actions </Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            {users.length === 0 ? (
              <Text children="There Is No User To show" />
            ) : (
              users.map(user => (
                <Tbody key={user._id}>
                  <Tr key={user._id} id={user.id}>
                    <Td>
                      <Text children={user._id} />
                    </Td>
                    <Td>
                      <Text children={user.name} />
                    </Td>
                    <Td>
                      <Text children={user.email} />
                    </Td>
                    <Td>
                      <Text children={user.paymentHistory} />
                    </Td>
                    <Td>
                      <Text children={user.orderHistory} />
                    </Td>
                    <Td>
                      <Text children={user.currentOrders} />
                    </Td>
                    <Td>
                      <Text children={user.createdAt.split('T')[0]} />
                    </Td>
                    <Td>
                      <Text children={user.role} />
                    </Td>
                    <Td>
                      <Button
                        isDisabled={user._id === currentuser._id}
                        variant={'outline'}
                        textColor={'purple.400'}
                        onClick={onOpen}
                      >
                        <Text>Edit user</Text>
                        <FullScreenModal
                          isOpen={isOpen}
                          onClose={onClose}
                          userRole={user.role ? user.role : ''}
                          id={user._id ? user._id : ''}
                        />
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        isDisabled={user._id === currentuser._id}
                        color={'purple.400'}
                        onClick={() => handleDeleteuser(user._id)}
                      >
                        <RiDeleteBinLine />
                      </Button>
                    </Td>
                  </Tr>
                </Tbody>
              ))
            )}
          </Table>
        </Stack>
      </Box>
    </Box>
  );
}

export default Users;
