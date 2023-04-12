/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import ReviewProps from '@/interfaces/review.model';
import mapOrder from '@/utils/mapOrder';
import { Popover } from 'react-tiny-popover';
import { getISP } from '@/services/ISP';

interface ReviewMarkerProps {
  lat: number;
  lng: number;
  reviewData: ReviewProps;
}

const ReviewMarker = ({ lat, lng, reviewData }: ReviewMarkerProps) => {
  const [showPopover, setShowPopover] = useState(false);

  return (
    <div>
      <div
        onClick={(e) => e.stopPropagation()}
        onMouseLeave={() => setShowPopover(false)}
        className='absolute bottom-[60px] left-[-40px] w-max h-max p-[8px] rounded-[50%] bg-blue-500'>
        <Popover
          isOpen={showPopover}
          content={<ReviewData reviewData={reviewData} />}>
          <button
            onMouseEnter={() => setShowPopover(true)}
            type='button'
            className='cursor-pointer px-[4px] py-[12px] bg-white rounded-[50%]'>
            <img
              className='w-[60px] h-[40px] object-contain'
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Logo_TotalPlay.svg/1200px-Logo_TotalPlay.svg.png'
              alt='Totalplay logo'
            />
          </button>
        </Popover>
        <div className='absolute bottom-[-50px] left-[6px] w-0 h-0 -z-10 border-x-[36px] border-solid border-x-transparent border-t-[68px] border-t-blue-500' />
      </div>
    </div>
  );
};

const ReviewData = (props: any) => {
  const { reviewData } = props;
  const [reviewKeys, setReviewKeys] = useState<any>([]);
  const [isp, setIsp] = useState<any>(null);

  const handleReviewKeys = () => {
    const keys = Object.keys(reviewData).filter(
      (key) => key !== 'country' && key !== 'city' && key !== 'coordinates'
    );
    const keysOrder = [
      'isp',
      'rating',
      'review',
      'neighborhood',
      'street',
      'postalCode',
    ];
    mapOrder(keys, keysOrder);

    setReviewKeys(keys);
  };

  useEffect(() => {
    handleReviewKeys();
    fetchInternetServiceProviders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewData]);

  const fetchInternetServiceProviders = async () => {
    try {
      const data: any = await getISP();

      setIsp(data.find((isp: any) => isp.name === reviewData.isp));
    } catch {
      alert(
        'There was an error fetching the internet service providers. Please try again later.'
      );
    }
  };

  return (
    <div className='p-[20px] bg-white text-slate-950 rounded-[8px] shadow-md'>
      {reviewKeys &&
        reviewKeys.map((key: string) => (
          <div key={key}>
            <span className='flex gap-[4px]'>
              <p className='font-bold capitalize'>{key}:</p>
              <p>
                {reviewData[key]}
                {key === 'rating' && '/5'}
              </p>
            </span>
          </div>
        ))}
    </div>
  );
};

export default ReviewMarker;
