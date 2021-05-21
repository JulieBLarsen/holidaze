import AdminLayout from '../../components/admin/layout/AdminLayout';
import Heading from '../../components/common/Heading';
import Head from '../../components/layout/Head';
import { useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import { useRouter } from 'next/router';
import { BASE_URL } from '../../constants/api';
import useSWR from 'swr';
import { DotsVerticalIcon, PlusIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { BigMessage } from '../../components/common/Message';

function EditPlaces() {
  const [auth, setAuth] = useContext(AuthContext);
  const router = useRouter();

  if (!auth) {
    router.push('/login');
    return (
      <BigMessage message="Oops! Did you forget to log in?" style="danger" />
    );
  }

  const url = BASE_URL + 'places?_sort=title:ASC';

  const { data, error } = useSWR(url);
  console.log(data);

  if (error) {
    console.log(error);
    return (
      <AdminLayout>
        <Head title="Edit places | Dashboard" />
        {error}
      </AdminLayout>
    );
  }
  if (!data)
    return (
      <AdminLayout>
        <Head title="Edit places | Dashboard" />
        loading...
      </AdminLayout>
    );

  return (
    <>
      <AdminLayout>
        <Head title="Edit places | Dashboard" />
        <Heading text="Edit places" />
        <div className="m-20">
          <div className="mx-auto bg-gray-100 grid grid-cols-3 gap-6">
            <div className="w-80 h-20 flex flex-row bg-white rounded-md shadow transition hover:shadow-md">
              <div className="w-1/4 rounded-l-md bg-primary flex justify-center items-center">
                <PlusIcon className="h-10 text-white" />
              </div>
              <div className="w-3/4 p-3 px-4  flex justify-center items-center">
                <h2 className="uppercase tracking-wide font-semibold truncate mb-1">
                  Add new place
                </h2>
              </div>
            </div>
            {data.map((place) => {
              return (
                <div
                  key={place.id}
                  className="w-80 h-20 flex flex-row bg-white rounded-md shadow transition hover:shadow-md">
                  <div className="w-1/4 rounded-l-md">
                    <img
                      src={place.featured_image.formats.small.url}
                      alt=""
                      className="object-cover w-full h-full rounded-l-md"
                    />
                  </div>
                  <div className="w-3/4 p-3 px-4 text-sm flex flex-row justify-between items-center">
                    <div className="w-4/5">
                      <h2 className="font-semibold truncate mb-1">
                        {place.title}
                      </h2>
                      <p className="truncate text-gray-600">
                        {place.host.name}
                      </p>
                    </div>
                    <div className="w-auto"></div>
                    <Link href="editplaces/[id]" as={`editplaces/${place.id}`}>
                      <a>
                        <DotsVerticalIcon className="cursor-pointer h-5 text-gray-500 hover:text-black" />
                        <span className="sr-only">Open settings</span>
                      </a>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

export default EditPlaces;
