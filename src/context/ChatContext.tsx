// context/ChatContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface Message {
  user: boolean;
  text: string;
}

interface ChatContextProps {
  messages: Message[];
  addMessage: (message: Message) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const useChat = (): ChatContextProps => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hello! How can I help you today?', user: false },
    { text: 'I would like to know more about your services.', user: true },
    { text: 'Sure! We offer a variety of services to cater to your needs.', user: false },
   { text: 'Sure! We offer a variety of services to cater to your needs.', user: false },
    { text: 'I would like to know more about your services.', user: true },
    
  ]);

  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
};
