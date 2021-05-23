import AdminLayout from '../../components/admin/layout/AdminLayout';
import Heading from '../../components/common/Heading';
import Head from '../../components/layout/Head';
import { useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import { useRouter } from 'next/router';
import { BigMessage } from '../../components/common/Message';
import Link from 'next/link';
import DashboardBoxes from '../../components/admin/DashboardBoxes';

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
        <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
          <DashboardBoxes href="admin/editplaces" heading="Places">
            <p>See and edit places</p>
          </DashboardBoxes>
          <DashboardBoxes href="admin/messages" heading="Messages">
            <p>List of messages here</p>
          </DashboardBoxes>
          <DashboardBoxes href="admin/enquiries" heading="Enquiries">
            <p>List of Enquiries here</p>
          </DashboardBoxes>
          <DashboardBoxes href="admin/hosts" heading="Hosts">
            <p>List of hosts here</p>
          </DashboardBoxes>
        </div>
      </AdminLayout>
    </>
  );
}

export default Dashboard;
