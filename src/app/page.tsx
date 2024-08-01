'use client'
import { ChatProvider } from '@/context/ChatContext';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import MessageInput from '@/components/MessageInput';
import MessageContent from '@/components/MessageContent';

export default function Home() {
  return (
    <ChatProvider>
      <MaxWidthWrapper>
        <MessageContent />
      </MaxWidthWrapper>
      <MessageInput />
    </ChatProvider>
  );
}
