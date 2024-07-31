import { ScrollArea } from '@radix-ui/react-scroll-area';
import React, { useState } from 'react';


const MessageContent = () => {
    const [messages, setMessages] = useState([
        { text: 'Hello! How can I help you today?', user: false },
        { text: 'I would like to know more about your services.', user: true },
        { text: 'Sure! We offer a variety of services to cater to your needs.', user: false },
       { text: 'Sure! We offer a variety of services to cater to your needs.', user: false },
        { text: 'I would like to know more about your services.', user: true },
        { text: 'Sure! We offer a variety of services to cater to your needs.', user: false },
      ]);
      const [input, setInput] = useState('');
   
  return (
      <div className="flex flex-col bg-stone-50 dark:bg-slate-950 pb-14">
      <div className="flex-grow overflow-y-auto p-4">
        <ScrollArea className='min-h-[78vh]'>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.user ? 'justify-end' : 'justify-start'} mb-3`}
          >
            <div
              className={`max-w-xs py-2 px-3 rounded-2xl text-xs md:text-sm ${
                message.user ? 'bg-slate-950 text-white dark:bg-stone-50 dark:text-slate-950 rounded-tr-none' : 'bg-gray-300 text-black dark:bg-slate-800 dark:text-white rounded-tl-none'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export default MessageContent;
