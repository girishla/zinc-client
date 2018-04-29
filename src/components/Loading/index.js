import React from 'react';
import { red100, red600 } from 'material-ui/styles/colors';
import Spinner from '../../components/Spinner';

export default function Loading() {
  return (
    <div>
      <Spinner
        style={{
          WebkitTransform: 'translate(-50%, -50%)',
          left: '50%',
          position: 'fixed',
          top: '50%',
          transform: 'translate(-50%, -50%)',

        }}
        name="circle"
        color="#7144b7"
      />
    </div>
  );
}
