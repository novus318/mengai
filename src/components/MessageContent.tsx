'use client'
import { useChat } from '@/context/ChatContext';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import React, { useEffect, useRef } from 'react';

const MessageContent = () => {
  const { messages } = useChat();
  const messagesEndRef:any = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView?.({ behavior: 'smooth' });
  }, [messages]);

  const getMessageClass = (index: number, user: boolean) => {
    const isFirst = index === messages.length - 1;
    const isLast = index === 0;
    
    if (user) {
      if (isFirst) return 'rounded-br-none';
      if (isLast) return 'rounded-tr-none';
      return 'rounded-r-none';
    } else {
      if (isFirst) return 'rounded-bl-none';
      if (isLast) return 'rounded-tl-none';
      return 'rounded-l-none';
    }
  };

  return (
    <div className="flex flex-col bg-stone-50 dark:bg-slate-950 pb-14">
      <div className="flex-grow overflow-y-auto p-4">
        <ScrollArea className="min-h-[79vh] flex flex-col-reverse">
          <div ref={messagesEndRef} />
          {messages.slice().reverse().map((message, index) => (
            <div
              key={index}
              className={`flex ${message.user ? 'justify-end' : 'justify-start'} mb-1`}
            >
              <div
                className={`max-w-xs py-2 px-3 rounded-2xl text-xs md:text-sm ${
                  message.user
                    ? `bg-slate-950 text-white dark:bg-stone-50 dark:text-slate-950 ${getMessageClass(index, true)}`
                    : `bg-gray-300 text-black dark:bg-slate-800 dark:text-white ${getMessageClass(index, false)}`
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
