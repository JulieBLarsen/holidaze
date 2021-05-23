import AdminLayout from '../../components/admin/layout/AdminLayout';
import Heading from '../../components/common/Heading';
import Head from '../../components/layout/Head';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { BASE_URL } from '../../constants/api';
import { fetchAdminData, fetchData } from '../../hooks/useApi';
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

  const { data, error } = fetchAdminData('enquiries?_sort=created_at:DESC');

  function getHosts(placeName) {
    const { data, error } = fetchData('places?title_contains=' + placeName);
    console.log(data);
  }
  function readEnquiry(id) {
    const { data } = axios.put(
      BASE_URL + 'enquiries/' + id,
      {
        new: false,
      },
      {
        headers: {
          Authorization: `Bearer ${auth.jwt}`,
        },
      }
    );
  }

  if (error) {
    console.log(error);
    return (
      <AdminLayout>
        <Head title="Enquiries | Dashboard" />
        <BigMessage message="Something went wrong..." style="danger" />
      </AdminLayout>
    );
  }
  if (!data)
    return (
      <AdminLayout>
        <Head title="Enquiries | Dashboard" />
        <BigMessage message="Loading..." style="loading" />
      </AdminLayout>
    );
  return (
    <AdminLayout>
      <Head title="Enquiries | Dashboard" />
      <div className="w-full mx-auto">
        <Heading text="Enquiries" />
        <div className="shadow -m-8 mt-10 md:m-10 border-b border-gray-200 rounded-md sm:rounded-lg overflow-hidden">
          <table className="w-full table-fixed divide-y divide-gray-200">
            <thead className="bg-primary-light">
              <tr>
                <th
                  scope="col"
                  className="hidden md:table-cell w-1/4 px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">
                  Guest
                </th>
                <th
                  scope="col"
                  className="w-full px-2 md:px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">
                  Host / Message
                </th>
                <th
                  scope="col"
                  className="w-2/12 px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="w-full bg-white divide-y divide-gray-200">
              {data.map((enquiry) => {
                return (
                  <tr
                    key={enquiry.id}
                    className={`${
                      enquiry.new === true
                        ? 'text-black font-bold'
                        : 'text-gray-700 bg-neutral-light'
                    }   cursor-pointer w-full transition hover:shadow-lg`}
                    onClick={() =>
                      enquiry.new === true && readEnquiry(enquiry.id)
                    }>
                    <td className="hidden md:table-cell w-1/12 md:w-1/3 px-6 py-4 truncate whitespace-nowrap">
                      {enquiry.user_name}
                    </td>
                    <td className="w-1/12 px-2 md:px-6 py-4 whitespace-nowrap truncate">
                      <span className="w-1/4">
                        <Link
                          href="enquiries/[id]"
                          as={`enquiries/${enquiry.id}`}>
                          <a>{enquiry.host}</a>
                        </Link>
                      </span>

                      <span
                        className={
                          enquiry.new === true
                            ? 'text-gray-600 font-normal ml-4 truncate w-3/4'
                            : 'text-gray-400 ml-4 truncate w-3/4'
                        }>
                        {enquiry.message}
                      </span>
                    </td>
                    <td className="px-2 md:px-6 py-4 whitespace-nowrap">
                      {enquiry.new === true && (
                        <p className="bg-primary text-white p-1 px-3 inline text-center mx-auto  rounded-full text-xs font-semibold">
                          New
                        </p>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export function TableHeadCol({ text }) {
  return (
    <th
      scope="col"
      className="w-1/3 px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">
      {text}
    </th>
  );
}

export default Enquiries;
