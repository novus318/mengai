'use client'
import Sidebar from '@/components/admin/Sidebar'
import { withAuth } from '@/components/admin/withAuth'
import { toast } from '@/components/ui/use-toast'
import axios from 'axios'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Banknote, Clipboard, DoorClosed, Package, ShoppingBag, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface Order {
  _id: string;
  products: Product[];
  total: number;
  paymentMethod: string;
  user: {
    _id: string;
    name: string;
    phone: number;
    map: string;
    address: string;
  };
  createdAt: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  offer: number;
  quantity: number;
  size: string;
  code: string;
  color: string;
}

export default withAuth(function Dashboard() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [totalOrdersThisMonth, setTotalOrdersThisMonth] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [topProducts, setTopProducts] = useState([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  useEffect(() => {
    getTotalOrdersThisMonth();
    getTotalProducts()
    getTotalUsers()
    getTotalRevenue()
    getTopProducts()
    getOrders()
  }, []);

  const getTotalOrdersThisMonth = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/order/getMonth`);
      if (response.data.success) {
        setTotalOrdersThisMonth(response.data.totalOrders);

      }
    } catch (error) {

    }
  };
  const getOrders = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/order/recentOrders`);
      if (response.data.success) {
        setOrders(response.data.orders);

      }
    } catch (error) {

    }
  };
  const getTotalProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/product/count`);
      if (response.data.success) {
        setTotalProducts(response.data.totalCount);

      }
    } catch (error) {

    }
  };
  const getTotalUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/auth/count`);
      if (response.data.success) {
        setTotalUsers(response.data.totalCount);

      }
    } catch (error) {

    }
  };
  const getTotalRevenue = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/order/revenue`);
      if (response.data.success) {
        setTotalRevenue(response.data.total);

      }
    } catch (error) {

    }
  };

  const getTopProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/product/topSell`);
      if (response.data.success) {
        setTopProducts(response.data.products);
      }
    } catch (error) {

    }
  };

  const formatDateTime = (dateTime: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true, // Use 12-hour format
    };

    return new Date(dateTime).toLocaleString(undefined, options);
  };
  const handleViewClick = (order: Order) => {
    setSelectedOrder(order)
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setSelectedOrder(null);
    setModalVisible(false);
  };

  return (
    <>
      <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[270px_1fr]">
        <div className="hidden border-r  lg:block">
          <div className="flex flex-col gap-2">
            <Sidebar />
          </div>
        </div>
        <div className="flex flex-col">
          <main className="flex flex-1 flex-col gap-4 p-1 md:gap-8 md:p-6">
            <div className="border shadow-sm rounded-lg p-2  my-2 mx-2">
              <div className="flex items-center justify-between px-4 py-6  my-2">
                <div className="grid gap-1">
                  <h2 className="text-2xl font-bold">Welcome back, Admin!</h2>
                  <p className="text-slate-500">Here is a quick overview of your store.</p>
                </div>
              </div>
              <hr />
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                <div className="flex flex-col gap-2 p-4 rounded-md bg-stone-50 dark:bg-slate-900">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-6 w-6 text-primary" />
                    <h3 className="text-lg font-semibold">Orders</h3>
                  </div>
                  <div className="text-4xl font-bold">{totalOrdersThisMonth}</div>
                  <p className="text-slate-500">Total orders this month</p>
                </div>
                <div className="flex flex-col gap-2 p-4 rounded-md bg-stone-50 dark:bg-slate-900">
                  <div className="flex items-center gap-2">
                    <Users className="h-6 w-6 text-primary" />
                    <h3 className="text-lg font-semibold">Customers</h3>
                  </div>
                  <div className="text-4xl font-bold">{totalUsers}</div>
                  <p className="text-slate-500">Total customers</p>
                </div>
                <div className="flex flex-col gap-2 p-4 rounded-md bg-stone-50 dark:bg-slate-900">
                  <div className="flex items-center gap-2">
                    <Package className="h-6 w-6 text-primary" />
                    <h3 className="text-lg font-semibold">Products</h3>
                  </div>
                  <div className="text-4xl font-bold">{totalProducts}</div>
                  <p className="text-slate-500">Total products in stock</p>
                </div>
                <div className="flex flex-col gap-2 p-4 rounded-md bg-stone-50 dark:bg-slate-900">
                  <div className="flex items-center gap-2">
                    <Banknote className="h-6 w-6 text-primary" />
                    <h3 className="text-lg font-semibold">Revenue</h3>
                  </div>
                  <div className="text-4xl font-bold">{totalRevenue.toFixed(1)}</div>
                  <p className="text-slate-500">Total revenue this month</p>
                </div>
              </div>
              <div className="border shadow-sm rounded-lg p-2 my-2">
                <div className="flex items-center justify-between px-4 py-6">
                  <div className="grid gap-1">
                    <h2 className="text-2xl font-bold">Recent Orders</h2>
                    <p className="text-slate-500 dark:text-slate-400">View and manage your recent orders.</p>
                  </div>
                  <Link href='/admin/orders'>
                    View All Orders
                  </Link>
                </div>
                <hr />
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-stone-50 dark:bg-slate-900">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">ORDER ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">DATE & TIME</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">CUSTOMER</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">PHONE NUMBER</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">MAP</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Total</th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 text-start">
                    {orders?.map(order => (
                      <tr key={order._id}>
                        <td className="px-6 py-4 whitespace-nowrap">{order._id.substring(16)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{formatDateTime(order.createdAt)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{order.user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">+971 {order.user.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap">   <CopyToClipboard text={`${order.user.map}`}>
                          <button className="text-slate-500 bg-gray-200 px-2 py-1 rounded-md hover:text-green-600 flex items-center space-x-1" onClick={() => toast(
                            {
                              title: 'Copied to clipboard',
                              description: 'Map link has been copied to clipboard.',
                              duration: 2000,
                            }
                          )}>
                            <Clipboard className="w-4 h-4" />
                          </button>
                        </CopyToClipboard></td>
                        <td className="px-6 py-4 whitespace-nowrap">AED {order.total.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button onClick={() => handleViewClick(order)} className="text-slate-600 hover:text-slate-900 py-1 px-2 bg-gray-100 hover:bg-gray-200 rounded-md me-1">View</button>
                          <Link href={`/admin/bill/${order._id}`} target="_blank">
                            <button className="text-green-600 hover:text-green-700 py-1 px-2 bg-gray-100 hover:bg-gray-200 rounded-md me-1">Print</button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border shadow-sm rounded-lg p-2 my-2">
                <div className="flex items-center justify-between px-4 py-6">
                  <div className="grid gap-1">
                    <h2 className="text-2xl font-bold">Top Selling Products</h2>
                    <p className="text-slate-500 dark:text-slate-400">View your best-selling products.</p>
                  </div>
                  <Link href='/admin/products'>
                    View All Products
                  </Link>
                </div>
                <hr />
                <div className="flex flex-wrap justify-start gap-4 mt-2">
                  {topProducts?.map((item: any) => (
                    <Link className='w-[47%] sm:w-1/2 md:w-1/4 lg:w-[15%]' href={`/product/${item._id}`} key={item._id}>
                      <div
                        key={item._id}
                        className={`relative bg-gray-100 bg-opacity-85 rounded-md overflow-hidden shadow-sm transform transition-transform duration-300 hover:shadow-md ${item.quantity === 0 ? 'opacity-50' : ''
                          }`}
                      >
                        {item.offerPercentage > 0 && (
                          <div className="absolute top-2 right-2 bg-red-500 o text-white rounded-full p-1 text-sm font-semibold">
                            {item.offerPercentage}% OFF
                          </div>
                        )}
                        <Image
                          height={800}
                          width={500}
                          src={item.images?.image1}
                          alt={item.name}
                          className="w-full object-cover h-full hover:scale-105"
                        />
                        <div className="p-2">
                          <h3 className="font-semibold uppercase text-xs md:text-sm lg:text-base">
                            {item.name.length > 15 ? `${item.name.substring(0, 15)}...` : item.name}
                          </h3>
                          <div className="flex items-center mb-2">
                            {item.offerPercentage > 0 ? (
                              <>
                                <h3 className="font-semibold uppercase text-xs md:text-sm lg:text-base">
                                  <span className="line-through text-[#c3c3c3c7]">AED {item.price}</span>
                                  &nbsp;
                                  AED {(item.price - (item.price * item.offerPercentage) / 100).toFixed(2)}
                                </h3>
                              </>
                            ) : (
                              <h3 className="font-semibold uppercase text-xs md:text-sm lg:text-base">
                                AED {item.price.toFixed(2)}
                              </h3>
                            )}
                          </div>

                        </div>
                      </div>
                    </Link>
                  ))}

                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      {modalVisible && selectedOrder && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle">
              <div className="bg-gray-50 px-4 py-5 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-slate-900">Ordered Products</h3>
                <button onClick={handleCloseModal} className="text-slate-500 hover:text-slate-700">
                  <DoorClosed className="w-6 h-6" />
                </button>
              </div>
              <div className="px-4 py-5 sm:px-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-2 sm:px-4 md:px-6 py-3 text-left text-xs sm:text-sm md:text-base font-medium text-slate-500 uppercase tracking-wider">Code</th>
                      <th className="px-2 sm:px-4 md:px-6 py-3 text-left text-xs sm:text-sm md:text-base font-medium text-slate-500 uppercase tracking-wider">Name</th>
                      <th className="px-2 sm:px-4 md:px-6 py-3 text-left text-xs sm:text-sm md:text-base font-medium text-slate-500 uppercase tracking-wider">Size</th>
                      <th className="px-2 sm:px-4 md:px-6 py-3 text-left text-xs sm:text-sm md:text-base font-medium text-slate-500 uppercase tracking-wider">Color</th>
                      <th className="px-2 sm:px-4 md:px-6 py-3 text-left text-xs sm:text-sm md:text-base font-medium text-slate-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-2 sm:px-4 md:px-6 py-3 text-left text-xs sm:text-sm md:text-base font-medium text-slate-500 uppercase tracking-wider">Price</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedOrder.products.map((product) => (
                      <tr key={product._id}>
                        <td className="px-2 sm:px-4 md:px-6 py-4 whitespace-nowrap">{product.code}</td>
                        <td className="px-2 sm:px-4 md:px-6 py-4 whitespace-nowrap">{product.name}</td>
                        <td className="px-2 sm:px-4 md:px-6 py-4 whitespace-nowrap">{product.size}</td>
                        <td className="px-2 sm:px-4 md:px-6 py-4 whitespace-nowrap">{product.color}</td>
                        <td className="px-2 sm:px-4 md:px-6 py-4 whitespace-nowrap">{product.quantity}</td>
                        {product.offer ? (<td className="px-2 sm:px-4 md:px-6 py-4 whitespace-nowrap">AED {(((100 - product.offer) / 100) * product.price
                    ).toFixed(2)}</td>):(
                        <td className="px-2 sm:px-4 md:px-6 py-4 whitespace-nowrap">AED {product.price.toFixed(2)}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4">
                  <h4 className="text-lg font-medium text-slate-900">Customer Details</h4>
                  <p className="mt-2"><strong>Name:</strong> {selectedOrder.user.name}</p>
                  <p className="mt-1"><strong>Phone:</strong> +971 {selectedOrder.user.phone}</p>
                  <p className="mt-1"><strong>Address:</strong> {selectedOrder.user.address}</p>
                  <p className="mt-1"><strong>Total:</strong> AED {selectedOrder.total.toFixed(2)}</p>
                  <p className="mt-1"><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
})
