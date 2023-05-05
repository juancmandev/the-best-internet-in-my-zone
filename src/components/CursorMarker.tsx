/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { ReviewIcon } from '@/assets/icons';
import Modal from './Modal';
import ReviewForm from './ReviewForm';

interface CursorMarkerProps {
  position: google.maps.LatLngLiteral;
}

const CursorMarker = ({ position }: CursorMarkerProps) => {
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <Marker
      onClick={() => setInfoWindowOpen((prev) => !prev)}
      position={position}>
      {infoWindowOpen && (
        <InfoWindow onCloseClick={() => setInfoWindowOpen(false)}>
          <>
            <p className='font-semibold'>Review</p>
            <button onClick={() => setShowModal(true)}>
              <ReviewIcon width={32} height={32} />
            </button>
            <Modal
              title='Review ISP'
              open={showModal}
              onClose={() => setShowModal(false)}>
              <ReviewForm
                onClose={() => setShowModal(false)}
                modalOpen={showModal}
                coordinates={[position.lat, position.lng]}
              />
            </Modal>
          </>
        </InfoWindow>
      )}
    </Marker>
  );
};

export default CursorMarker;
