import '@/styles/globals.css';

export const metadata = {
  title: 'The Best Internet in my Zone',
  description: 'Check out the best internet in your zone',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
