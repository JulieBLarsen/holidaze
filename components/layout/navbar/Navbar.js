import React, { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import NavbarMobile from './NavbarMobile';
import MenuToggle from './MenuToggle';
import AdminDropdown from './AdminDropdown';
import Link from 'next/link';
import { useContext } from 'react';
import AuthContext from '../../../context/AuthContext';
import { useRouter } from 'next/router';
import { getAuth } from '../../../hooks/useLocalStorage';

export default function Navbar() {
  const [auth, setAuth] = getAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <Disclosure as="nav" className="z-10 md:h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <a>
              <img src="/logo.svg" alt="Holidaze Logo" className="w-36" />
            </a>
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/">
                <a
                  className={
                    router.pathname == '/'
                      ? 'nav__link nav__link--active'
                      : 'nav__link'
                  }>
                  Home
                </a>
              </Link>
              <Link href="/places">
                <a
                  className={
                    router.pathname == '/places'
                      ? 'nav__link nav__link--active'
                      : 'nav__link'
                  }>
                  Accommodations
                </a>
              </Link>
              <Link href="/contact">
                <a
                  className={
                    router.pathname == '/contact'
                      ? 'nav__link nav__link--active'
                      : 'nav__link'
                  }>
                  Contact
                </a>
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            {auth ? (
              <>
                <AdminDropdown />
              </>
            ) : (
              <Link href="/login">
                <a>Sign in</a>
              </Link>
            )}
          </div>
          <MenuToggle setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
        </div>
      </div>
      {auth ? (
        <NavbarMobile menuOpen={menuOpen} user={auth.user} />
      ) : (
        <NavbarMobile menuOpen={menuOpen} />
      )}
    </Disclosure>
  );
}
