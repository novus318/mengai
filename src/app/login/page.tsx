'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/Spinner';


const Auth = () => {
    const [isLoading, setIsLoading] = useState(true)
    const { toast } = useToast()
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [activeTab, setActiveTab] = useState('login');

    const handleOnChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleOnSubmit = async (e: any) => {
        setIsLoading(true)
        e.preventDefault();
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const mode = activeTab === 'signup' ? 'register' : 'login';
        const body = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            mode
        };
    
        // Basic validation
        if (!formData.email || !formData.password) {
            toast({
                variant: "destructive",
                title: "Validation Error",
                description: "Email and Password are required",
            });
            return;
        }
    
        try {
            const res = await axios.post(`${apiUrl}/api/auth`, body);
    
            if (res.data.success) {
                toast({
                    title: "Success",
                    description: res.data.message,
                });
    
                const userData = {
                    ...res.data.user,
                    expiry: new Date().getTime() + 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
                };
    
                localStorage.setItem('user', JSON.stringify(userData));
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                });
                window.location.reload()
                router.push('/dashboard');
            } else {
                toast({
                    description: res.data.message,
                });
                setIsLoading(false)
            }
        } catch (error:any) {
            if (error.response) {
                // Server responded with a status code outside of 2xx range
                toast({
                    description: error.response.data.message,
                });
                setIsLoading(false)
            } else if (error.request) {
                // Request made but no response received
                toast({
                    variant : 'destructive',
                    description: "Network error occurred. Please try again later.",
                });
                setIsLoading(false)
            } else {
                toast({
                    variant : 'destructive',
                    description: "An unexpected error occurred. Please try again later."
                });
                setIsLoading(false)
            }
        }
    };
    

        const getUserData = () => {
            const user = JSON.parse(localStorage.getItem('user') as any);
            if (user) {
                if (new Date().getTime() > user.expiry) {
                    localStorage.removeItem('user');
                    return null;
                }
                return user;
            }
            return null;
        };
    
        // Check for existing user on initial render
        useEffect(() => {
            const user = getUserData();
            if (user) {
                router.push('/dashboard');
            }else
            setIsLoading(false)
        }, []);
    return (
      <>
      {isLoading ? (<Spinner/>):(  <div className='content-center h-[80vh] px-4'>
            <div className='bg-white dark:bg-slate-950 max-w-2xl mx-auto justify-center p-4 rounded-lg shadow-md'>
                <Tabs defaultValue="login" className="p-0 md:p-6" onValueChange={setActiveTab}>
                    <div className='justify-center flex'>
                        <TabsList>
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="signup">SignUp</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="login">
                        <form method='post' onSubmit={handleOnSubmit}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Log in to your Account</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            type='email'
                                            name='email'
                                            placeholder='Enter your email'
                                            onChange={handleOnChange}
                                            value={formData.email}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            type='password'
                                            name='password'
                                            placeholder='Enter your password'
                                            onChange={handleOnChange}
                                            value={formData.password}
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button type='submit'>Login</Button>
                                </CardFooter>
                                <div className='px-4 pb-4'>
                                    <Link href='' className="text-sm  underline">
                                        Forgot your password?
                                    </Link>
                                </div>
                            </Card>
                        </form>
                    </TabsContent>
                    <TabsContent value="signup">
                        <form onSubmit={handleOnSubmit}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Sign up to your Account</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            type='text'
                                            name='name'
                                            placeholder='Enter your name'
                                            onChange={handleOnChange}
                                            value={formData.name}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            type='email'
                                            name='email'
                                            placeholder='Enter your email'
                                            onChange={handleOnChange}
                                            value={formData.email}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="password">Create Password</Label>
                                        <Input
                                            type='password'
                                            name='password'
                                            placeholder='Enter your password'
                                            onChange={handleOnChange}
                                            value={formData.password}
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button type='submit'>Register</Button>
                                </CardFooter>
                            </Card>
                        </form>
                    </TabsContent>
                </Tabs>
            </div>
        </div>)
      }
      </>
    );
};

export default Auth;
