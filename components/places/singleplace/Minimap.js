import ReactMapGL, { Marker } from 'react-map-gl';
import { useState } from 'react';
import { LocationMarkerIcon, XIcon } from '@heroicons/react/solid';

function Minimap({ place }) {
  const [viewport, setViewport] = useState({
    latitude: place.latitude,
    longitude: place.longitude,
    zoom: 14,
  });
  const [size, setSize] = useState({
    width: '100%',
    height: '100%',
  });
  return (
    <>
      <p className="mt-10 font-semibold">{place.address}</p>
      <div className="h-60 w-full my-2">
        <ReactMapGL
          className="rounded-md"
          mapStyle={'mapbox://styles/mapbox/streets-v11?optimize=true'}
          mapboxApiAccessToken="pk.eyJ1IjoiYXBwbGVjNGtlIiwiYSI6ImNrbnN1aXRveDA5aG4ybnIwZ2JtbHM0MzMifQ.zvrylbGNC5_Kc9Fg7m_1mw"
          {...viewport}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          {...size}
          onSizeChange={(nextSize) => setSize(nextSize)}>
          <Marker latitude={place.latitude} longitude={place.longitude}>
            <LocationMarkerIcon className="w-6 text-primary" />
          </Marker>
        </ReactMapGL>
      </div>
    </>
  );
}

export default Minimap;
