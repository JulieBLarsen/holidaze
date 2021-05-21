import FeaturesListItem from './FeaturesListItem';

function Features(props) {
  return (
    <ul>
      <FeaturesListItem
        icon="guest"
        text={`${props.guests} ${props.guests === 1 ? 'guest' : 'guests'}`}
      />
      <FeaturesListItem
        icon="bed"
        text={`${props.bedrooms} ${
          props.bedrooms === 1 ? 'bedroom' : 'bedrooms'
        }`}
      />
      <FeaturesListItem
        icon="bath"
        text={`${props.bathrooms} ${
          props.bathrooms === 1 ? 'bathroom' : 'bathrooms'
        }`}
      />
      {props.kitchen && <FeaturesListItem icon="kitchen" text="Kitchen" />}
      {props.breakfast && (
        <FeaturesListItem icon="breakfast" text="Breakfast" />
      )}
      {props.wifi && <FeaturesListItem icon="wifi" text="WIFI" />}
    </ul>
  );
}

export default Features;
