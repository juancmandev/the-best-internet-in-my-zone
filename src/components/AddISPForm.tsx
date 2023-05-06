/* eslint-disable @next/next/no-img-element */

import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import countries from '@/utils/countries';

const API_URL = process.env.API_URL as string;

interface Props {
  onClose: () => void;
}

const AddISPForm = ({ onClose }: Props) => {
  const [logoUrl, setLogoUrl] = useState<string>('');

  const formik = useFormik({
    initialValues: {
      name: '',
      urlImage: '',
      availableIn: '',
    },
    validationSchema: yup.object({
      name: yup.string().required(),
      urlImage: yup.string().required(),
      availableIn: yup.string().required(),
    }),
    onSubmit: async (values) => {
      const newIsp = {
        name: values.name.toLocaleLowerCase(),
        urlImage: values.urlImage,
        availableIn: values.availableIn.toLocaleLowerCase(),
      };

      try {
        const response = await fetch(`${API_URL}/api/v1/isps`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newIsp),
        });
        if (response.ok) alert('ISP added successfully');
        else alert('Please fulfill required fields');
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='flex flex-col gap-[20px] mt-[28px] max-h-[500px] px-[4px] overflow-y-auto'>
      <section>
        <label
          className='block text-base font-medium leading-6 text-gray-900 mb-[4px]'
          htmlFor='name'>
          Name
        </label>
        <input
          id='name'
          autoComplete='off'
          value={formik.values.name}
          onChange={formik.handleChange}
          className='w-full rounded-[8px] p-[8px] border ring-slate-900'
        />
      </section>
      <section>
        <label
          className='block text-base font-medium leading-6 text-gray-900 mb-[4px]'
          htmlFor='urlImage'>
          Logo URL
        </label>
        <input
          id='urlImage'
          required
          autoComplete='off'
          value={formik.values.urlImage}
          className='w-full rounded-[8px] p-[8px] border ring-slate-900'
          onChange={(e) => {
            formik.handleChange(e);
            setLogoUrl(e.target.value);
          }}
        />
        <div className='flex justify-center'>
          {logoUrl ? (
            <img
              className='w-[100px] h-auto mt-[8px]'
              src={logoUrl}
              alt={`${formik.values.name} logo`}
            />
          ) : (
            <p className='text-sm'>Logo preview</p>
          )}
        </div>
      </section>
      <section className='flex flex-col gap-[12px]'>
        <div>
          <label
            htmlFor='availableIn'
            className='block text-base font-medium leading-6 text-gray-900 mb-[4px]'>
            Available in
          </label>
          <input
            id='availableIn'
            list='availableInList'
            required
            value={formik.values.availableIn}
            onChange={formik.handleChange}
            className='w-full rounded-[8px] p-[8px] border ring-slate-900'
          />
        </div>
        <datalist id='availableInList'>
          {countries.map((country) => (
            <option key={country.code} value={country.name} />
          ))}
        </datalist>
      </section>
      <footer className='flex justify-end gap-[16px]'>
        <button
          className='rounded-[4px] p-[8px] border border-blue-500 text-blue-500'
          onClick={onClose}
          type='button'>
          Cancel
        </button>
        <button
          className='bg-blue-500 transition-colors text-white rounded-[4px] p-[8px] hover:bg-blue-400'
          type='submit'>
          Create
        </button>
      </footer>
    </form>
  );
};

export default AddISPForm;
