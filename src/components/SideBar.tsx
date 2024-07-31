import React from 'react';
import { HomeIcon, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

const Sidebar = ({ isOpen, onClose }:any) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-1/6 bg-white dark:bg-slate-900 shadow-lg z-40 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="flex justify-end p-4">
        <button onClick={onClose}>
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex  border-b px-4 min-h-[85vh] lg:px-6">
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <HomeIcon className="h-4 w-4" />
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
