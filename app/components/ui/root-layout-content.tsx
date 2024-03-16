import { type ReactNode } from 'react';

export function RootLayoutContent({ children }: { children: ReactNode }) {
  return <main className='pb-14 pt-4'>{children}</main>;
}
