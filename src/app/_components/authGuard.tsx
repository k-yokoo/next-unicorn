'use client';

import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { status } = useSession();
  // const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn();
    }
  }, [status]);

  if (status === 'loading' || status === 'unauthenticated') {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthGuard;