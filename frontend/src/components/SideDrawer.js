import React, { useState } from 'react';
import { Avatar } from "@chakra-ui/avatar";
import { Box, Text, Flex } from "@chakra-ui/layout";
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { IoSearchOutline } from "react-icons/io5";
import { 
    Tooltip, Button, Menu, MenuButton, MenuList, MenuItem, 
    Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, 
    DrawerFooter, Input, useDisclosure, useToast, MenuDivider
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useChatState } from '../context/ChatProvider';
import ProfileModal from './ProfileModal';
import ChatLoading from './ChatLoading';
import UserListItem from './UserListItem';

const SideDrawer = () => {
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useChatState();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    };

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please enter a search term.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`, // Fixed backticks
                },
            };
            const { data } = await axios.get(`/api/user?search=${search}`, config); // Fixed URL
            console.log("Search results:", data);
            setSearchResult(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast({
                title: "Error occurred.",
                description: "Failed to fetch users.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const accessChat = async (userId) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`, // Fixed backticks
                },
            };

            const { data } = await axios.post("/api/chat", { userId }, config); // Missing async and corrected headers
            console.log("Chat accessed:", data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast({
                title: "Error occurred.",
                description: "Failed to access the chat.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Box 
                as={Flex} 
                justifyContent="space-between" 
                alignItems="center" 
                bg="white" 
                w="100%" 
                p="5px 10px" 
                borderBottom="1px solid #E2E8F0" 
                boxShadow="0 2px 4px rgba(0,0,0,0.1)"
            >
                <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
                    <Button variant="ghost" colorScheme="teal" leftIcon={<IoSearchOutline />} onClick={onOpen}>
                        <Text display={{ base: "none", md: "flex" }} px="4">Search User</Text>
                    </Button>
                </Tooltip>
                <Text fontSize="2xl" fontFamily="Work sans" fontWeight="bold" color="teal.500">
                    ChatApp
                </Text>
                <Flex alignItems="center">
                    <Menu>
                        <MenuButton as={Button} bg="white" p="0" _hover={{ bg: "gray.100" }}>
                            <BellIcon fontSize="2xl" m={1} color="teal.500" />
                        </MenuButton>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} bg="white" p="0" ml="2" _hover={{ bg: "gray.100" }}>
                            <Flex alignItems="center">
                                <Avatar size="sm" cursor="pointer" name={user?.name} src={user?.pic} mr="2" />
                                <ChevronDownIcon fontSize="lg" color="teal.500" />
                            </Flex>
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user}>
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Box>

            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
                        <DrawerBody>
                            <Box display="flex" pb={2}>
                                <Input 
                                    placeholder="Search by name or email" 
                                    mr={2} 
                                    value={search} 
                                    onChange={(e) => setSearch(e.target.value)} 
                                    focusBorderColor="teal.400"
                                />
                                <Button onClick={handleSearch} isLoading={loading}>Go</Button>
                            </Box>
                            {loading ? (
                                <ChatLoading />
                            ) : (
                                searchResult?.map(user => (
                                    <UserListItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => accessChat(user._id)}
                                    />
                                ))
                            )}
                        </DrawerBody>
                        <DrawerFooter>
                            <Button variant="outline" mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    );
};

export default SideDrawer;
