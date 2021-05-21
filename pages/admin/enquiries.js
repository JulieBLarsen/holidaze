import AdminLayout from '../../components/admin/layout/AdminLayout';
import Heading from '../../components/common/Heading';
import Head from '../../components/layout/Head';
import { useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import { useRouter } from 'next/router';
import { fetchAdminData } from '../../hooks/useApi';
import { BigMessage } from '../../components/common/Message';

function Enquiries() {
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
        <Head title="Enquiries | Dashboard" />
        <Heading text="Enquiries" />
      </AdminLayout>
    </>
  );
}

export default Enquiries;
