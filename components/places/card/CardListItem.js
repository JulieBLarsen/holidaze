import {
  UsersIcon,
  MoonIcon,
  WifiIcon,
  SparklesIcon,
  HomeIcon,
  SunIcon,
} from '@heroicons/react/outline';
import PropTypes from 'prop-types';

function CardListItem({ icon, text }) {
  switch (icon) {
    case 'guest':
      icon = <UsersIcon className="inline w-4 mr-1" />;
      break;
    case 'bed':
      icon = <MoonIcon className="inline w-4 mr-1" />;
      break;
    case 'bath':
      icon = <SparklesIcon className="inline w-4 mr-1" />;
      break;
    case 'kitchen':
      icon = <HomeIcon className="inline w-4 mr-1" />;
      break;
    case 'breakfast':
      icon = <SunIcon className="inline w-4 mr-1" />;
      break;
    case 'wifi':
      icon = <WifiIcon className="inline w-4 mr-1" />;
      break;
  }
  return (
    <li className="inline-block text-sm mr-4">
      {icon}
      {text}
    </li>
  );
}

export default CardListItem;

CardListItem.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.oneOf([
    'guest',
    'bed',
    'bath',
    'kitchen',
    'breakfast',
    'wifi',
  ]),
};
