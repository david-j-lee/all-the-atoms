import React from 'react';
import ContextProvider from '../context';

// font awesome icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

import Main from './Main';

library.add(far, fas, fab);

export default function App() {
  return (
    <ContextProvider className="App">
      <Main />
    </ContextProvider>
  );
}
