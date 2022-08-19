import React from 'react';
import {Provider} from 'react-redux';

import {AppNavigator} from '@giphy/navigation';
import {store} from '@giphy/redux';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
