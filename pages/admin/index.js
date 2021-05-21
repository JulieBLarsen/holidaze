import AdminLayout from '../../components/admin/layout/AdminLayout';
import Heading from '../../components/common/Heading';
import Head from '../../components/layout/Head';
import { useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import { useRouter } from 'next/router';
import { BigMessage } from '../../components/common/Message';

function Dashboard() {
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
        <Head title="Dashboard" />
        <Heading text="Dashboard" />
        <div className="container mx-auto grid grid-cols-2 grid-rows-2 gap-8 w-full">
          <div className="col-span-1 row-span-1 bg-red-200">
            <p>test</p>
          </div>
          <div className="col-span-1 row-span-1 bg-yellow-200">
            <p>test</p>
          </div>
          <div className="col-span-1 row-span-1 bg-green-400">
            <p>test</p>
          </div>
          <div className="col-span-1 row-span-1 bg-blue-200">
            <p>test</p>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

export default Dashboard;
