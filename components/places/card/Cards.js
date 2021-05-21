import CardListItem from './CardListItem';
import Link from 'next/link';
import { Message } from '../../common/Message';

function Cards({ setShowPopup, filteredPlaces }) {
  return (
    <>
      {filteredPlaces.map((place) => (
        <li
          key={place.id}
          onMouseEnter={() => setShowPopup(place.id)}
          onMouseLeave={() => setShowPopup(null)}
          className="shadow hover:shadow-md border border-gray-100 grid grid-cols-1 grid-rows-2 h-96 rounded-md">
          <div className="rounded-md row-span-1">
            <Link href="/places/[slug]" as={`/places/${place.slug}`}>
              <a>
                <img
                  src={place.featured_image.formats.small.url}
                  alt=""
                  className="object-cover w-full h-full rounded-t-md"
                />
              </a>
            </Link>
          </div>

          <div className="p-4">
            <Link href={`/places/${place.slug}`}>
              <a>
                <h3 className="font-bold">{place.title}</h3>
              </a>
            </Link>

            <p>
              <span className="font-medium">${place.price}</span> / night
            </p>
            <ul className="mt-4 my-2">
              <CardListItem
                icon="guest"
                text={`${place.guests} ${
                  place.guests === 1 ? 'guest' : 'guests'
                }`}
              />
              <CardListItem
                icon="bed"
                text={`${place.bedrooms} ${
                  place.bedrooms === 1 ? 'bed' : 'beds'
                }`}
              />
              <CardListItem
                icon="bath"
                text={`${place.bathrooms} ${
                  place.bathrooms === 1 ? 'bath' : 'baths'
                }`}
              />
            </ul>
            <ul>
              {place.kitchen && <CardListItem icon="kitchen" text="Kitchen" />}
              {place.breakfast && (
                <CardListItem icon="breakfast" text="Breakfast" />
              )}
              {place.wifi && <CardListItem icon="wifi" text="WIFI" />}
            </ul>
          </div>
        </li>
      ))}
      {filteredPlaces.length === 0 && (
        <div className="col-span-2 w-100">
          <Message message="No results found..." style="warning" />
        </div>
      )}
    </>
  );
}

export default Cards;
