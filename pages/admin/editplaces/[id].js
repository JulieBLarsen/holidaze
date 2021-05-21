import AdminLayout from '../../../components/admin/layout/AdminLayout';
import Head from '../../../components/layout/Head';
import { useContext, useState } from 'react';
import AuthContext from '../../../context/AuthContext';
import { useRouter } from 'next/router';
import { BASE_URL } from '../../../constants/api';
import { fetchAdminData } from '../../../hooks/useApi';
import ImageUpload from '../../../components/admin/editplace/form/FeaturedImageUpload';
import { getToken, getAuth } from '../../../hooks/useLocalStorage';
import { BigMessage, Message } from '../../../components/common/Message';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';

function EditPlace() {
  const [auth, setAuth] = useContext(AuthContext);
  const router = useRouter();

  if (!auth) {
    router.push('/login');
    return (
      <BigMessage message="Oops! Did you forget to log in?" style="danger" />
    );
  }
  const { id } = router.query;
  const { data, error } = fetchAdminData('places/' + id);
  if (error) return <BigMessage message={`${error}`} style="danger" />;
  if (!data) return <BigMessage message="Loading..." style="loading" />;

  return (
    <>
      <AdminLayout>
        <Head title="Edit place | Dashboard" />
        <div className="w-full mx-auto">
          <div className="shadow m-10 border-b bg-white sm:rounded-lg overflow-hidden">
            <div className="p-6 bg-primary-light text-white">
              <h1 className="font-semibold text-lg">Edit {data.title}</h1>
              <p>
                <a onClick={() => router.back()}>Go back to all places</a>
              </p>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

export default EditPlace;
