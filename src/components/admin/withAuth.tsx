'use client'
import { useEffect, useState } from 'react';
import Spinner from '@/components/Spinner';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export function withAuth(Component: React.ComponentType) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [ok, setOk] = useState<boolean | null>(null);

    useEffect(() => {
      const checkAuth = async () => {
        const pin = localStorage.getItem('pin');

        if (!pin) {
          setOk(false);
          return;
        }

        try {
          const encodedPin = encodeURIComponent(pin);
          const response = await axios.post(`${apiUrl}/api/auth/verify`,{ pin: encodedPin });

          if (response.data.success) {
            setOk(true);
          } else {
            setOk(false);
          }
        } catch (error) {
          console.error('Error during token verification:', error);
          setOk(false);
        }
      };

      checkAuth();
    }, [router]);

    if (ok === null) {
      return <Spinner />;
    }

    if (typeof window === 'undefined' || ok === false) {
      router.push('/admin');
      return null;
    }

    return <Component {...props} />;
  };
}
