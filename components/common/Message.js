import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  RefreshIcon,
} from '@heroicons/react/outline';
import PropTypes from 'prop-types';

export function Message({ message, style }) {
  let icon;
  switch (style) {
    case 'success':
      icon = <CheckCircleIcon className="inline w-5 mr-2" />;
      break;
    case 'warning':
      icon = <ExclamationCircleIcon className="inline w-5 mr-2" />;
      break;
    case 'danger':
      icon = <XCircleIcon className="inline w-5 mr-2" />;
      break;
    case 'loading':
      icon = <RefreshIcon className="animate-spin-reverse inline w-5 mr-2" />;
      break;
  }

  return (
    <div
      className={`bg-${style} text-${style}-dark text-sm font-medium py-2 my-2 px-4 mr-auto rounded-md text-left`}>
      <p>
        {icon}
        {message}
      </p>
    </div>
  );
}

export function BigMessage({ message, style }) {
  let icon;
  switch (style) {
    case 'success':
      icon = <CheckCircleIcon className="inline w-10 mr-2" />;
      break;
    case 'warning':
      icon = <ExclamationCircleIcon className="inline w-10 mr-2" />;
      break;
    case 'danger':
      icon = <XCircleIcon className="inline w-10 mr-2" />;
      break;
    case 'loading':
      icon = <RefreshIcon className="animate-spin-reverse inline w-10 mr-2" />;
      break;
  }
  return (
    <div
      className={`bg-${style} text-${style}-dark max-w-7xl py-10 px-20 mx-auto text-center rounded-md`}>
      {icon}
      <p className={`mt-4 text-large font-medium`}>{message}</p>
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
  style: PropTypes.oneOf(['success', 'warning', 'danger', 'loading']),
};
BigMessage.propTypes = {
  message: PropTypes.string.isRequired,
  style: PropTypes.oneOf(['success', 'warning', 'danger', 'loading']),
};
