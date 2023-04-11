import Link from 'next/link';

const Home = () => {
  return (
    <div className='grid place-items-center h-screen'>
      <div className='flex flex-col gap-[16px]'>
        <h1 className='text-2xl'>The Best Internet in my Zone!</h1>
        <Link className='text-center' href='/map'>
          Go to the map
        </Link>
      </div>
    </div>
  );
};

export default Home;
