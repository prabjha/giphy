import React from 'react';
export interface AppProps {
  children?: React.ReactNode; // accepts everything React can render
  childrenElement: JSX.Element; // A single React element
  style?: React.CSSProperties; // to pass through style props
  onChange?: React.FormEventHandler<HTMLInputElement>; // form events! the generic parameter is the type of
}
