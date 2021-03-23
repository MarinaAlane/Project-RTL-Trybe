import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWhithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }> {component} </Router>), history
  });
};
console.log(global);
export default renderWhithRouter;
