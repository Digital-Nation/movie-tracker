import React from 'react';

import { STATUS } from '../utils';

const useFetchEffect = (url, shouldFetch = true) => {
  const [state, setState] = React.useState({
    status: STATUS.IDLE,
    data: null,
    error: null,
  });

  React.useEffect(() => {
    if (!shouldFetch) {
      setState({ status: STATUS.IDLE });
      return;
    }
    setState({ status: STATUS.PENDING });

    fetch(url)
      .then(data => {
        if (data.status >= 300) {
          throw new Error(`Fetch failed with status ${data.status}`);
        }
        return data.json();
      })
      .then(data => {
        setState({ status: STATUS.RESOLVED, data });
      })
      .catch(err => setState({ status: STATUS.REJECTED, error: err.message }));
  }, [url, shouldFetch]);

  return state;
};

export default useFetchEffect;
