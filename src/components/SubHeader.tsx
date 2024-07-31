'use client';
import React, { useState } from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { Table2Icon, User } from 'lucide-react';
import Link from 'next/link';
import Sidebar from './SideBar'; // Import the Sidebar component

const SubHeader = () => {
  const [user, setUser] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-14 top-0 z-30 w-full backdrop-blur-lg transition-all pt-2">
      <MaxWidthWrapper>
        <div className="flex items-center justify-between ">
          <div>
            <Button size="icon" onClick={toggleSidebar}>
              <Table2Icon className="h-6" />
            </Button>
          </div>
          {user ? (
            <DropdownMenu dir="ltr">
              <DropdownMenuTrigger className="outline-none">
                <User className="border rounded-full" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login" className="text-sm font-medium text-center border py-1 px-2 rounded">
              Get Started
            </Link>
          )}
        </div>
      </MaxWidthWrapper>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} /> {/* Include Sidebar and pass props */}
    </div>
  );
};

export default SubHeader;
