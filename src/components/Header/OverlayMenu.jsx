import React from "react";
import { Box, Text, VStack, Stack, Icon, Button } from "@chakra-ui/react";
import { RiHome3Line} from "react-icons/ri";
import { Link } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";

const OverlayMenu = ({onClose}) => {
  return (
    <Box w="full" h="full" p={4} display={"flex"} flexDirection={"column"}>
      <VStack spacing={4} align="start">
        <Box >
        <Stack direction="row" align="center" my={"20px"}>
          <Link to="/" >
            <Button gap={'20px'} onClick={onClose} colorScheme="yellow">
                <Icon as={RiHome3Line} boxSize={6} />
                <Text children="Home"/>
            </Button>
          </Link>
        </Stack>
        <Stack direction="row" align="center" my={"20px"}>
          <Link to="/admin/dashboard" >
            <Button gap={'20px'} onClick={onClose} colorScheme="yellow">
                <Icon as={BiSolidDashboard } boxSize={6} />
                <Text children="Dashboard"/>
            </Button>
          </Link>
        </Stack>
            <Text children="New" fontSize={"20px"} fontWeight={"bold"} my={"10px"}/>
        <Stack direction="row" align="center" my={"10px"}>
        <Link to="/myprofile">
            <Button gap={'20px'} onClick={onClose} colorScheme="yellow">
                <Text children="Latest Release"/>
            </Button>
          </Link>
        </Stack>
        <Stack direction="row" align="center" my={"10px"}>
        <Link to="/myprofile">
            <Button gap={'20px'} onClick={onClose} colorScheme="yellow">
                <Text children="Best Deals"/>
            </Button>
          </Link>
        </Stack>
        <Stack direction="row" align="center">
        <Link to="/myprofile">
            <Button gap={'20px'} onClick={onClose} colorScheme="yellow" w={"full"}>
                <Text children="Gift Someone"/>
            </Button>
          </Link>
        </Stack>

        </Box>
      </VStack>
    </Box>
  );
};

export default OverlayMenu;
