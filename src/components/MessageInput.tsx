'use client'
import { CornerDownRight } from 'lucide-react';
import React, { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useChat } from '@/context/ChatContext';
import axios from 'axios';

const MessageInput: React.FC = () => {
  const [input, setInput] = useState('');
  const { addMessage } = useChat();

  const handleSend = async () => {
    if (input.trim()) {
      const optimisticMessage = { user: true, text: input };
      addMessage(optimisticMessage);

      setInput('');

      try {
        const response = await axios.post('/api/chat', { message: input });
        const aiMessage = response.data.message;
        addMessage({ user: false, text: aiMessage });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <TooltipProvider>
      <div className="fixed bottom-0 w-full flex justify-center md:px-20">
        <div className="relative max-w-[1120px] flex max-h-60 w-full grow flex-col overflow-hidden bg-stone-100 dark:bg-slate-900 px-12 sm:rounded-t-3xl sm:px-12">
          <Textarea
            tabIndex={0}
            placeholder="ask your needs"
            className="w-full bg-transparent border-none resize-none px-4 py-[1.3rem] focus-within:outline-none sm:text-sm focus-visible:ring-0 shadow-none"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            name="message"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="absolute right-4 top-[13px] sm:right-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="submit"
                  size="icon"
                  disabled={input === ''}
                  className="shadow-none rounded-xl cursor-pointer"
                  onClick={handleSend}
                >
                  <CornerDownRight />
                  <span className="sr-only">Send message</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send message</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MessageInput;
