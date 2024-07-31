import React from 'react';
import Link from 'next/link';
import { Home, LayoutPanelTop, Package, ShoppingBag, User } from 'lucide-react';
import { usePathname } from 'next/navigation';



const Sidebar: React.FC = () => {


  const isCurrentPage = (path: string): boolean => {
    const pathname = usePathname()
    return pathname === path;
  };


  return (
    <div className="hidden border-r bg-stone-50 dark:bg-slate-950 lg:block min-h-screen fixed top-0 left-0 bottom-0 w-1/6 pt-16">
        <div className="flex flex-col gap-2">
          <div className="flex-1">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className={`flex items-center gap-3 rounded-lg ${isCurrentPage('/admin/dashboard') && 'bg-gray-100 text-gray-900'} px-3 py-2 transition-all hover:text-slate-500`}
                href="/admin/dashboard"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link
                className={`flex items-center gap-3 rounded-lg ${isCurrentPage('/admin/orders') && 'bg-gray-100 text-gray-900'} px-3 py-2 transition-all hover:text-slate-500`}
                href="/admin/orders"
              >
                <ShoppingBag className="h-4 w-4" />
                Orders
              </Link>
              <Link
                className={`flex items-center gap-3 rounded-lg ${isCurrentPage('/admin/category') && 'bg-gray-100 text-gray-900'} px-3 py-2 transition-all hover:text-slate-500`}
                href="/admin/category"
              >
                <LayoutPanelTop className="h-4 w-4" />
                Category
              </Link>
              <Link
                className={`flex items-center gap-3 rounded-lg ${isCurrentPage('/admin/products') && 'bg-gray-100 text-gray-900'} px-3 py-2 transition-all hover:text-slate-500`}
                href="/admin/products"
              >
                <Package className="h-4 w-4" />
                Products
              </Link>
              <Link
                className={`flex items-center gap-3 rounded-lg ${isCurrentPage('/admin/customers') && 'bg-gray-100 text-gray-900'} px-3 py-2 transition-all hover:text-slate-500`}
                href="/admin/customers"
              >
                <User className="h-4 w-4" />
                Customers
              </Link>
            </nav>
          </div>
        </div>
      </div>
  );
};

export default Sidebar;
