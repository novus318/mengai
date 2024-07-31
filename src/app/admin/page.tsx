'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [pin, setPin] = useState('');
  const [Spin, setSpin] = useState(false)

  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const classList = document.documentElement.classList
    setIsDarkMode(classList.contains('dark'))

    const observer = new MutationObserver(() => {
      setIsDarkMode(classList.contains('dark'))
    })

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])


const handleSubmit = async (event:any) => {
  event.preventDefault();

  try {
   setSpin(true)
    const encodedPin = encodeURIComponent(pin);
    const response = await axios.post(`${apiUrl}/api/auth/verify`, { pin: encodedPin });
        
    if (response.data.success) {
      localStorage.setItem('pin', pin);
      router.push('/');
      setSpin(false)
    } else {
      console.error('Verification failed');
    }
  } catch (error) {
    console.error('Error:', error);
  }
  
};

useEffect(() => {
  const storedPin = localStorage.getItem('pinw');
  if (storedPin) {
    router.push('/');
  }
}, []); 
  return (
    <div className="flex items-center justify-center h-[80vh] text-white">
    <div className="dark:bg-slate-950 bg-stone-50 p-8 rounded shadow-md max-w-4xl mx-3">
      <div className="flex justify-center mb-10 border p-4 rounded-md bg-slate-950 dark:bg-stone-50">
       <img src={isDarkMode ? '/mengai.svg': '/mengai-dark.svg'} alt="" className='h-10' />
      </div>
      <h2 className="text-3xl text-slate-950 dark:text-stone-50 font-bold mb-6">Welcome to Admin</h2>
      <form >
        <div className="mb-4">
          <Input
            type="password"
            placeholder="Enter your pin"
            className="w-full text-black"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          className="w-full  focus:outline-none"
        >
          Login
        </Button>
      </form>
    </div>
  </div>
  )
}

export default page
