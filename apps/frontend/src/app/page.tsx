'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginPage from './login/page';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        router.replace('/dashboard');
      }
    }
  }, [router]);

  return (
    <div>
      <div className="wrapper">
        <LoginPage />
      </div>
    </div>
  );
}
