import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const toast = useToast();
  const {users} = useSelector(store => store.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {

    let obj = {
        email,
        password
    }
    console.log(obj)
    if(email == "admin@gmail.com"&&password == "admin1234"){
      localStorage.setItem("user",JSON.stringify(obj))
      navigate("/admin")
    }else{
      axios.post("https://weather-app-backend-snuw.onrender.com/user/login",{email,password})
      .then((res)=>{
          localStorage.setItem("token",res.data.token);
          localStorage.setItem("user",JSON.stringify(res.data.user))
          navigate("/weather")
          toast({
              title: 'Login Successful.',
              description: res.data.msg,
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
      })
      .catch((err)=>{
          console.log(err.response.data.msg)
          toast({
              title: 'Account is not created.',
              description: err.response.data.msg,
              status: 'error',
              duration: 9000,
              isClosable: true,
            })
      })
    }
  };
  return (
    <Box maxW="400px" mx="auto" p={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Login to Your Account
      </Text>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" mb={2} />
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" mb={4} />
        <Button colorScheme="blue"  onClick={handleLogin} w="100%" mb={4}>
          Login
        </Button>
        <Text>
          Don't have an account?
          <Link as={RouterLink} to="/register" color="blue.500">
            Sign up here
          </Link>
        </Text>
      </FormControl>
    </Box>
  );
}

export default Login;
