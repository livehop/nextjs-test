"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the kaizenjournal page on the first load
    router.replace('/kaizenjournal');
  }, []);

  return null; // This component doesn't need to render anything
};

export default Home;