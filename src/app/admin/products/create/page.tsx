'use client'
import React, { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';

import Spinner from '@/components/Spinner';
import { withAuth } from '@/components/admin/withAuth';

import Link from 'next/link';
import { toast } from '@/components/ui/use-toast';
import { ArrowBigLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface CategoryData {
  _id: string;
  name: string;
  types: string[];
}

interface ProductData {
  name: string;
  code: string;
  price: number;
  description: string;
  specifications: string[];
  sizes: [];
  type: string;
  offerPercentage: number;
  images: [
    {
      image: File | null,
      imageName: string,
    },
  ];
  category: CategoryData;
}

const CreateProduct = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<any>({
    name: '',
    code: '',
    description: '',
    price: 0,
  offerPercentage: 0,
  });
  const [images, setImages] = useState<ProductData['images']>([{ image: null, imageName: '' }]);
  const [specifications, setSpecifications] = useState<string[]>(['']);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null);
  const [selectedType, setSelectedType] = useState<string>('');

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
 

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleImageChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const newImages:any = [...images];
    newImages[index].image = e.currentTarget.files?.[0] || null;
    setImages(newImages);
  };

  const handleImageNameChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const newImages:any = [...images];
    newImages[index].imageName = e.target.value;
    setImages(newImages);
  };

  const addImage = () => {
    if (images.length < 7) {
      setImages([...images, { image: null, imageName: '' }]as any);
    }
  };
  const handleRemoveImage = (index: number) => {
    const newImages:any = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSpecChange = (e: ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const newSpecifications = [...specifications];
    newSpecifications[index] = e.target.value;
    setSpecifications(newSpecifications);
  };

  const handleRemoveSpecification = (index: number) => {
    const newSpecifications = [...specifications];
    newSpecifications.splice(index, 1);
    setSpecifications(newSpecifications);
  };

  const handleAddSpecification = () => {
    if (specifications.length < 4) {
      setSpecifications([...specifications, '']);
    }
  };

  const handleSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSizes([...selectedSizes, value]);
    } else {
      setSelectedSizes(selectedSizes.filter((size) => size !== value));
    }
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = categories.find(category => category._id === selectedCategoryId) || null;
    setSelectedCategory(selectedCategory);
    setSelectedType('');
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();

      images.forEach((image, index) => {
        if (image.image) {
          const blob = new Blob([image.image], { type: image.image.type });
          formDataToSend.append(`image${index + 1}`, blob, image.imageName || `image${index + 1}`);
        }
        formDataToSend.append(`imageName${index + 1}`, image.imageName || '');
      });

      formDataToSend.append('category', (selectedCategory?._id as any));
      formDataToSend.append('specifications', JSON.stringify(specifications));
      formDataToSend.append('sizes', JSON.stringify(selectedSizes));

      for (const key in formData) {
          formDataToSend.append(key, (formData[key]));
      }

      const response = await axios.post(`${apiUrl}/api/product/create`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        toast({
            title: 'Success',
            description: 'Product created successfully.',
        });
        setFormData({
          name: '',
          code: '',
          description: '',
          price: 0,
        offerPercentage: 0,
        });
        setImages([{ image: null, imageName: '' }])
        setSpecifications([])
        setSelectedSizes([])
        setSelectedCategory(null)
        setSelectedType('')
        router.push('/admin/products')
      } else {
        toast({
            title: 'Error',
            description: response.data.message,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while creating the product.',
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/category/all`);
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast({
            title: 'Error',
            description: 'An error occurred while fetching categories.',
        });
      }
    };

    fetchCategories();
  }, []);




  const size = ["XS", "S", "M", "L", "XL", "XXL", "XXXL","FreeSize"];


  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col md:flex-row">
        <main className="flex-1 p-10">
          <div className="flex items-center mb-6">
            <Link href='/admin/products' className=" flex items-center">
              <ArrowBigLeft className="h-6 w-6 mr-2" />
              Back
            </Link >
            <h1 className="text-3xl font-semibold ml-4 mb-0">Create Product</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="mb-2">
                <Label htmlFor="name" className="block  text-sm font-semibold mb-1">
                  Brand Name
                </Label>
                <Input
                  type="text"
                  id="Brandname"
                  name="Brandname"
                  value={formData.Brandname}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-full text-sm"
                  required
                />
              </div>
              <div className="mb-2">
                <Label htmlFor="name" className="block  text-sm font-semibold mb-1">
                  Product Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-full text-sm"
                  required
                />
              </div>
              <div className="mb-2">
                <Label htmlFor="code" className="block  text-sm font-semibold mb-1">
                  Product Code
                </Label>
                <Input
                  type="text"
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-full text-sm"
                  required
                />
              </div>
              <div className="mb-2 flex flex-col">
      <Label htmlFor="category" className="block  text-sm font-semibold mb-1">
        Category
      </Label>
      <select
        name="category"
        value={selectedCategory?._id || ''}
        onChange={handleCategoryChange}
        className="border rounded-md p-2 w-full text-sm dark:bg-slate-950"
      >
        <option value="" label="Select a category" />
        {categories?.map((category) => (
          <option key={category._id} value={category._id} label={category.name} />
        ))}
      </select>
    </div>
            </div>

         <div className='grid grid-cols-3 gap-4'>
         <div className="mb-4">
              <Label htmlFor="price" className="block  text-sm font-semibold">
                Price
              </Label>
              <Input
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="border rounded-md p-2 w-full text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="offerPercentage" className="block  text-xs font-semibold mb-1">
                Offer Percentage
              </Label>
              <Input
                type="text"
                id="offerPercentage"
                name="offerPercentage"
                value={formData.offerPercentage}
                onChange={handleChange}
                className="border rounded-md p-2 w-full text-xs"
              />
            </div>
            <div className="mb-2">
                <Label htmlFor="name" className="block  text-sm font-semibold mb-1">
                  Quantity
                </Label>
                <Input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-full text-sm"
                  required
                />
              </div>
         </div>
            <div className="mb-4">
              <Label htmlFor="description" className="block  text-sm font-semibold mb-1">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
        onChange={handleChange}
                className="border rounded-md p-2 w-full h-24 text-sm"
                required
              />
            </div>

            <div className="mb-4">
      <Label htmlFor="specifications" className="block  text-sm font-semibold mb-1">
        Specifications (Up to 4 points)
      </Label>
      <div>
        {specifications.map((point, index) => (
          <div key={index} className="flex items-center mb-2">
            <Textarea
              name={`specifications[${index}]`}
              value={point}
              onChange={(e) => handleSpecChange(e, index)}
              className="border rounded-md p-2 w-full text-sm"
            />
            <Button
              type="button"
              className=" font-semibold ml-2  rounded-md"
              onClick={() => handleRemoveSpecification(index)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
      {specifications.length < 4 && (
        <Button
          type="button"
          size='sm'
          className=" font-semibold  rounded-md mt-2"
          onClick={handleAddSpecification}
        >
          Add Specifications
        </Button>
      )}
    </div>

    <div className="mb-4">
      <Label htmlFor="sizes" className="block  text-xs font-semibold mb-1">
        Select Size
      </Label>
      <div className="flex flex-wrap gap-2">
        {size?.map((sizeItem, index) => (
          <div key={index} className="flex items-center mb-2">
            <Input
              type="checkbox"
              id={`size_${sizeItem}`}
              name="sizes"
              value={sizeItem}
              checked={selectedSizes.includes(sizeItem)}
              onChange={handleSizeChange}
              className="mr-2"
            />
            <Label htmlFor={`size_${sizeItem}`}>{sizeItem}</Label>
          </div>
        ))}
      </div>
    </div>

    <div className="mb-4">
      <h2 className="text-sm font-semibold mb-1">Images</h2>
      <div>
        {images.map((imageData, index) => (
          <div key={index} className="flex gap-2 mb-3 ">
            <div className="my-auto">
              {imageData.image && (
                <img
                  src={URL.createObjectURL(imageData.image)}
                  alt={`Image ${index + 1}`}
                  className="max-w-full h-24 rounded-md shadow-md mx-auto mb-3"
                />
              )}
              <Label className="cursor-pointer border rounded-md p-1">
                {imageData.image ? 'Change Image' : 'Upload Image'}
                <input
                  type="file"
                  id={`image_${index}`}
                  accept="image/*"
                  onChange={(e) => handleImageChange(index, e)}
                  hidden
                />
              </Label>
            </div>
            <div className="my-auto">
              <input
                type="text"
                id={`imageName_${index}`}
                placeholder={`Image ${index + 1} color`}
                value={imageData.imageName}
                onChange={(e) => handleImageNameChange(index, e)}
                className="border rounded-md w-full p-1 text-xs dark:bg-slate-950"
              />
            </div>
            <Button
            size='sm'
          type="button"
          variant='destructive'
          onClick={() => handleRemoveImage(index)}
        >
          Remove
        </Button>
          </div>
        ))}
      </div>
      {images.length < 7 && (
        <Button
          type="button"
          size='sm'
          variant='secondary'
          onClick={addImage}
          className=" font-semibold p-1 rounded-md mt-2 text-xs"
        >
          Add Image
        </Button>
      )}
    </div>

            <div className="mb-4">
              <Button
                type="submit"
                className=" font-semibold px-2 py-1 rounded-md mt-2"
              >
                Create Product
              </Button>
            </div>
          </form>
        </main>
      </div>
      )}
    </>
  );
};

export default withAuth(CreateProduct);
