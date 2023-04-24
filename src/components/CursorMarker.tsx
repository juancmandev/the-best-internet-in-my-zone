/* eslint-disable @next/next/no-img-element */
'use client';

import { ReviewIcon } from '@/assets/icons';
import { useState } from 'react';
import { Popover } from 'react-tiny-popover';
import Modal from './Modal';
import ReviewForm from './ReviewForm';

interface CursorMarkerProps {
  lat: number;
  lng: number;
}

const CursorMarker = ({ lat, lng }: CursorMarkerProps) => {
  const [showPopover, setShowPopover] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div
        onClick={(e) => e.stopPropagation()}
        onMouseLeave={() => setShowPopover(false)}
        className='absolute bottom-[60px] left-[-40px] w-max h-max p-[8px] rounded-full bg-red-500 z-50'>
        <Popover
          isOpen={showPopover}
          content={
            <div className='bg-white p-[12px] rounded-[8px] shadow-md'>
              <p className='text-lg font-semibold'>Review</p>
            </div>
          }>
          <button
            onMouseEnter={() => setShowPopover(true)}
            onClick={() => setShowModal(true)}
            type='button'
            className='cursor-pointer p-[8px] bg-white rounded-full'>
            <ReviewIcon width={48} height={48} />
          </button>
        </Popover>
        <Modal
          title='Review ISP'
          open={showModal}
          onClose={() => setShowModal(false)}>
          <ReviewForm
            onClose={() => setShowModal(false)}
            modalOpen={showModal}
          />
        </Modal>
        <div className='absolute bottom-[-46px] left-[4px] w-0 h-0 -z-10 border-x-[36px] border-solid border-x-transparent border-t-[68px] border-t-red-500' />
      </div>
    </div>
  );
};

export default CursorMarker;
