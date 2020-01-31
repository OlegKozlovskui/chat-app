import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import './Messages.css';
import Message from '../Message/Message';

const Messages = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    {messages.map((m, i) => <div key={i}><Message message={m} name={name}/></div>)}
  </ScrollToBottom>
);

export default Messages;
