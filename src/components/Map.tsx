'use client';

import { useEffect, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import CursorMarker from './CursorMarker';
import ReviewMarker from './ReviewMarker';
import ReviewProps from '@/interfaces/review.model';

interface coords {
  lat: number;
  lng: number;
}

const radius = 500;

const Map = () => {
  const [map, setMap] = useState<any>(null);
  const [reviews, setReviews] = useState<ReviewProps | any>([]);
  const [zoom, setZoom] = useState(19);
  const [markerLocation, setMarkerLocation] = useState<coords | null>(null);

  const fetchReviews = async () => {
    if (markerLocation !== null) {
      try {
        const data = {
          point: [markerLocation.lat, markerLocation.lng],
          radius: radius,
        };
        const response = await fetch('http://localhost:8000/api/v1/reviews', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const json = await response.json();

        setReviews(json);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;

        setMarkerLocation({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  useEffect(() => {
    const getReviews = setTimeout(() => {
      fetchReviews();
    }, 1000);

    return () => clearTimeout(getReviews);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markerLocation]);

  const handleCursorMarkerLocation = (e: any) =>
    setMarkerLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });

  return (
    <div className='w-full h-[80vh]'>
      {markerLocation && (
        <GoogleMap
          options={{
            minZoom: 17,
            mapTypeControl: false,
            clickableIcons: false,
            streetViewControl: false,
          }}
          onLoad={(map) => setMap(map)}
          mapContainerClassName='w-full h-full'
          onClick={handleCursorMarkerLocation}
          center={markerLocation}
          zoom={zoom}
          onZoomChanged={() => {
            map?.getZoom() && setZoom(map.getZoom());
          }}>
          <CursorMarker
            position={{
              lat: markerLocation.lat,
              lng: markerLocation.lng,
            }}
          />
          {reviews &&
            reviews.map((review: any, index: number) => (
              <ReviewMarker
                key={index}
                position={{
                  lat: review.geometry.coordinates[0],
                  lng: review.geometry.coordinates[1],
                }}
                reviewData={review}
              />
            ))}
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;
