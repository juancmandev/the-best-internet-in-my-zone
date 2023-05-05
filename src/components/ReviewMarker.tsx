/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import ReviewProps from '@/interfaces/review.model';
import { StarFilled } from '@/assets/icons';
import { StarEmpty } from '@/assets/icons';
import { Marker, InfoWindow } from '@react-google-maps/api';

interface ReviewMarkerProps {
  reviewData: ReviewProps;
  position: {
    lat: number;
    lng: number;
  };
}

const ReviewMarker = ({ reviewData, position }: ReviewMarkerProps) => {
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

  return (
    <Marker
      onClick={() => setInfoWindowOpen((prev) => !prev)}
      position={position}
      options={{
        icon:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/32px-Map_marker.svg.png',
      }}>
      {infoWindowOpen && (
        <InfoWindow onCloseClick={() => setInfoWindowOpen(false)}>
          <ReviewData reviewData={reviewData} />
        </InfoWindow>
      )}
    </Marker>
  );
};

interface ReviewDataPopoverProps {
  reviewData: ReviewProps;
}

const ReviewData = ({ reviewData }: ReviewDataPopoverProps) => (
  <div className='p-[12px] flex flex-col gap-[8px] text-base'>
    <section>
      <figure className='flex gap-[8px]'>
        <img
          className='w-[100px] h-auto'
          src={reviewData.isp.urlImage}
          alt={`${reviewData.isp.name} logo`}
        />
        <figcaption className='font-semibold capitalize'>
          {reviewData.isp.name}
        </figcaption>
      </figure>
    </section>
    <section className='flex gap-[4px]'>
      {Array.from(Array(reviewData.rating), (e, i) => (
        <StarFilled key={`filled ${i}`} />
      ))}
      {Array.from(Array(5 - reviewData.rating), (e, i) => (
        <StarEmpty key={`empty ${i}`} />
      ))}
    </section>
    <section>
      <p className='flex-wrap'>{reviewData.review}</p>
    </section>
  </div>
);

export default ReviewMarker;
