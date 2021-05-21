import PropTypes from 'prop-types';
import Footer from './Footer';
import Navbar from './navbar/Navbar';

function Layout({ children, containerSize }) {
  switch (containerSize) {
    case 'fullWidth':
      containerSize = 'm-0';
      break;
    case 'mediumWidth':
      containerSize = 'mx-auto container px-4 sm:px-6 lg:px8';
      break;
    case 'smallWidth':
      containerSize = 'mx-auto container px-4 sm:w-3/4 md:w-2/3';
      break;
    default:
      containerSize = 'mx-auto container px-4 sm:px-6 lg:px8';
      break;
  }

  return (
    <div className="flex flex-col min-h-screen z-20">
      <Navbar />
      <div className={`flex-grow ${containerSize}`}>
        <main className="mx-auto">{children}</main>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  containerSize: PropTypes.oneOf(['fullWidth', 'smallWidth']).isRequired,
};

export default Layout;
