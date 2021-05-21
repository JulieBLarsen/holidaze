import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

function MenuToggle({ menuOpen, setMenuOpen }) {
  return (
    <div className="-mr-2 flex md:hidden">
      <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md    focus:outline-none focus:ring-0 ">
        <span className="sr-only">Open main menu</span>
        {menuOpen ? (
          <XIcon
            className="block h-6 w-6"
            aria-hidden="true"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        ) : (
          <MenuIcon
            className="block h-6 w-6"
            aria-hidden="true"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        )}
      </Disclosure.Button>
    </div>
  );
}

export default MenuToggle;
