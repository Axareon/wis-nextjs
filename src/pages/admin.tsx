import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0/client';
import Layout from '../components/Layout';

const Admin = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      const roles = user['roleType'] || [];
      // @ts-ignore: Roles is an array, not an object.
      if (!roles.includes('Admin')) {
        router.push('/');
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Layout>
      <h1>Admin Page</h1>
      <p>Only users with the Admin role can access this page.</p>
    </Layout>
  );
};

export default withPageAuthRequired(Admin);
