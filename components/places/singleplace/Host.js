import { PrimaryButton } from '../../common/Buttons';
import EnquiryForm from './EnquiryForm';
import { Disclosure, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';

function Host({ host, place }) {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <div className="flex bg-gray-100 justify-between items-center p-4 py-6 rounded-md">
            <div className="flex items-center">
              <img
                src={host.avatar.url}
                alt="avatar"
                className="w-10 rounded-full mr-4"
              />
              <p className="font-semibold">{host.name}</p>
            </div>
            <Disclosure.Button as="div">
              <PrimaryButton>
                Message host
                <XIcon
                  className={`inline ml-4 w-6 ${
                    open ? ' transform rotate-180' : 'hidden'
                  }`}
                />
              </PrimaryButton>
            </Disclosure.Button>
          </div>

          <Transition
            show={open}
            enter="transition-opacity duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Disclosure.Panel static>
              <EnquiryForm place={place} host={host.name} />
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}

export default Host;
