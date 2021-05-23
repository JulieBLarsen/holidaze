import PropTypes from 'prop-types';
import Link from 'next/link';

function DashboardBoxes({ heading, href, children }) {
  return (
    <div className="bg-white shadow flex flex-col justify-between rounded-md">
      <Link href={href}>
        <a>
          <h2 className="w-full cursor-pointer rounded-t-md bg-secondary font-semibold text-lg text-white p-4">
            {heading}
          </h2>
        </a>
      </Link>
      <div className="p-6">{children}</div>
      <Link href={href}>
        <div className="w-full cursor-pointer rounded-b-md bg-gray-100 hover:bg-gray-50 p-4 text-sm text-center font-medium hover:font-bold">
          See all {heading}
        </div>
      </Link>
    </div>
  );
}

export default DashboardBoxes;
DashboardBoxes.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
};
