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
  Heading,
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
import { toast } from 'react-hot-toast';
import { CartContext } from '../../context/store';
const cartItems = [
  {
    id: 1,
    image: 'https://example.com/images/bluetooth_speaker.jpg',
    title: 'Premium Portable Bluetooth Speaker',
    price: 49.99,
    quantity: 50,
    description:
      "Enjoy high-quality sound on the go with our premium portable Bluetooth speaker. With advanced Bluetooth technology, this speaker delivers rich and powerful audio. It's perfect for parties, outdoor adventures, or simply relaxing at home. Get yours today and experience music like never before.",
  },
  {
    id: 2,
    image: 'https://example.com/images/fitness_tracker.jpg',
    title: 'Smart Fitness Tracker',
    price: 79.99,
    quantity: 100,
    description:
      'Stay motivated and track your progress with our smart fitness tracker. This sleek device monitors your heart rate, counts steps, and tracks your sleep patterns. It also connects to your smartphone to receive notifications and control music playback. Start your fitness journey with our reliable and stylish tracker.',
  },
  {
    id: 3,
    image: 'https://example.com/images/wireless_earbuds.jpg',
    title: 'True Wireless Earbuds',
    price: 99.99,
    quantity: 200,
    description:
      'Experience true freedom with our wireless earbuds. These earbuds provide exceptional sound quality and a comfortable fit. With the latest Bluetooth technology, they offer a seamless connection to your devices. The charging case ensures extended playtime on the go. Enjoy your favorite music or take calls without any wires holding you back.',
  },
  {
    id: 4,
    image: 'https://example.com/images/digital_camera.jpg',
    title: 'Digital Camera',
    price: 199.99,
    quantity: 30,
    description:
      "Capture life's precious moments with our high-quality digital camera. With advanced features and a user-friendly interface, this camera allows you to take stunning photos and videos. Whether you're a professional photographer or an enthusiastic beginner, our digital camera is the perfect companion for any occasion.",
  },
  {
    id: 5,
    image: 'https://example.com/images/wireless_headphones.jpg',
    title: 'Wireless Headphones',
    price: 129.99,
    quantity: 150,
    description:
      'Immerse yourself in music with our wireless headphones. These headphones offer superior sound quality and a comfortable over-ear design. With Bluetooth connectivity and a long battery life, you can enjoy your favorite tunes without any distractions. Say goodbye to tangled wires and hello to an elevated audio experience.',
  },
  {
    id: 6,
    image: 'https://example.com/images/smart_watch.jpg',
    title: 'Smart Watch',
    price: 149.99,
    quantity: 80,
    description:
      'Stay connected and track your fitness with our smartwatch. This stylish device features a vibrant touchscreen display, fitness tracking capabilities, and smartphone integration. Receive notifications, monitor your heart rate, and track your daily activity with ease. Enhance your lifestyle with our feature-packed smartwatch.',
  },
  {
    id: 7,
    image: 'https://example.com/images/portable_charger.jpg',
    title: 'Portable Charger',
    price: 39.99,
    quantity: 250,
    description:
      "Never run out of battery again with our portable charger. This compact and lightweight charger provides a high-capacity power bank that can charge your devices multiple times on a single charge. It's perfect for travel, outdoor activities, or emergencies. Stay powered up wherever you go.",
  },
  {
    id: 8,
    image: 'https://example.com/images/wireless_keyboard.jpg',
    title: 'Wireless Keyboard',
    price: 59.99,
    quantity: 120,
    description:
      'Experience the convenience of a wireless keyboard. Our ergonomic keyboard offers a comfortable typing experience without the hassle of wires. With a reliable wireless connection and long battery life, you can work or play with ease. Enhance your userivity and eliminate clutter on your desk.',
  },
  {
    id: 9,
    image: 'https://example.com/images/virtual_reality_headset.jpg',
    title: 'Virtual Reality Headset',
    price: 299.99,
    quantity: 20,
    description:
      'Step into a new world of immersive entertainment with our virtual reality headset. Dive into 3D games, virtual tours, or watch movies in a whole new way. With adjustable straps and a comfortable design, our VR headset provides a thrilling and comfortable experience for hours of virtual exploration.',
  },
  {
    id: 10,
    image: 'https://example.com/images/smart_plug.jpg',
    title: 'Smart Plug',
    price: 24.99,
    quantity: 300,
    description:
      'Control your devices with a simple voice command using our smart plug. This Wi-Fi-enabled plug allows you to turn on or off your appliances remotely using your smartphone or voice assistant. Set schedules, monitor energy usage, and make your home smarter and more efficient.',
  },
  {
    id: 11,
    image: 'https://example.com/images/wireless_mouse.jpg',
    title: 'Wireless Mouse',
    price: 29.99,
    quantity: 200,
    description:
      'Experience freedom and convenience with our wireless mouse. Say goodbye to tangled cords and enjoy precise tracking and ergonomic design. With a reliable wireless connection, this mouse allows you to work or play with ease. Boost your userivity and make computing effortless.',
  },
];

const getUsers = async token => {
  const data = await axios.get(`${SERVER_URL}/users`, {
    headers: {
      Authorization: `Bearer <${token}>`,
    },
    withCredentials: true,
  });
  return data;
};

function Users() {
  const { loadingHandler, successHandler, ErrorHandler } =
    useContext(CartContext);
  const token = CookeiFields.getToken();
  const [users, setUsers] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (token) {
      loadingHandler(true);
      getUsers(token)
        .then(({ data }) => successHandler(data.users))
        .catch(err => ErrorHandler(err));
    }
  }, []);

  const handleDeleteuser = id => {};
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
            {users ? (
              users.map(user => (
                <Tbody>
                  <Tr key={user._id} id={user.id}>
                    <Td>{user._id}</Td>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.paymentHistory}</Td>
                    <Td>{user.orderHistory}</Td>
                    <Td>{user.currentOrders}</Td>
                    <Td>{user.createdAt.split('T')[0]}</Td>
                    <Td>{user.role}</Td>
                    <Td>
                      <Button
                        variant={'outline'}
                        textColor={'purple.400'}
                        onClick={onOpen}
                      >
                        <Text>Edit user</Text>
                        <FullScreenModal isOpen={isOpen} onClose={onClose} />
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        color={'purple.400'}
                        onClick={() => handleDeleteuser(user.id)}
                      >
                        <RiDeleteBinLine />
                      </Button>
                    </Td>
                  </Tr>
                </Tbody>
              ))
            ) : (
              <Text children="There Is No User To show" />
            )}
          </Table>
        </Stack>
      </Box>
    </Box>
  );
}

export default Users;
