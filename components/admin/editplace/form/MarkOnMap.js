import ReactMapGL, { Marker } from 'react-map-gl';
import { useCallback, useState } from 'react';
import { LocationMarkerIcon } from '@heroicons/react/solid';

function MarkOnMap({ longitude, latitude, setLongitude, setLatitude }) {
  const [viewport, setViewport] = useState({
    latitude: latitude,
    longitude: longitude,
    zoom: 12,
  });
  const [size, setSize] = useState({
    width: '100%',
    height: '100%',
  });

  const [events, logEvents] = useState({});
  const onMarkerDragStart = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }));
  }, []);

  const onMarkerDrag = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));
  }, []);

  const onMarkerDragEnd = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
    setLongitude(event.lngLat[0]);
    setLatitude(event.lngLat[1]);
  }, []);

  return (
    <>
      <div className="h-48 w-full my-2">
        <ReactMapGL
          className="rounded-md"
          mapStyle={'mapbox://styles/mapbox/streets-v11?optimize=true'}
          mapboxApiAccessToken="pk.eyJ1IjoiYXBwbGVjNGtlIiwiYSI6ImNrbnN1aXRveDA5aG4ybnIwZ2JtbHM0MzMifQ.zvrylbGNC5_Kc9Fg7m_1mw"
          {...viewport}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          {...size}
          onSizeChange={(nextSize) => setSize(nextSize)}>
          <Marker
            latitude={latitude}
            longitude={longitude}
            draggable
            onDragStart={onMarkerDragStart}
            onDrag={onMarkerDrag}
            onDragEnd={onMarkerDragEnd}>
            <LocationMarkerIcon className="cursor-pointer w-6 text-primary hover:text-primary-dark" />
          </Marker>
        </ReactMapGL>
      </div>
    </>
  );
}

export default MarkOnMap;
