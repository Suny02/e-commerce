import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  // Toggle password visibility
  const handleEye = () => setEye((prev) => !prev);

  // Handle signup button click
  const handleSignup = async () => {
    if (!email || !password) {
      toast({
        title: "Please fill out both fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      // Replace this URL with your actual signup API endpoint
      const res = await axios.post(`https://your-api-url/register`, {
        email,
        password,
      });

      if (res.data.msg === "Registration successful") {
        toast({
          title: "Signup Success",
          description: "You can now log in.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        navigate("/login");
      } else {
        toast({
          title: res.data.msg || "Signup failed",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: error.response?.data?.msg || error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Create your account</Heading>
        </Stack>
        <Box rounded="lg" boxShadow="lg" p={8}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={eye ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement h="full">
                  <Button variant="ghost" onClick={handleEye}>
                    <ViewIcon />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              bg="black"
              color="white"
              _hover={{ bg: "gray.800" }}
              onClick={handleSignup}
            >
              Sign up
            </Button>

            <Stack pt={6}>
              <Text align="center">
                Already a user?{" "}
                <RouterLink to="/login" style={{ color: "blue" }}>
                  Login
                </RouterLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Signup;
