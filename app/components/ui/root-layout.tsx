import { type ReactNode } from 'react';

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className='relative mx-auto grid h-full grid-rows-[auto_1fr] px-6 xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl'>
      {children}
    </div>
  );
}
