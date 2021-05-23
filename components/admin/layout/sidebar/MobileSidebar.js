import { Disclosure, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  PlusCircleIcon,
  ViewGridIcon,
  MailIcon,
  QuestionMarkCircleIcon,
  UsersIcon,
  LogoutIcon,
  ArrowCircleLeftIcon,
  LocationMarkerIcon,
} from '@heroicons/react/outline';
import { PrimaryButton } from '../../../common/Buttons';

function MobileSidebar({
  sidebarOpen,
  auth,
  setAuth,
  newMessages,
  enquiryLength,
  logout,
}) {
  const router = useRouter();

  return (
    <>
      {auth && (
        <Disclosure.Panel
          static
          className="lg:hidden fixed z-50 w-full bg-secondary-dark">
          <Transition
            show={sidebarOpen}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0"
            enterTo="transform opacity-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100"
            leaveTo="transform opacity-0">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <div className="mb-8">
                <Link href="/admin/addplace">
                  <a className="cursor-pointer">
                    <PrimaryButton type="">
                      <PlusCircleIcon className="inline w-5 mr-3" />
                      Add new place
                    </PrimaryButton>
                  </a>
                </Link>
              </div>
              <ul className="w-full">
                <li>
                  <Link href="/admin">
                    <a
                      className={
                        router.pathname == '/admin'
                          ? 'dashboard__link--active'
                          : 'dashboard__link'
                      }>
                      <ViewGridIcon className="inline w-5 mr-3" />
                      Dashboard
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/editplaces">
                    <a
                      className={
                        router.pathname == '/admin/editplaces'
                          ? 'dashboard__link--active'
                          : 'dashboard__link'
                      }>
                      <LocationMarkerIcon className="inline w-5 mr-3" />
                      Places
                    </a>
                  </Link>
                </li>
                <li className="relative">
                  <Link href="/admin/messages">
                    <a
                      className={
                        router.pathname == '/admin/messages'
                          ? 'dashboard__link--active'
                          : 'dashboard__link'
                      }>
                      <MailIcon className="inline w-5 mr-3" />
                      Messages
                    </a>
                  </Link>
                  {newMessages > 0 && (
                    <>
                      <svg
                        className="absolute left-4 top-2 text-primary fill-current w-4"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="50" />
                      </svg>
                      <span className="absolute left-4 top-2 px-1 text-xs font-medium">
                        {newMessages}
                      </span>
                    </>
                  )}
                </li>
                <li className="relative">
                  <Link href="/admin/enquiries">
                    <a
                      className={
                        router.pathname == '/admin/enquiries'
                          ? 'dashboard__link--active'
                          : 'dashboard__link'
                      }>
                      <QuestionMarkCircleIcon className="inline w-5 mr-3" />
                      Enquiries
                    </a>
                  </Link>
                  {enquiryLength > 0 && (
                    <>
                      <svg
                        className="absolute left-4 top-2 text-primary fill-current w-4"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="50" />
                      </svg>
                      <span className="absolute left-4 top-2 px-1 text-xs font-medium">
                        {enquiryLength}
                      </span>
                    </>
                  )}
                </li>
                <li>
                  <Link href="/admin/hosts">
                    <a
                      className={
                        router.pathname == '/admin/hosts'
                          ? 'dashboard__link--active'
                          : 'dashboard__link'
                      }>
                      <UsersIcon className="inline w-5 mr-3" />
                      Hosts
                    </a>
                  </Link>
                </li>
              </ul>
              <ul className="w-full border-t-2 border-secondary">
                <li className="dashboard__link cursor-pointer" onClick={logout}>
                  <LogoutIcon className="inline w-5 mr-3" />
                  Sign out
                </li>
                <li>
                  <Link href="/">
                    <a
                      className={
                        router.pathname == '/'
                          ? 'dashboard__link--active'
                          : 'dashboard__link'
                      }>
                      <ArrowCircleLeftIcon className="inline w-5 mr-3" />
                      Back to website
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-row justify-center items-center py-4 bg-secondary w-full">
              <img
                className="h-10 w-10 rounded-full"
                src={auth.user.avatar.url}
                alt={`${auth.user.firstname}
            ${auth.user.lastname}`}
              />
              <div className="flex flex-col ml-4">
                <p className="text-sm">
                  <span className="mr-1">{auth.user.firstname}</span>
                  {auth.user.lastname}
                </p>
                <p className="text-xs text-secondary-light opacity-70">
                  {auth.user.email}
                </p>
              </div>
            </div>
          </Transition>
        </Disclosure.Panel>
      )}
    </>
  );
}

export default MobileSidebar;
