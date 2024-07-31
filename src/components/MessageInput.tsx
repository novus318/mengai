import { Send } from 'lucide-react';
import React, { useState } from 'react'
import { Input } from './ui/input';

const MessageInput = () => {

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, user: true }]);
      setInput('');
    }
  };
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you today?', user: false },
    { text: 'I would like to know more about your services.', user: true },
    { text: 'Sure! We offer a variety of services to cater to your needs.', user: false },
    { text: 'I would like to know more about your services.', user: true },
    { text: 'Sure! We offer a variety of services to cater to your needs.', user: false },
    { text: 'I would like to know more about your services.', user: true },
    { text: 'Sure! We offer a variety of services to cater to your needs.', user: false },
  ]);
  const [input, setInput] = useState('');
  return (
    <div className="fixed bottom-0 w-full flex justify-center">
      <div className="w-full max-w-[1120px] rounded-t-3xl  p-4 flex items-center bg-stone-200 dark:bg-slate-800">
           <Input
          type="text"
          placeholder="ask your needs..."
          autoComplete="off"
          spellCheck="false"
          autoFocus={true}
          className="flex-grow border border-none outline-none rounded-lg mr-2 p-2 bg-slate-50 dark:bg-slate-50"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-700">
          <Send className="w-6 h-6" />
        </button>
      </div>
      </div>
  )
}

export default MessageInput
