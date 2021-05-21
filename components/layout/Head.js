import PropTypes from 'prop-types';
import NextHead from 'next/head';

function Head({ title = '' }) {
  return (
    <NextHead>
      <title>
        {title}
        {title ? ' | ' : ''}Holidaze
      </title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    </NextHead>
  );
}

Head.propTypes = {
  title: PropTypes.string,
};

export default Head;
