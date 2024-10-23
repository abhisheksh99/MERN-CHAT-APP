import { Container, Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/SignUp";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate()

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"))
    if(user){
      navigate("/chats")
    }
  },[navigate])
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={5}
        bg="gray.100"
        w="100%"
        mt="40px"
        mb="15px"
        borderRadius="lg"
        boxShadow="md"
      >
        <Text fontSize="4xl" fontWeight="bold" color="teal.600" fontFamily="Work sans">
          ChatApp
        </Text>
      </Box>
      <Box bg="white" w="100%" p={6} borderRadius="lg" boxShadow="lg">
        <Tabs variant="soft-rounded" colorScheme="teal" isFitted>
          <TabList mb="1em">
            <Tab _selected={{ color: "white", bg: "teal.500" }}>Login</Tab>
            <Tab _selected={{ color: "white", bg: "teal.500" }}>Sign Up</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomeScreen;
