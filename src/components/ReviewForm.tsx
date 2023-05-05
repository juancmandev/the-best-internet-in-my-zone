/* eslint-disable @next/next/no-img-element */

import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useFormik } from 'formik';
import { StarEmpty, StarFilled } from '@/assets/icons';
import IspProps from '@/interfaces/isp.model';
import { getCountry } from '@/utils/getGeocodingData';

interface ReviewFormProps {
  onClose: () => void;
  modalOpen: boolean;
  coordinates: number[];
}

const classNames = (...classes: any) => classes.filter(Boolean).join(' ');

const ReviewForm = ({ onClose, modalOpen, coordinates }: ReviewFormProps) => {
  const [selected, setSelected] = useState<number>(0);
  const [rating, setRating] = useState<number>(3);
  const [ispList, setISPList] = useState<IspProps | any>([]);

  const fetchISPs = async () => {
    try {
      const country = await getCountry(coordinates[0], coordinates[1]);

      const response = await fetch('http://localhost:8000/api/v1/isps', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ country: country.toLowerCase() }),
      });
      const json = await response.json();

      setISPList(json);
    } catch (err) {
      alert('Error fetching ISPs');
    }
  };

  const formik = useFormik({
    initialValues: {
      review: '',
    },
    onSubmit: async ({ review }) => {
      const newReview = {
        review: review,
        rating: rating,
        ispId: ispList[selected].id,
        coordinates: coordinates,
      };

      try {
        const response = await fetch('http://localhost:8000/api/v1/reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newReview),
        });

        if (response.ok) {
          alert('Review added successfully');
          onClose();
        } else alert('Please fulfill required fields');
      } catch (err) {
        alert('Error posting review');
      }
    },
  });

  useEffect(() => {
    fetchISPs();
  }, []);

  useEffect(() => {
    if (!modalOpen)
      setTimeout(() => {
        formik.resetForm();
        setSelected(0);
        setRating(3);
      }, 200);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);

  const handleRating = (value: number) => setRating(value);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='flex flex-col gap-[20px] mt-[28px]'>
      <section>
        {ispList.length > 0 && (
          <Listbox value={ispList[selected]} onChange={setSelected}>
            {({ open }) => (
              <>
                <Listbox.Label className='block text-base font-medium leading-6 text-gray-900 mb-[4px]'>
                  ISP
                </Listbox.Label>
                <div>
                  <Listbox.Button className='relative w-full cursor-pointer rounded-[8px] bg-white pl-[8px] pr-[32px] py-[8px] text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6'>
                    <span className='flex items-center gap-[12px]'>
                      <img
                        src={ispList[selected]?.urlImage}
                        alt={`${ispList[selected]?.name} logo`}
                        className='w-[48px] h-[48px] flex-shrink-0 rounded-full object-contain'
                      />
                      <span className='truncate text-lg capitalize'>
                        {ispList[selected]?.name}
                      </span>
                    </span>
                    <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                      <ChevronUpDownIcon
                        className='h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave='transition ease-in duration-100'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'>
                    <Listbox.Options className='absolute w-[203px] z-50 overflow-auto rounded-[8px] bg-white mt-[4px] py-[8px] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      {ispList.map((isp: any, index: number) => (
                        <Listbox.Option
                          key={isp.id}
                          className={({ active }) =>
                            classNames(
                              active ? 'bg-slate-200' : 'text-gray-900',
                              'relative cursor-pointer select-none px-[12px] py-[8px]'
                            )
                          }
                          value={index}>
                          {({ selected, active }) => (
                            <>
                              <div className='flex items-center gap-[8px]'>
                                <img
                                  src={isp.urlImage}
                                  alt={`${isp.name} logo`}
                                  className='w-[40px] h-[40px] flex-shrink-0 rounded-full object-contain'
                                />
                                <span
                                  className={classNames(
                                    selected ? 'font-semibold' : 'font-normal',
                                    'truncate capitalize'
                                  )}>
                                  {isp.name}
                                </span>
                              </div>
                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? 'text-white' : 'text-blue-400',
                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                  )}>
                                  <CheckIcon
                                    className='h-5 w-5'
                                    aria-hidden='true'
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        )}
      </section>
      <section>
        <label className='block text-base font-medium leading-6 text-gray-900 mb-[4px]'>
          Rating
        </label>
        <div className='flex justify-between'>
          {Array.from(Array(5), (e, i) =>
            i < rating ? (
              <button
                className='rounded-full p-[4px]'
                onClick={() => handleRating(i + 1)}
                type='button'
                key={`current rate ${i}/5`}>
                <StarFilled />
              </button>
            ) : (
              <button
                className='rounded-full p-[4px]'
                onClick={() => handleRating(i + 1)}
                type='button'
                key={`rate ${i}/5`}>
                <StarEmpty />
              </button>
            )
          )}
        </div>
      </section>
      <section>
        <label
          htmlFor='review'
          className='block text-base font-medium leading-6 text-gray-900 mb-[4px]'>
          Review
        </label>
        <textarea
          id='review'
          value={formik.values.review}
          onChange={formik.handleChange}
          className={`$'w-full rounded-[8px] p-[8px] border ring-slate-900' resize-none`}
          rows={4}
          placeholder='What do you think about this ISP?'
        />
      </section>
      <footer className='flex justify-end gap-[16px]'>
        <button
          onClick={onClose}
          className='rounded-[4px] p-[8px] border border-blue-500 text-blue-500'
          type='button'>
          Cancel
        </button>
        <button
          className='bg-blue-500 transition-colors text-white rounded-[4px] p-[8px] hover:bg-blue-400'
          type='submit'>
          Submit
        </button>
      </footer>
    </form>
  );
};

export default ReviewForm;
