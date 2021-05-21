import { Disclosure, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../../../context/AuthContext';
import AdminMobile from './AdminMobile';

function NavbarMobile({ menuOpen }) {
  const [auth, setAuth] = useContext(AuthContext);
  const router = useRouter();

  return (
    <Disclosure.Panel static className="md:hidden">
      <Transition
        show={menuOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3  bg-white rounded-t-md">
          <Link href="/">
            <a
              className={
                router.pathname == '/'
                  ? 'nav__link  nav__link--active'
                  : 'nav__link'
              }>
              Home
            </a>
          </Link>
          <Link href="/places">
            <a
              className={
                router.pathname == '/places'
                  ? 'nav__link  nav__link--active'
                  : 'nav__link'
              }>
              Accommodations
            </a>
          </Link>
          <Link href="/contact">
            <a
              className={
                router.pathname == '/contact'
                  ? 'nav__link  nav__link--active'
                  : 'nav__link'
              }>
              Contact
            </a>
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-700  bg-white rounded-b-md">
          {auth ? (
            <AdminMobile user={auth.user} />
          ) : (
            <>
              <Link href="/login">
                <a className=" block px-5 py-2 rounded-md text-base font-medium">
                  Sign in
                </a>
              </Link>
            </>
          )}
        </div>
      </Transition>
    </Disclosure.Panel>
  );
}

export default NavbarMobile;
