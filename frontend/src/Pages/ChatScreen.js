import React from 'react';
import { useChatState } from '../context/ChatProvider';
import SideDrawer from '../components/SideDrawer';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';
import { Box } from '@chakra-ui/react';

const ChatScreen = () => {
    const {user}= useChatState()


    return (
        <div style={{width:"100%"}}>
            {user && <SideDrawer/>}
            <Box d="flex" justifyContent="space-between" w="100%"  h="91.5vh" p="10">
                {user && <MyChats />}
                {user && <ChatBox />}
            </Box>


        </div>
    );
};

export default ChatScreen;