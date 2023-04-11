'use client';

import GoogleMapReact from 'google-map-react';
import CursorMarker from './CursorMarker';
import { useState } from 'react';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY as string;

const Map = () => {
  const [cursorMarkerLocation, setCursorMarkerLocation] = useState({
    lat: 59.95,
    lng: 30.33,
  });

  const handleCursorMarkerLocation = (e: any) =>
    setCursorMarkerLocation({ lat: e.lat, lng: e.lng });

  return (
    <>
      <h1>Map component</h1>
      <div className='w-full h-[80vh]'>
        <GoogleMapReact
          onClick={handleCursorMarkerLocation}
          bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
          defaultCenter={{ lat: 59.95, lng: 30.33 }}
          defaultZoom={19}>
          <CursorMarker
            lat={cursorMarkerLocation.lat}
            lng={cursorMarkerLocation.lng}
          />
        </GoogleMapReact>
      </div>
    </>
  );
};

export default Map;
