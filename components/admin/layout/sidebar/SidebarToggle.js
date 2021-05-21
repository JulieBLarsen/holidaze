import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

function SidebarToggle({ sidebarOpen, setSidebarOpen }) {
  return (
    <div className="-mr-2 flex lg:hidden">
      <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md    focus:outline-none focus:ring-0 ">
        <span className="sr-only">Open main menu</span>
        {sidebarOpen ? (
          <XIcon
            className="block h-6 w-6"
            aria-hidden="true"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        ) : (
          <MenuIcon
            className="block h-6 w-6"
            aria-hidden="true"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        )}
      </Disclosure.Button>
    </div>
  );
}

export default SidebarToggle;
