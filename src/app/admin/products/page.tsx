'use client'
import Sidebar from '@/components/admin/Sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import axios from 'axios'
import { CopyIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

const Page = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/product/getAll`);
      setProducts(response.data.products);
      setFilteredProducts(response.data.products);
      setCount(response.data.totalCount);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product:any) =>
        product?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product?.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  return (
    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[270px_1fr]">
      <div className="hidden border-r lg:block">
        <div className="flex flex-col gap-2">
          <Sidebar />
        </div>
      </div>
      <div className="flex flex-col p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Products</h1>
          <div className='flex justify-between mx-5 items-center'>
            {products?.length === count && (
              <div className="flex justify-center my-4">
                <Input
                  type="text"
                  placeholder="Search by name or code"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}
          </div>
          <Link href="/admin/products/create" className="bg-slate-950 dark:bg-slate-900 text-white py-1 px-2 rounded-md">Create Product</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {filteredProducts?.map((product:any, index) => (
            <Card key={index} className="flex flex-col rounded-md hover:shadow-lg transition-shadow duration-200">
              <CardContent>
              <Link href={`/admin/editProduct/${product._id}`}>
                  <Image
                    alt="Product Image"
                    className="object-cover rounded-md"
                    src={product.images?.image1}
                    width={800}
                    height={1200}
                  />
                </Link>
                <h3 className="text-sm font-semibold truncate p-1">
                  Product code : {product?.code}
                </h3>
              </CardContent>
 <CardFooter className='justify-between'>
                  <span className="text-sm font-bold">AED {product.price}</span>
                  <CopyToClipboard text={`https://www.tlonline.shop/product/${product._id}`}>
                    <Button aria-label='copy' 
                    size='icon'
                     onClick={() => toast({
                      title: 'Copied to clipboard',
                      description: 'Link has been copied to clipboard.',
                      duration: 2000,
                    })}>
                      <CopyIcon className="w-4 h-4" />
                    </Button>
                  </CopyToClipboard>
 </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page
