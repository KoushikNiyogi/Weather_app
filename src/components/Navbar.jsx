import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, Link,Button } from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [state,setState] = useState(localStorage.getItem("token")||"")
    const navigate = useNavigate()

    const handleLogout= ()=>{
       localStorage.removeItem("token");
       localStorage.removeItem("user");
       localStorage.removeItem("data")
       setState(null)
       navigate("/")
    }

    useEffect(()=>{
        setState(localStorage.getItem("token"))
    },[])
  return (
    <Box bg="gray.800" color="white">
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        p={4}
      >
        <Box>
          <Text fontSize="xl" fontWeight="bold">
            Weather App
          </Text>
        </Box>
        <Flex w="50%" justify={"space-evenly"}>
          <NavLink
            to="/register"
            exact
            activeStyle={{ fontWeight: 'bold' }}
            p={2}
          >
            Register
          </NavLink>
          <NavLink
            to="/"
            exact
            activeStyle={{ fontWeight: 'bold' }}
            p={2}
          >
            Login
          </NavLink>
          <NavLink
            to="/weather"
            exact
            activeStyle={{ fontWeight: 'bold' }}
            p={2}
          >
            Weather
          </NavLink>
          <NavLink
            to="/admin"
            exact
            activeStyle={{ fontWeight: 'bold' }}
            p={2}
          >
            Admin
          </NavLink>
          {state&&<Button onClick={()=>handleLogout()}>Log out</Button>}

        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
