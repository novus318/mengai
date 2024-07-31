'use client'
import { Loader2 } from 'lucide-react';
import React from 'react';
const Spinner = () => {
  return (
    <>
    <div className="flex justify-center items-center h-screen gap-4">
    <Loader2 className='h-8 w-8  animate-spin'/>
    </div>
    </>
  );
};

export default Spinner;
