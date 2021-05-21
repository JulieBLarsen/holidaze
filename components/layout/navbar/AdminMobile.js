import Link from 'next/link';
import { LogoutIcon, CogIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import AuthContext from '../../../context/AuthContext';

function AdminMobile() {
  const [auth, setAuth] = useContext(AuthContext);
  const router = useRouter();

  function logout() {
    setAuth(null);
    router.push('/');
  }

  return (
    <>
      <div className="flex items-center px-5">
        <div className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full"
            src={auth.user.avatar.url}
            alt="Avatar image"
          />
        </div>
        <div className="ml-3">
          <div className="text-sm text-black font-medium">
            {auth.user.firstname} {auth.user.lastname}
          </div>
        </div>
      </div>
      <div className="mt-3 px-2 space-y-1">
        <Link href="/">
          <a className="nav__link">
            <CogIcon className="inline w-5 mr-2" /> Dashboard
          </a>
        </Link>
        <a onClick={logout} className="cursor-pointer nav__link">
          <LogoutIcon className="inline w-5 mr-2" /> Sign out
        </a>
      </div>
    </>
  );
}

export default AdminMobile;
