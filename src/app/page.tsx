'use client'
import { useState } from 'react';
import { Send } from 'lucide-react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import MessageInput from '@/components/MessageInput';
import MessageContent from '@/components/MessageContent';

export default function Home() {


  return (
<>
<MaxWidthWrapper>
<MessageContent/>
    </MaxWidthWrapper>
    <MessageInput/></>
  );
}
