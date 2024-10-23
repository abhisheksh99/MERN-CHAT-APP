import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    console.log({ email, password });
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <VStack spacing={4} align="stretch" maxW="md" mx="auto" p={6} boxShadow="lg" borderRadius="md">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement>
            <IconButton
              aria-label="Toggle password visibility"
              icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
              onClick={toggleShowPassword}
              size="sm"
              variant="ghost"
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button colorScheme="blue" onClick={handleSubmit}>
        Login
      </Button>
      <Button variant="solid" colorScheme="red" width="100%" onClick={()=>{
        setEmail("guest@example.com")
        setPassword("123456")
      }} >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
