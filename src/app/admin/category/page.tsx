'use client'
import Sidebar from '@/components/admin/Sidebar'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import EditCategoryModal from '@/components/admin/EditCategoryModel';

const page = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setloading] = useState(false);
  const [categories, setcategories] = useState<any>([]);
  const [imagePreview, setImagePreview] = useState('');
  const [editCategoryId, setEditCategoryId] = useState('');
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const fetchCategories = async () => {
    try {
      // Make a GET request to fetch categories
      const response = await axios.get(`${apiUrl}/api/category/all`);
      // Set the fetched categories in state
      setcategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  const handleSubmit = async(e:any) => {
    e.preventDefault();
    if (name && image) {
      setloading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('name', name);
      formDataToSend.append('image', image);

      const response = await axios.post(`${apiUrl}/api/category/create`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        toast(
          {title: 'Success',
            description: 'Category created successfully.',
          }
        )
        setName('');
        setImage(null);
        setImagePreview('')
        fetchCategories();
        setloading(false);
      } else {
       toast({
        variant:'destructive',
        title: 'Error',
          description: 'Failed to create category. Please try again.',
       })
        setloading(false);
      }
    }else{
      toast({
        variant:'destructive',
        title: 'Error',
          description: 'Please fill in all required fields.',
      })
      setloading(false);
    }
  };
  const handleImageChange = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  const handleEdit =(id:any) =>{
    setEditCategoryId(id)
    setIsEditModalVisible(true)
  }
  const handleEditCancel = () => {
    setIsEditModalVisible(false)
    fetchCategories();
  };

  const handleDelete = async (categoryId:any) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this category?');
    if (!confirmDelete) {
        return; 
    }

    try {
        await axios.delete(`${apiUrl}/api/category/delete/${categoryId}`);

        fetchCategories();
    } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to delete category. Please try again.',
        })
    }
};

  return (
  <>
  <Toaster/>
    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[270px_1fr]">
    <div className="hidden border-r lg:block">
      <div className="flex flex-col gap-2">
        <Sidebar />
      </div>
    </div>
    <div className="flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
     <div>
   {loading ? (
      <div className="p-4 border-b max-w-2xl bg-stone-50 dark:bg-slate-950 rounded animate-pulse">
      <div className="mb-4 h-6 bg-slate-200 dark:bg-slate-700 rounded"></div>
      <div className="mb-4 h-10 bg-slate-200 dark:bg-slate-700 rounded"></div>
      <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
    </div>
   ):
   (  <form onSubmit={handleSubmit} className="p-4 border-b max-w-2xl bg-stone-50 dark:bg-slate-950 rounded">
    <div className="mb-4">
      <Label className="block text-sm font-medium">Category Name</Label>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mt-1 block w-full border rounded-md"
        
      />
    </div>
    <div className="mb-4">
      <Label className="block text-sm font-medium">Category Image</Label>
      <Input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mt-1 block w-full"
        
      />
    </div>
    {imagePreview && (
      <div className="mb-4">
        <img
          src={imagePreview}
          alt="Selected"
          className="h-32 object-cover rounded-md"
        />
      </div>
    )}
    <Button
      type="submit"
      size='sm'
      className="py-2 px-4 rounded-md"
    >
      Add Category
    </Button>
  </form>)}
  <div className="p-4">
  {categories.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {categories.map((category: any, index: any) => (
        <div key={index} className="flex items-center gap-4 mb-4 p-2 border rounded-md">
          <Image
            src={category?.imageUrl}
            alt={category.name}
            width={50}
            height={50}
            className="w-16 h-16 object-cover rounded-md"
          />
          <span className="text-lg font-medium">{category.name}</span>
          <div className="ml-auto flex gap-2">
            <Button
            size='sm'
            variant='ghost'
              onClick={() => handleEdit(category._id)}
            >
              Edit
            </Button>
            <Button
               size='sm'
            variant='destructive'
              onClick={() => handleDelete(category._id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p>No categories added yet.</p>
  )}
</div>

     </div>
    </div>
  </div>
  {isEditModalVisible && (   <EditCategoryModal visible={isModalVisible} id={editCategoryId} onCancel={handleEditCancel} />)}
  
  </>
  )
}

export default page
