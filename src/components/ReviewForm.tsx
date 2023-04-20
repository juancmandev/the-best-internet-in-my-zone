/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { getISP } from '@/services/ISP';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const classNames = (...classes: any) => classes.filter(Boolean).join(' ');

const labelStyles = 'block text-sm font-medium leading-6 text-gray-900';

const ReviewForm = () => {
  const [selected, setSelected] = useState<number>(0);
  const [ispList, setISPList] = useState<any>([]);

  const fetchISP = async () => {
    const response: any = await getISP();

    setISPList(response);
  };

  useEffect(() => {
    fetchISP();
  }, []);

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      console.log(ispList[selected]);
    },
  });

  return (
    <form
      className='flex flex-col gap-[12px] my-[20px]'
      onSubmit={formik.handleSubmit}>
      <section>
        {ispList.length > 0 && (
          <Listbox value={ispList[selected]} onChange={setSelected}>
            {({ open }) => (
              <>
                <Listbox.Label className={labelStyles}>ISP</Listbox.Label>
                <div>
                  <Listbox.Button className='relative w-full cursor-pointer rounded-[8px] bg-white pl-[8px] pr-[32px] py-[8px] text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6'>
                    <span className='flex items-center gap-[12px]'>
                      <img
                        src={ispList[selected]?.urlImage}
                        alt={`${ispList[selected]?.name} logo`}
                        className='w-[48px] h-[48px] flex-shrink-0 rounded-full object-contain'
                      />
                      <span className='truncate text-lg'>
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
                    <Listbox.Options className='absolute z-50 overflow-auto rounded-[8px] bg-white mt-[4px] py-[8px] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
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
                                    'truncate'
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
      <footer>
        <button type='submit'>Submit</button>
      </footer>
    </form>
  );
};

export default ReviewForm;
