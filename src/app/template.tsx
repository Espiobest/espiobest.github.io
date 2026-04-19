import { ReactNode } from 'react';

export default function Transition({ children }: { children: ReactNode }) {
  return <div className="hero-fade">{children}</div>;
}
