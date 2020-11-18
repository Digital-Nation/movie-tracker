import React from 'react';
import { STATUS, generateConfig } from '../utils';
import { MOVIES_URL } from '../connectors/api';
import { buildMovieUrl } from '../connectors/tmdb';

export default function useMovie(movieId) {
  const [status, setStatus] = React.useState(STATUS.IDLE);
  const [movie, setMovie] = React.useState(null);
  const [error, setError] = React.useState(null);

  // load movie data from our DB or TMDB
  React.useEffect(() => {
    setStatus(STATUS.PENDING);
    setMovie(null);
    setError(null);

    fetch(`${MOVIES_URL}/${movieId}`)
      .then(data => {
        if (data.status === 404) {
          // movie is not in our DB, so we will fetch it from TMDB
          // by returning another promise, it will continue the flow of current promise. nice and clean
          return fetch(buildMovieUrl(movieId));
        }
        return data;
      })
      .then(data => {
        if (data.status >= 300) {
          throw new Error(`Fetch failed with status ${data.status}`);
        }
        return data.json();
      })
      .then(data => {
        // Note that this will trigger 2 renders, make sure status is the last one
        setMovie(data);
        setStatus(STATUS.RESOLVED);
      })
      .catch(err => {
        setError(err.message);
        setStatus(STATUS.REJECTED);
      });
  }, [movieId]);

  // define am update method
  const [updateStatus, setUpdateStatus] = React.useState(STATUS.IDLE);
  const updateMovie = React.useCallback(
    body => {
      setUpdateStatus(STATUS.PENDING);

      fetch(`${MOVIES_URL}/${movieId}`, generateConfig('PUT', body))
        .then(data => {
          if (data.status >= 300) {
            throw new Error(`Fetch failed with status ${data.status}`);
          }
          return data.json();
        })
        .then(data => {
          setMovie(data);
          setUpdateStatus(STATUS.RESOLVED);
        })
        .catch(err => {
          setError(err.message);
          setUpdateStatus(STATUS.REJECTED);
        });
    },
    [movieId],
  );

  return { movie, status, error, updateStatus, updateMovie }; // Bad naming example: updateStatus is an enum, but updateMovie is a function
}
