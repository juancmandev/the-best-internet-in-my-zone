'use client';

import GoogleMapReact from 'google-map-react';
import CursorMarker from './CursorMarker';
import ReviewMarker from './ReviewMarker';
import { useEffect, useState } from 'react';
import { getReviews } from '@/services/reviews';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY as string;

const Map = () => {
  const [reviews, setReviews] = useState<any>([]);
  const [loadMap, setLoadMap] = useState<boolean>(false);
  const [location, setLocation] = useState<any>({
    lat: 0,
    lng: 0,
  });
  const [markerLocation, setMarkerLocation] = useState({
    lat: 0,
    lng: 0,
  });

  const fetchReviews = async () => {
    try {
      const reviews = await getReviews();

      setReviews(reviews);
    } catch {
      alert('Error fetching reviews');
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;

        setLoadMap(true);
        setLocation({ lat: latitude, lng: longitude });
        setMarkerLocation({ lat: latitude, lng: longitude });
      });
    }

    fetchReviews();
  }, []);

  const handleCursorMarkerLocation = (e: any) =>
    setMarkerLocation({ lat: e.lat, lng: e.lng });

  return (
    <>
      <div className='w-full h-[80vh]'>
        {loadMap ? (
          <GoogleMapReact
            onClick={handleCursorMarkerLocation}
            bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
            defaultCenter={location}
            defaultZoom={19}>
            <CursorMarker lat={markerLocation.lat} lng={markerLocation.lng} />
            {reviews &&
              reviews.map((review: any, index: number) => (
                <ReviewMarker
                  key={index}
                  lat={review.coordinates.lat}
                  lng={review.coordinates.lng}
                  reviewData={review}
                />
              ))}
          </GoogleMapReact>
        ) : (
          <>
            <p>Please share your location to show the map.</p>
            <p>Reload the page if neccesary.</p>
          </>
        )}
      </div>
    </>
  );
};

export default Map;
