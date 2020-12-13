import React from 'react';
import { STATUS, generateConfig } from '../utils';
import { PROFILE_URL } from '../connectors/api';


export default function useProfile() {
    const [status, setStatus] = React.useState(STATUS.IDLE);
    const [profile, setProfile] = React.useState(null);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        setStatus(STATUS.PENDING);
        setProfile(null);
        setError(null);

        fetch(`${PROFILE_URL}`)
            .then(data => {
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
                setProfile(data);
                setStatus(STATUS.RESOLVED);
            })
            .catch(err => {
                setError(err.message);
                setStatus(STATUS.REJECTED);
            });
    }, ['test']);

    
    const [updateStatus, setUpdateStatus] = React.useState(STATUS.IDLE);
    const updateProfile = React.useCallback(
        body => {
            setUpdateStatus(STATUS.PENDING);

            fetch(`${ PROFILE_URL }`, generateConfig('PUT', body))
                .then(data => {
                    if (data.status >= 300) {
                        throw new Error(`Fetch failed with status ${data.status}`);
                    }
                    return data.json();
                })
                .then(data => {
                    setProfile(data);
                    setUpdateStatus(STATUS.RESOLVED);
                })
                .catch(err => {
                    setError(err.message);
                    setUpdateStatus(STATUS.REJECTED);
                });
        },
        ['update test'],
    );

    return { profile, status, error, updateStatus, updateProfile }; 
}