import Sidebar from '@/components/SideBar';
import { withAuth } from '@/components/admin/withAuth';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { toast } from '../ui/use-toast';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';


interface FormValues {
  name: string;
  types: string[];
  sizeChart: File | null;
}

const EditCategoryModal = ({ onCancel,id }: any) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [catImageUrl, setCatImageUrl] = useState('');
  const [Spin, setSpin] = useState(false)
  const [formData, setFormData] = useState<FormValues>({ name: '', types: [''], sizeChart: null });


  useEffect(() => {
    // Fetch category details when the modal is mounted
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/category/get/${id}`);
        const categoryData = response.data;
        console.log(categoryData)
        // Set the fetched category data in the form fields
        setFormData({
          name: categoryData.category?.name,
          types: categoryData.category?.types,
          sizeChart: null // Assuming size chart won't be fetched here, otherwise set the appropriate value
        });
        setCatImageUrl(categoryData.category.imageUrl)
      } catch (error) {
        console.error('Error fetching category:', error);
        toast({
            variant: 'destructive',
          title: 'Error',
          description: 'Failed to fetch category. Please try again.',
        })
      }
    };

    fetchCategory();
  }, [apiUrl, id]);
  const handleCancel = () => {
    setCatImageUrl('')
    onCancel();
    setImageUrl(null);
    setFormData({ name: '', types: [''], sizeChart: null });
  };

  const handleSubmit = async () => {
    try {
  
      setSpin(true);
  
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('types', JSON.stringify(formData.types));
      formDataToSend.append('image', (formData.sizeChart as any));
  
      const response = await axios.put(`${apiUrl}/api/category/update/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        toast({
            title: 'Success',
            description: 'Category updated successfully.',
        })
        handleCancel();
      } else {
        toast({
            variant: 'destructive',
          title: 'Error',
          description: 'Failed to update category. Please try again.',
        })
      }
  
      setSpin(false);
    } catch (error) {
      console.error('Error updating category:', error);
      toast({
        variant: 'destructive',
          title: 'Error',
          description: 'Failed to update category. Please try again.',
      })
      setSpin(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image')) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Invalid file type. Please select an image file.',
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        setFormData({ ...formData, sizeChart: file });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
    {Spin ?
    ( <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-slate-600 opacity-75"></div>
      </div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div className="inline-block align-bottom  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <div className="flex justify-center items-center py-56 gap-4">
      <div className="animate-spin rounded-full border-t-4 border-[#1a1a1a] border-opacity-60 border-b-2 h-5 w-5"></div>
    </div>
      </div>
    </div>
  </div>):( <>
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-slate-600 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full bg-slate-50 dark:bg-slate-900">
          <div className=" px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium">Edit Category</h3>
          </div>
          <div className=" px-4 py-5 sm:p-6">
            <form>
              <div>
                <Label htmlFor="name" className="block text-sm font-medium">Category Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter category name"
                  className="border  p-2 w-full rounded-md"
                />
              </div>
              <div className="mt-4">
          <Label htmlFor="categoryImage" className="cursor-pointer border  rounded-md p-2 mt-2 block">
            {imageUrl || catImageUrl ? 'Change Image' : 'Upload Image'}
            <Input
              type="file"
              id="categoryImage"
              name="categoryImage"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </Label>
          {imageUrl ? (
            <Image src={imageUrl} alt="Uploaded Size Chart" className="w-32 mt-2" height={300} width={500}/>
          ):(
            <Image src={catImageUrl} alt="Uploaded Size Chart" className="w-32 mt-2" height={300} width={500}/>
          )}
        </div>
            </form>
          </div>
          <div className=" px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse gap-3">
            <Button
              type="button"
              onClick={handleSubmit}
            size='sm'
            variant='secondary'
            >
              Submit
            </Button>
            <Button
              type="button"
              onClick={handleCancel}
            size='sm'
            variant='destructive'
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
    </>)}
 </>
  );
};

export default withAuth(EditCategoryModal);
