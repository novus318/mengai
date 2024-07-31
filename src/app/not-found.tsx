'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const NotFound = () => {
    const navigate = useRouter();

    useEffect(() => {
      const timer = setTimeout(() => {
        navigate.push('/');
      }, 2000);
  
      return () => clearTimeout(timer); // Cleanup the timer if the component is unmounted
    }, [navigate]);
  return (
    <>
       <div className="flex flex-col items-center justify-center  px-4 py-12 min-h-[30vh] md:min-h-[80vh]">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Oops! Page not found.
        </h1>
        <p className="mt-4">
          The page you are looking for does not exist or has been moved.
        </p>
        <p className="mt-4">
         Being redirected...
        </p>
      </div>
    </div>
    </>
  )
}

export default NotFound
