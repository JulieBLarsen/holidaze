import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { HeadingSmaller } from '../../../components/common/Heading';
import Head from '../../../components/layout/Head';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { BASE_URL } from '../../../constants/api';
import moment from 'moment';
import { getToken, getAuth } from '../../../hooks/useLocalStorage';
import { fetchAdminData, fetchData } from '../../../hooks/useApi';
import { BigMessage } from '../../../components/common/Message';
import AuthContext from '../../../context/AuthContext';
import axios from 'axios';

function SingleEnquiry() {
  const [auth, setAuth] = useContext(AuthContext);
  const router = useRouter();

  if (!auth) {
    router.push('/login');
    return (
      <BigMessage message="Oops! Did you forget to log in?" style="danger" />
    );
  }
  const { id } = router.query;

  const { data, error } = fetchAdminData('enquiries/' + id);

  if (error) return <BigMessage message={`${error}`} style="danger" />;
  if (!data) return <BigMessage message="Loading..." style="loading" />;

  const date = moment(data.created_at, moment.ISO_8601).format(
    'dddd, MMMM Do YYYY, HH:mm'
  );
  const dateFromNow = moment(data.created_at, moment.ISO_8601).fromNow();

  return (
    <>
      <AdminLayout>
        <Head title="Enquiries | Dashboard" />
        <div className="w-full mx-auto">
          <div className="shadow m-10 border-b bg-white sm:rounded-lg overflow-hidden">
            <div className="p-6 bg-primary-light text-white">
              <h1 className="font-semibold text-lg">
                Enquiry for {data.host} / {data.place}
              </h1>
            </div>
            <div className="p-6 flex flex-row justify-between flex-wrap text-sm">
              <p>
                <span className="font-bold mr-4">{data.user_name}</span>
                {data.user_email}
              </p>
              <p>
                {date} ({dateFromNow})
              </p>
            </div>
            <p className="p-6 leading-relaxed">{data.message}</p>
            <p className="p-6 font-semibold text-sm cursor-pointer">
              <a onClick={() => router.back()}>Go back to enquiries</a>
            </p>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

export default SingleEnquiry;
