import AdminLayout from '../../components/admin/layout/AdminLayout';
import Heading from '../../components/common/Heading';
import Head from '../../components/layout/Head';
import { useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import { useRouter } from 'next/router';
import { BigMessage } from '../../components/common/Message';

function Hosts() {
  const [auth, setAuth] = useContext(AuthContext);
  const router = useRouter();

  if (!auth) {
    router.push('/login');
    return (
      <BigMessage message="Oops! Did you forget to log in?" style="danger" />
    );
  }
  return (
    <>
      <AdminLayout>
        <Head title="Hosts | Dashboard" />
        <Heading text="Hosts" />
      </AdminLayout>
    </>
  );
}

export default Hosts;
