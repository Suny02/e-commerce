import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { login } from "../redux/AuthReducer/action";  // make sure your login action works

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(false);

  const toast = useToast();
  const loading = useSelector((store) => store.AuthReducer.isLoading);

  // Redirect route after successful login
  const pathRoute = location.state?.from?.pathname || "/";

  // Show/hide password
  const handleEye = () => {
    setEye((prev) => !prev);
  };

  // Handle login button click
  const loginHandler = () => {
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

    const params = { email, password };
    dispatch(login(params, toast)).then((res) => {
      if (res.payload?.msg === "login successfully") {
        toast({
          title: "Login Success",
          description: "You are successfully logged in",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        navigate(pathRoute, { replace: true });
      } else {
        toast({
          title: res.payload?.msg || "Login Failed",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    });
  };

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl" textTransform="uppercase">
            Sign in to your account
          </Heading>
        </Stack>
        <Box rounded="lg" boxShadow="lg" p={8}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
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

            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align="start"
                justify="space-between"
              >
                <Checkbox>Remember me</Checkbox>
                <Link color="blue.400">Forgot password?</Link>
              </Stack>
              <Button
                bg="black"
                color="whitesmoke"
                _hover={{
                  bg: "none",
                  color: "black",
                  border: "1px solid black",
                }}
                onClick={loginHandler}
              >
                {loading ? <Spinner /> : "Sign in"}
              </Button>
            </Stack>

            <Stack pt={6}>
              <Text align="center">
                Don&apos;t have an account?{" "}
                <RouterLink to="/signup" style={{ color: "blue" }}>
                  Signup
                </RouterLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
