'use client';

import { useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Map from '@/components/Map';
import Modal from '@/components/Modal';
import AddISPForm from '@/components/AddISPForm';
import PrimaryButton from '@/components/PrimaryButton';

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
    <div className='p-[20px] flex flex-col gap-[8px]'>
      <h1 className='text-4xl'>
        The Best Internet of my Zone <strong>α</strong> (alpha)
      </h1>
      <Map />
      <PrimaryButton buttonType='button' onClick={() => setShowModal(true)}>
        Add ISP
      </PrimaryButton>
      <section>
        <h5 className='text-xl font-bold'>FAQ</h5>
        <ul className='flex flex-col gap-[4px] pl-[8px] list-disc'>
          <li>
            <h6 className='text-lg'>
              What is an <strong>ISP</strong>?
            </h6>
            <p>
              Internet Service Provider, a company that you contract to provide
              you connection to Internet with optical fibers or satellites.
            </p>
          </li>
          <li>
            <h6 className='text-lg'>I cannot found the ISP that I have...</h6>
            <p>
              To add a new one, click the <strong>Add ISP</strong> button, then
              fulfill the name, logo url and in which country is available.
            </p>
          </li>
          <li>
            <h6 className='text-lg'>How can I add a review?</h6>
            <p>
              Set the red cursor in the point you live, then click it to open a
              popover, click the <strong>Review</strong> button, a modal will be
              open, then complete the form.
            </p>
          </li>
          <li>
            <h6 className='text-lg'>Are my reviews anonymous?</h6>
            <p>
              Yes, as I just save the data showed to you in the review form and
              the coordinates of the red cursor, nothing else.
            </p>
          </li>
          <li>
            <h6 className='text-lg'>How can I see the reviews of an ISP?</h6>
            <p>
              The reviews from you and the community are blue markers, click one
              of those and you will see a popover with the ISP logo, name,
              rating and the review of the person.
            </p>
          </li>
        </ul>
      </section>
      <Modal
        title='Add ISP'
        open={showModal}
        onClose={() => setShowModal(false)}>
        <AddISPForm onClose={() => setShowModal(false)} />
      </Modal>
    </div>
  );
};

export default MapPage;
