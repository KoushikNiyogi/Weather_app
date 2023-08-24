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
      let user = {};
      users.forEach(element => {
        console.log(element)
        if(element.email == email){
            user = element
        }
      });
      console.log(user)
      if(email == user.email){
        if(password == user.password){
            alert("Login Successful")
            localStorage.setItem("user",JSON.stringify(user))
            navigate("/weather")
        }else{
            alert("wrong password")
        }
      }else{
        alert("User not found")
      }
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
