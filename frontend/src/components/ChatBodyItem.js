
import React from 'react';

const ChatBodyItem = ({ chat }) => {
  return (
    <div className="chat-body-item">
      <p className="con-icon">{chat.name[0]}</p>
      <div className="chat-info">
        <p className="con-title">{chat.name}</p>
        <p className="con-lastMessage">{chat.lastMessage}</p>
      </div>
      <p className="con-timestamp">{chat.timestamp}</p>
    </div>
  );
};

export default ChatBodyItem;