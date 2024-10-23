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

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = () => {
    console.log({ name, email, password, confirmPassword, image });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <VStack spacing={4} align="stretch" maxW="md" mx="auto" p={6} boxShadow="lg" borderRadius="md">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

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

      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement>
            <IconButton
              aria-label="Toggle confirm password visibility"
              icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
              onClick={toggleShowConfirmPassword}
              size="sm"
              variant="ghost"
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="image">
        <FormLabel>Upload your image</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={handleImageUpload}
        />
      </FormControl>

      <Button colorScheme="blue" onClick={handleSubmit}>
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
