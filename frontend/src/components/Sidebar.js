// Sidebar.js
import React, { useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NightlightIcon from "@mui/icons-material/Nightlight";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import "./myStyles.css";
import ChatBodyItem from "./ChatBodyItem";

const Sidebar = () => {
  const currentYear = new Date().getFullYear();
  const [chats, setChats] = useState([
    {
      name: "Alice Johnson",
      lastMessage: "Hey, how's it going?",
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toLocaleString()
    },
    {
      name: "Bob Smith",
      lastMessage: "Did you see the latest update?",
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toLocaleString()
    },
    {
      name: "Charlie Brown",
      lastMessage: "Let's catch up soon!",
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toLocaleString()
    }
  ]);

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <div>
          <IconButton>
            <AccountCircle />
          </IconButton>
        </div>
        <div>
          <IconButton>
            <PersonAddIcon />
          </IconButton>
          <IconButton>
            <GroupAddIcon />
          </IconButton>
          <IconButton>
            <AddCircleIcon />
          </IconButton>
          <IconButton>
            <NightlightIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar-search">
        <IconButton>
          <SearchIcon />
        </IconButton>
        <input placeholder="Search" className="search-box" />
      </div>
      <div className="sidebar-body">
        {chats.map((chat, index) => (
          <ChatBodyItem key={index} chat={chat} />
        ))}
      </div>
      <div className="sidebar-footer">QuickChat © {currentYear}</div>
    </div>
  );
};

export default Sidebar;