'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-react'
import MaxWidthWrapper from './MaxWidthWrapper'

const Header = () => {
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
    const toggleDarkMode = () => {
        document.documentElement.classList.toggle('dark')
        setIsDarkMode(!isDarkMode)
      }
  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b  backdrop-blur-lg transition-all'>
   <MaxWidthWrapper>
   <div className='flex h-14 items-center justify-between border-b '>
        <Link
          href='/' className='px-8'>
         <Image 
         src={isDarkMode ? '/mengai-dark.svg' : '/mengai.svg'}
          alt='Logo' width={100} height={100} className='h-24'/>
        </Link>


        <div className='hidden items-center space-x-4 sm:flex'>
        <Button
          onClick={toggleDarkMode}
        >
           {isDarkMode ? (
            <Sun className='w-6 h-6 transition-transform duration-300' />
          ) : (
            <Moon className='w-6 h-6 transition-transform duration-300' />
          )}
        </Button>
        </div>
      </div>
   </MaxWidthWrapper>
  </nav>
  )
}

export default Header
