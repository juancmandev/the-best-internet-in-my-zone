'use client';

import { useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Map from '@/components/Map';
import Modal from '@/components/Modal';
import AddISPForm from '@/components/AddISPForm';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY as string;

const libraries: (
  | 'places'
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'visualization'
)[] = ['places'];

const MapPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <>
      <h1 className='text-4xl'>Map</h1>
      <Map />
      <button
        onClick={() => setShowModal(true)}
        className='bg-blue-500 transition-colors text-white rounded-[4px] p-[8px] hover:bg-blue-400'
        type='button'>
        Add ISP
      </button>
      <Modal
        title='Add ISP'
        open={showModal}
        onClose={() => setShowModal(false)}>
        <AddISPForm onClose={() => setShowModal(false)} />
      </Modal>
    </>
  );
};

export default MapPage;
