import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0/client';
import Layout from '../components/Layout';

const Profile = () => {
  const { user } = useUser();

  return (
    <Layout>
      <h1>Profile</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Layout>
  );
};

export default withPageAuthRequired(Profile);