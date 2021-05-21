import { useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { LogoutIcon, CogIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../../../context/AuthContext';

function AdminDropdown() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const router = useRouter();

  function logout() {
    setAuth(null);
    router.push('/login');
  }
  useEffect(() => {
    if (!auth) {
      router.push('/login');
    }
  }, []);

  return (
    <>
      {auth && (
        <Menu as="div" className="ml-3 relative">
          <div>
            <Menu.Button
              as="button"
              className="max-w-xs transition hover:shadow-md hover:bg-gray-100  px-3 py-1 rounded-full flex items-center text-sm  focus:outline-none focus:ring-0 ">
              {adminOpen ? (
                <XIcon
                  className="block h-6 w-6"
                  aria-hidden="true"
                  onClick={() => setAdminOpen(!adminOpen)}
                />
              ) : (
                <MenuIcon
                  className="block h-6 w-6"
                  aria-hidden="true"
                  onClick={() => setAdminOpen(!adminOpen)}
                />
              )}
              <img
                className="h-8 w-8 ml-3 rounded-full"
                src={auth.user.avatar.url}
                alt=""
                onClick={() => setAdminOpen(!adminOpen)}
                aria-label="Open or close user menu"
              />
            </Menu.Button>
          </div>
          <Transition
            as="div"
            show={adminOpen}
            onBlur={() => setAdminOpen(false)}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95">
            <Menu.Items
              as="span"
              static
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg pb-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <p className="px-4 py-2 text-sm text-black font-medium">
                {auth.user.firstname} {auth.user.lastname}
              </p>
              <Menu.Item>
                <Link href="/admin">
                  <a className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-800">
                    <CogIcon className="inline w-5 mr-2" /> Dashboard
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <a
                  onClick={logout}
                  className="cursor-pointer hover:bg-gray-100 block px-4 py-2 text-sm text-gray-800">
                  <LogoutIcon className="inline w-5 mr-2" /> Sign out
                </a>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </>
  );
}

export default AdminDropdown;
