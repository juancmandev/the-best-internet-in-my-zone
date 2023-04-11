/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { Popover } from 'react-tiny-popover';

interface CursorMarkerProps {
  lat: number;
  lng: number;
}

const CursorMarker = ({ lat, lng }: CursorMarkerProps) => {
  const [showPopover, setShowPopover] = useState(false);

  return (
    <>
      <div>
        <div
          onClick={(e) => e.stopPropagation()}
          onMouseLeave={() => setShowPopover(false)}
          className='absolute bottom-[60px] left-[-40px] w-max h-max p-[8px] rounded-[50%] bg-red-500'>
          <Popover
            isOpen={showPopover}
            content={<p className='bg-white p-[8px] rounded-[8px]'>Hello</p>}>
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
          <div className='absolute bottom-[-50px] left-[6px] w-0 h-0 -z-10 border-x-[36px] border-solid border-x-transparent border-t-[68px] border-t-red-500' />
        </div>
      </div>
    </>
  );
};

export default CursorMarker;
