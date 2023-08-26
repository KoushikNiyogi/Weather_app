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
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../Redux/UserReduce/action';
import axios from 'axios';

const init = {
    name : "",
    email : "",
    password : ""
}

function Signup() {
    const navigate = useNavigate();
    const toast = useToast();

    const[details,setDetails] = useState(init)

    const handleSignup = async () => {
        axios.post("https://weather-app-backend-snuw.onrender.com/user/register",details)
        .then((res)=>{
            navigate("/")
            toast({
                title: 'Account created.',
                description: "We've created your account for you.",
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
        
    };

    return (
        <Box maxW="400px" mx="auto" p={4}>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
                Signup to Your Account
            </Text>
            <FormControl>
                <FormLabel>Name</FormLabel>
                <Input type="text" value={details.name} onChange={(e) => setDetails({...details,name : e.target.value})} placeholder="Enter your Name" mb={2} />
                <FormLabel>Email</FormLabel>
                <Input type="email" value={details.email} onChange={(e) => setDetails({...details,email : e.target.value})} placeholder="Enter your email" mb={2} />
                <FormLabel>Password</FormLabel>
                <Input type="password" value={details.password} onChange={(e) => setDetails({...details,password : e.target.value})} placeholder="Enter your password" mb={4} />
                <Button colorScheme="blue" onClick={handleSignup} w="100%" mb={4}>
                    Signup
                </Button>
                <Text>
                    Have an account?{' '}
                    <Link as={RouterLink} to="/" color="blue.500">
                        Login here
                    </Link>
                </Text>
            </FormControl>
        </Box>
    );
}

export default Signup;
