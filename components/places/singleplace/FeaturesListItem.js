import {
  UsersIcon,
  MoonIcon,
  WifiIcon,
  SparklesIcon,
  HomeIcon,
  SunIcon,
} from '@heroicons/react/outline';

function FeaturesListItem({ icon, text }) {
  switch (icon) {
    case 'guest':
      icon = <UsersIcon className="inline w-5 mr-2 text-primary" />;
      break;
    case 'bed':
      icon = <MoonIcon className="inline w-5 mr-2 text-primary" />;
      break;
    case 'bath':
      icon = <SparklesIcon className="inline w-5 mr-2 text-primary" />;
      break;
    case 'kitchen':
      icon = <HomeIcon className="inline w-5 mr-2 text-primary" />;
      break;
    case 'breakfast':
      icon = <SunIcon className="inline w-5 mr-2 text-primary" />;
      break;
    case 'wifi':
      icon = <WifiIcon className="inline w-5 mr-2 text-primary" />;
      break;
  }
  return (
    <li className="inline-block text-base font-semibold mr-6">
      {icon}
      {text}
    </li>
  );
}

export default FeaturesListItem;
