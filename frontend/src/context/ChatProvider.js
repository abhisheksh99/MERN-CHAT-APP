import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

// Create a context for Chat, which will hold chat-related data
const ChatContext = createContext(); // Initialize ChatContext

// Create a ChatProvider component that wraps its children
const ChatProvider = ({ children }) => {
    const [user, setUser] = useState(); 
    const [selectedChat,setSelectedChat] =useState()
    const [chats,setChats] = useState()
    const navigate = useNavigate(); 

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        if (!userInfo) {
            navigate("/"); 
        }
    }, [navigate]); 

    return (
        <ChatContext.Provider value={{ user, setUser ,selectedChat,setSelectedChat,chats,setChats}}>
            {children}
        </ChatContext.Provider>
    );
}

// Custom hook to use the ChatContext
export const useChatState = () => {
    return useContext(ChatContext);
}

export default ChatProvider;